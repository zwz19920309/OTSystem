const fs = require('fs');
const resUtil = require('../common/utils/res');
const OTInfoModel = require('../models/ot-info');
const dbUtil = require('../common/db/dbUtil');
const otDeptModel = require('../models/ot-dept');
const otSequelize = require('../mysql/ot-app-mysql');
/**
  * 加班列表
  * @param  {object} params 筛选参数
  * @return {object} sequelize执行结果
 */
const infoList = async (params) => {
  let infoList = await dbUtil.findAll(params);
  return infoList;
};
/**
  * 加班列表-分页查询
  * @param  {object} params 筛选参数
  * @return {object} sequelize执行结果
 */
const findDataByPage = async (params) => {
  params.include = [{model: otDeptModel, where: {id: otSequelize.col('t_ot_info.deptId')}}];
  let result = await dbUtil.findAll(OTInfoModel, params);
  return result;
};
/**
  * 条件统计-计数
  * @param  {object} params 筛选参数
  * @return {object} sequelize执行结果
 */
const count = async (params) => {
  params.include = [{model: otDeptModel, where: {id: otSequelize.col('t_ot_info.deptId')}}];
  let result = await dbUtil.count(OTInfoModel, params);
  return result;
};

/**
  * 根据条件删除
  * @param  {object} params 筛选参数
  * @return {object} sequelize执行结果
 */
const deleteByCons = async (params) => {
  let result = await dbUtil.deleteByCons(OTInfoModel, params);
  return result;
};

/**
  * 根据条件更新数据
  * @param  {object} params 筛选参数
  * @return {object} sequelize执行结果
 */
const updateData = async (data, params) => {
  let result = await dbUtil.updateData(OTInfoModel, data, params);
  return result;
};

module.exports = {
  infoList,
  findDataByPage,
  count,
  deleteByCons,
  updateData
};
