const path = require('path');
const fs = require('fs');
const send = require('koa-send');
const xlsx = require('node-xlsx');
const resUtil = require('../common/utils/res');
const dateUtil = require('../common/utils/date');
const uploadUtil = require('../common/file/upload');
const httpResult = require('../common/http/http-result');
const otcountService = require('../services/otcount-service');
const tokenService = require('../common/token/token.js');
const toolsUtil = require('../common/utils/tools');
const excelUtil = require('../common/file/excel');

/**
* 上传文件
* @param  {object}  ctx 上传参数
* @return {object} 上传结果
*/
const uploadHoliday = async (ctx) => { 
  let result = {};
  try {
    if (ctx.request.headers.token) {
      user = await tokenService.get(ctx.request.headers.token);
      if (!(user.account === 'zhangjiaxin')) {
        ctx.response.body = httpResult.response(httpResult.HttpStatus.FAIL, '您无该操作权限', {});
        return;
      }
    };
    let rootPath = path.resolve(__dirname, '../public');
    let sRes = await uploadUtil.uploadFile(ctx.req, rootPath);
    if (sRes.status === resUtil.RSTATUS) {
      let filePath = sRes.body.filePath;
      let moth =  sRes.body.fields.value;
      let workSheetsFromBuffer = xlsx.parse(filePath);
      if (workSheetsFromBuffer[0] && workSheetsFromBuffer[0].data) {
        if (workSheetsFromBuffer[0].data[0]) {
          workSheetsFromBuffer[0].data.shift();
          let names = ['sid', 'name', 'account', 'holidays', 'vacation'];
          let holidaysData = toolsUtil.excelToModel(workSheetsFromBuffer[0].data, names, true); 
          holidaysData = toolsUtil.addEleToArr (holidaysData, 'moth', moth);
          // let delRes = await otcountService.deleteByCons({where: {moth: moth}});
          let keys = ['sid', 'name', 'account', 'holidays', 'vacation', 'moth'];
          let sqlRes = await otcountService.batchUpdateData(keys, holidaysData);
          let holidayList = await otcountService.holidaysCount(moth);
          result = httpResult.response(httpResult.HttpStatus.SUCCESS, '文件上传成功', holidayList);
        }
      }
   } else {
      result = httpResult.response(httpResult.HttpStatus.FAIL, '文件上传失败', sRes.body);
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.FAIL, '系统异常', {err: e});
  }
  ctx.response.body = result;
}
/*
* 根据月份查找数据
* @param  {object}  ctx 
* @return {object}  查询结果
*/
const findDataByMoth = async (ctx) => {
  let result = {};
  let flag = false;
  let infoList = [];
  try {
    if (ctx.request.headers.token) {
      user = await tokenService.get(ctx.request.headers.token);
      if ((user.account === 'zhangjiaxin')) {
        flag = true;
      }
    };
    let moth = ctx.request.body.moth || '2018-02';
    if (flag) {
      infoList = await otcountService.holidaysCount(moth);
    } else {
      infoList = await otcountService.holidaysCount(moth, user.account);
    }
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, '数据查询成功', infoList);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.FAIL, '系统异常', {err: e});
  }
  ctx.response.body = result;
};

/*
* @param  {object}  ctx 
* @return {object} 导出假期数据
*/
const exportHoliday = async (ctx) => {
  let result = {};
  try {
    let moth = ctx.query.moth || '2018-02';
    let holidayList = await otcountService.holidaysCount(moth);
    let rootPath = path.resolve(__dirname, '../public');
    holidayList = toolsUtil.modelToJson(holidayList);
    let colsName = [{ id: '序号' }, { name: '姓名' }, { deptName: '开发部门' }, { holidays: '剩余假期(d)' }, { vacation: '剩余年假(d)' }, {mothLess: '本月剩余调休(d)'}];
    let fileName = moth + '-调休统计表.xlsx';
    let excelRes = await excelUtil.createExcelBook(fileName, rootPath, holidayList, colsName, '调休统计表');
    if (excelRes.status === resUtil.ESTATUS) {
      ctx.response.body = httpResult.response(httpResult.FAIL, excelRes.msg, {});
    } else {
      ctx.attachment(fileName);
      await send(ctx, fileName, { root: excelRes.body.rootPath });
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.FAIL, '系统异常', {err: e});
    ctx.response.body = result;
  }
}


module.exports = {
  uploadHoliday,
  exportHoliday,
  findDataByMoth
};
