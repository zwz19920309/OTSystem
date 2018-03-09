
const dbUtil = require('../common/db/dbUtil');
const sqlUtil = require('../common/db/sqlUtil');
const holidaysModel = require('../models/ot-holidays');
const otUserModel = require('../models/ot-user');
const otDeptModel = require('../models/ot-dept');
const OTInfoModel = require('../models/ot-info');
const otSequelize = require('../mysql/ot-app-mysql');
const dateUtil = require('../common/utils/date');
/**
  * 调休列表
  * @param  {object} params 筛选参数
  * @return {object} sequelize执行结果
 */
const holidaysList = async (params) => {
  params = params || {};
  let holidays = await dbUtil.findAll(holidaysModel, params);
  return holidays;
};
/**
  * 调休列表
  * @param  {object} params 筛选参数
  * @return {object} sequelize执行结果
 */
const holidaysCount = async (moth, account) => {
  let opts = {where: { moth: moth }};
  if (account) {
    opts.where.account = account;
  }
  let holidays = await holidaysList(opts);
  let smoth = dateUtil.parseDate((moth + '-01'));
  let dateBtw = dateUtil.getMonthPeriod(dateUtil.dateFormat(smoth, 'yyyy-MM-dd'));
  for (let m in holidays) {
    let user = await dbUtil.findAll(otUserModel, { where:{account: holidays[m].account}, include: [{model: otDeptModel, where: {id: otSequelize.col('t_user.dept')}}]});
    if (user && user[0]) {
      if (user[0].t_dept) {
        holidays[m].dataValues.deptName = user[0].t_dept.name; 
      }
      let sum = await dbUtil.sumCons(OTInfoModel, 'days', ['name'], {userId: user[0].id, startTime: { $between: [dateBtw.firstDay, dateBtw.lastDay] }});
      let uHours = await dbUtil.sumCons(OTInfoModel, 'holidays', ['name'], {userId: user[0].id, startTime: { $between: [dateBtw.firstDay, dateBtw.lastDay] }});
      holidays[m].dataValues.mothLess = sum ? (sum-uHours/7).toFixed(2): 0;
    }   
  }
  return holidays;
};

/**
  * 批量更新
  * @param  {object} params 筛选参数
  * @return {object} sequelize执行结果
 */
const batchUpdateData = async (keys, values) => {
  let result = await sqlUtil.batchUpdateData('t_holidays',keys, values);
  return result;
};

/**
  * 批量插入
  * @param  {object} params 筛选参数
  * @return {object} sequelize执行结果
 */
const batchInsertData = async (keys, values) => {
  let result = await sqlUtil.batchInsertData('t_holidays',keys, values);
  return result;
};
 
/**
  * 根据条件删除
  * @param  {object} params 筛选参数
  * @return {object} sequelize执行结果
 */
const deleteByCons = async (params) => {
  let result = await dbUtil.deleteByCons(holidaysModel, params);
  return result;
};


module.exports = {
  holidaysList,
  holidaysCount,
  batchInsertData,
  batchUpdateData,
  deleteByCons
};
