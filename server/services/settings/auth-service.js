const fs = require('fs');
const dbUtil = require('../../common/db/dbUtil');
const otDeptModel = require('../../models/ot-dept');

/**
  * 加班列表
  * @param  {object} params 筛选参数
  * @return {object} sequelize执行结果
 */
const getDeptList = async (params) => {
  let deptList = await dbUtil.findAll(otDeptModel, params);
  return deptList;
};

/**
  * 更新加班信息
  * @param  {object} params 筛选参数
  * @return {object} sequelize执行结果
 */
const updateDept = async (data, cons) => {
  let deptList = await dbUtil.updateData(otDeptModel, data, cons);
  return deptList;
};
module.exports = {
  getDeptList,
  updateDept
};
