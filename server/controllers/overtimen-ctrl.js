'use strict';
const send = require('koa-send');
const path = require('path');
const fs = require('fs');
const dateUtil = require('../common/utils/date');
const resUtil = require('../common/utils/res');
const toolstil = require('../common/utils/tools');
const httpResult = require('../common/http/http-result');
const overtimenService = require('../services/overtimen-service');
const excelUtil = require('../common/file/excel');

const infoList = async (ctx) => {
  let infoList = await overtimenService.infoList();
  ctx.response.body = resUtil.globalRes(infoList);
};
const findDataByPage = async (ctx) => {
  let result = {};
  try {
    let params = ctx.request.body;
    if (!params.datePeriod) {
      result = httpResult.response(httpResult.HttpStatus.FAIL, '月份参数不能为空', {});
    } else {
      let dateBtw = dateUtil.getMonthPeriod(params.datePeriod);
      let cons = { limit: (params.limit || 10), offset: (params.offset || 0), order: [['startTime', 'DESC']], where: { startTime: { $between: [dateBtw.firstDay, dateBtw.lastDay] }}};
      let consCount = { where: { startTime: { $between: [dateBtw.firstDay, dateBtw.lastDay] } } }
      params.deptId ? (consCount.where.deptId = cons.where.deptId = params.deptId) : '';
      params.status ? (consCount.where.status = cons.where.status = params.status) : '';
      if (typeof(params.status === 'number') && params.status === 0) {
        consCount.where.status = cons.where.status = params.status = 0;
      }
      params.name ? (consCount.where.name = cons.where.name = params.name) : '';
      let infoRes = await overtimenService.findDataByPage(cons);
      let totalRes = await overtimenService.count(consCount);
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, '获取数据成功', {list: infoRes, total: totalRes});
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.FAIL, '系统异常', {err: e});
  }
  ctx.response.body = result;
};
const download = async (ctx) => {
  let result = {};
  try {
    let params = ctx.query;
    if (!params.datePeriod) {
      result = httpResult.response(httpResult.HttpStatus.FAIL, '月份参数不能为空', {});
    } else {
      let res = {};
      let dateBtw = dateUtil.getMonthPeriod(params.datePeriod);
      let infoList = await overtimenService.findDataByPage({ where: { startTime: { $between: [dateBtw.firstDay, dateBtw.lastDay] } } });
      let fileName = params.datePeriod.substring(0, params.datePeriod.lastIndexOf('-')) + '-加班申请表.xlsx';
      let rootPath = path.resolve(__dirname, '../public');
      infoList = toolstil.modelToExcel(infoList);
      let colsName = [{ id: '序号' }, { name: '姓名' }, { deptName: '部门' }, { date: '日期' }, { start: '上班时间' }, { end: '下班时间' }, { days: '加班天数/h' },  { holidays: '补休时间/h' }, { reason: '加班事由' }, { operator: '部门负责人' }, { status: '状态' }];
      let excelRes = await excelUtil.createExcelBook(fileName, rootPath, infoList, colsName, '加班申请表');
      if (excelRes.status === resUtil.ESTATUS) {
        ctx.response.body = httpResult.response(httpResult.FAIL, excelRes.msg, {});
      } else {
        ctx.attachment(fileName);
        await send(ctx, fileName, { root: excelRes.body.rootPath });
      }
    }
  } catch (e) {
    result = httpResult.response(httpResult.FAIL, '系统异常', {err: e});
    ctx.response.body = result;
  }
};

const deleteData = async (ctx) => {
  let result = {};
  try {
    let params = ctx.request.body;
    if (!params.id) {
      result = httpResult.response(httpResult.FAIL, '参数id为空', {});
    } else {
      let res = await overtimenService.deleteByCons({ where: { id: params.id } });
      result = resUtil.globalRes(res);
    }
  } catch (e) {
    result = httpResult.response(httpResult.FAIL, '系统异常', {});
  }
  ctx.response.body = result;
};
/**
* 更新数据
* @param  {object} params 更新数据
* @return {object} 更新结果
*/
const updateData = async (ctx) => {
  let result = {};
  try {
    let params = ctx.request.body || {};
    let id = params.id;
    if (!id) {
      result = httpResult.response(httpResult.FAIL, '参数id为空', {});
    } else {
      delete params.id;
      let res = await overtimenService.updateData(params, { where: { id: id } });
      if (res && res[0] === 1) {
        result = resUtil.globalRes(res);
      } else {
        httpResult.response(httpResult.FAIL, '操作失败', {});
      }
    }
  } catch (e) {
    result = httpResult.response(httpResult.FAIL, '系统异常', {});
  }
  ctx.response.body = result;
};

const findDataByPageCons = async (ctx) => {
  let result = {};
  try {
    let params = ctx.request.body;
    if (!params.datePeriod) {
      result = httpResult.response(httpResult.HttpStatus.FAIL, '月份参数不能为空', {});
    } else {
      let dateBtw = dateUtil.getMonthPeriod(params.datePeriod);
      let infoRes = await overtimenService.findDataByPage({ limit: (params.limit || 10), offset: (params.offset || 0), order: [['startTime', 'DESC']], where: { startTime: { $between: [dateBtw.firstDay, dateBtw.lastDay]} } });
      let totalRes = await overtimenService.count({ where: { startTime: { $between: [dateBtw.firstDay, dateBtw.lastDay] } } });
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, '获取数据成功', {list: infoRes, total: totalRes});
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.FAIL, '系统异常', {err: e});
  }
  ctx.response.body = result;
};

module.exports = {
  infoList,
  download,
  findDataByPage,
  deleteData,
  updateData
};
