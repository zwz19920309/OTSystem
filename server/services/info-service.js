
const infoModel = require('../models/ot-info');
const otDeptModel = require('../models/ot-dept');
const otSequelize = require('../mysql/ot-app-mysql');
const dateUtil = require('../common/utils/date');
const moment = require('moment');
const otUserModel = require('../models/ot-user');
const historyService = require('./history-service');
// 查找加班信息
// const findAll = async () => {
//   let result = await infoModel.findAll();

//   console.log('@@##data:' + JSON.stringify(result));
//   return result;
// };

// 查看个人加班
const getPersonalInfo = async (options) => {
  let sql = {
    where: { userId: options.operatorId },
    limit: parseInt(options.pageSize),
    offset: parseInt((options.page - 1) * options.pageSize),
    order: [['createdAt', 'DESC']],
    include: [{
      model: otDeptModel,
      where: { id: otSequelize.col('t_ot_info.deptId') }
      // include: [{
      //   model: otUserModel,
      //   where: { account: otDeptModel.col('t_dept.leader') }
      // }]
    }
    ]
  };
  if (options.month) {
    let dateBtw = dateUtil.getMonthPeriod(moment(options.month).format('YYYY-MM-DD'));
    sql.where.startTime = { $between: [dateBtw.firstDay, dateBtw.lastDay] };
  }
  let result = await infoModel.findAndCountAll(sql).catch(err => {
    console.log(err);
  });

  console.log('@@##data:' + JSON.stringify(result));
  return result;
};

// 申请/修改 加班
const addInfo = async (options) => {
  if (!options || !options.reason || !options.days) {
    throw new Error('缺少参数reason | days');
  }

  // if (options.days && options.holidays && parseFloat(options.days) < parseFloat(options.holidays)) {
  //   throw new Error('调休时长不能大于加班时长');
  // }

  // 查出审核人然后入库
  // let dept = await otDeptModel.findAll({
  //   where: { id: options.deptId },
  //   include: [{
  //     model: otDeptModel,
  //     where: {
  //       id: otSequelize.col('t_dept.parent')
  //     }
  //   }]
  // }).catch(e => {
  //   throw e;
  // });

  let dept = await otSequelize.query('select child.checker,child.leaderName, parent.name,child.name as childName from t_dept as child,t_dept as parent where parent.id = child.parent and child.id = ? limit 1',
    { replacements: [options.deptId], type: otSequelize.QueryTypes.SELECT }
  );

  if (dept) {
    options.operator = dept[0].checker;
    options.deptName = dept[0].name + dept[0].childName;
    options.leaderName = dept[0].leaderName;
  }
  let resResult = true;
  let transaction = await otSequelize.transaction();
  let result;
  try {

    if (!options.id) {
      result = await infoModel.create(options, { transaction: transaction });
      if (result && result.id) {
        await historyService.addRecord({
          otId: result.id,
          operator: options.account,
          fromStatus: -1,
          toStatus: 0,
          userId: options.userId,
          ip: options.IP
        }, { transaction: transaction });
      }
    } else {
      result = await infoModel.update(options, { where: { id: options.id }, limit: 1 }, { transaction: transaction });
      if (result && result.length > 0 && result[0] == 1) {
        await historyService.addRecord({
          otId: options.id,
          operator: options.account,
          fromStatus: -1,
          toStatus: 0,
          userId: options.userId,
          ip: options.IP
        }, { transaction: transaction });
      }
    }
    transaction.commit();
  } catch (e) {
    resResult = false;
    transaction.rollback();
    throw e;
  }
  console.log('@@##add info result :' + JSON.stringify(result));
  return resResult;
};

// 删除数据
const deleteInfo = async (options) => {
  let result = true;
  await infoModel.destroy({
    where: { id: options.id }
  }).then(result => {
    console.log('deleted result:' + JSON.stringify(result));
  }).catch(err => {
    console.log(err);
    result = false;
  });
  return result;
};

module.exports = {
  // findAll,
  addInfo,
  getPersonalInfo,
  deleteInfo
};
