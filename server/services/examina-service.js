const otInfoModal = require('../models/ot-info');
const util = require('../util/util');
// const sequelize = require('Sequelize');
const otDeptModal = require('../models/ot-dept');
const examinaStatus = require('../services/examine-status');
const otSequelize = require('../mysql/ot-app-mysql');
const historyService = require('./history-service');
const historyModal = require('../models/ot-check-history');

const getCheckedList = async (body) => {
  let size = body.size || 10;
  let page = body.page || 1;
  let result = await otInfoModal.findAndCountAll({
    include: [{
      model: historyModal,
      where: {
        otId: otSequelize.col('t_ot_info.id'),
        operator: body.account
      }
    }],
    distinct: true,
    where: {
      $or: [{
        status: [1, 11, 2, 21, 3, 31]
      }]
    },
    limit: parseInt(size),
    offset: parseInt(size * (page - 1))
  })
  return result;
}

// 查找加班信息
const getList = async (body) => {
  let size = body.size || 10;
  let page = body.page || 1;

  let dept = await otDeptModal.findOne({
    attributes: ['id', 'grade', 'checker'],
    where: { checker: body.account }
  }).catch(error => {
    console.log('@@##dept error:' + error);
    throw error;
  });
  if (!dept) {
    throw new Error('您不是审批人');
  }

  let result = await otInfoModal.findAndCountAll({
    where: {
      // deptId: dept.id,
      // 根据审核者来查，因为有可能一级部门审核 二维部门的同学
      operator: body.account,
      // 如果是二级部门 只能审核状态0，如果一级部门，只能审核状态1
      // status: dept.grade === 2 ? 0 : (dept.grade === 1 ? 1 : 0)
      $or: [{
        status: [0, 1, 2, 3]
      }]
    },
    limit: parseInt(size),
    offset: parseInt(size * (page - 1))
  }).catch(error => {
    console.log('error modal');
    throw error;
  });

  console.log('@@##data:' + JSON.stringify(result));
  return result;
};

/* @desc 加班审核通过 */
const passExamina = async (body) => {
  let curOTInfo = await otInfoModal.findOne({
    attributes: ['deptId', 'operator', 'status'],
    where: {
      id: parseInt(body.id)
    }
  });

  // if (curOTInfo.operator !== body.account) {
  //   throw new Error('抱歉！您不是当前审核者');
  // }
  if (!curOTInfo) {
    throw new Error('抱歉！无该记录！id:' + body.id);
  }

  // 获取下级状态
  let toStatus = await examinaStatus.changeStatus(curOTInfo.deptId, curOTInfo.status);

  if (toStatus && toStatus.checker !== body.account) {
    throw new Error('抱歉！您不是当前审核者');
  }

  if (!toStatus || !toStatus.nextChecker) {
    throw new Error('该单不能审核或者找不到上级审核者');
  }

  let params = {
  };

  Object.assign(params, body);

  params['remark' + toStatus.grade] = body.remark;

  params.status = toStatus.status;
  params.operator = toStatus.nextChecker;

  // 启动事务
  let transaction = await otSequelize.transaction();
  let result;
  try {
    result = await otInfoModal.update(params, {
      where: {
        id: parseInt(body.id)
      },
      transaction: transaction
    })
    // .catch(error => {
    //   // await transaction.rollback();
    //   throw error;
    // });
    // console.log('@@##result:' + JSON.stringify(result));

    if (result && result.length > 0 && result[0] == 1) {
      await historyService.addRecord({
        otId: body.id,
        operator: body.account,
        fromStatus: curOTInfo.status,
        toStatus: toStatus.status,
        userId: body.operatorId,
        ip: body.IP
      }, {
          transaction: transaction
        })
      // .catch(err => {
      //   console.log(err);
      //   // await transaction.rollback();
      //   throw err;
      // });
    }
    await transaction.commit();
  } catch (e) {
    await transaction.rollback();
    throw e;
  }

  return result && result.length > 0 ? body.id : false;
};

/* @desc 加班审核失败 */
const rejectExamina = async (body) => {
  let curOTInfo = await otInfoModal.findOne({
    attributes: ['deptId', 'operator', 'status'],
    where: {
      id: parseInt(body.id)
    }
  });

  let isChangeOwn = false;
  if (body.rejectOwn) {
    // 查出最近的修改人，然后让其反悔~~~~~~通过的，让他拒绝
    let examinaRecord = await historyService.getNearRecord({ otId: body.id });

    if (examinaRecord.operator === body.account && body.rejectOwn) {
      isChangeOwn = true;
    }
  }

  // if (curOTInfo.operator !== body.account) {
  //   throw new Error('抱歉！您不是当前审核者');
  // }
  let toStatus = await examinaStatus.rejectStatus(curOTInfo.deptId, curOTInfo.status, isChangeOwn);

  if (!toStatus || !toStatus.checker) {
    throw new Error('该单不能审核或者找不到上级审核者');
  }
  let params = {
  };
  Object.assign(params, body);

  params['remark' + toStatus.grade] = body.remark;

  params.status = toStatus.status;
  params.operator = toStatus.nextChecker;

  // 启动事务
  let transaction = await otSequelize.transaction();
  let result;
  try {
    result = await otInfoModal.update(params, {
      where: {
        id: parseInt(body.id)
      },
      transaction: transaction
    });
    if (result && result.length > 0 && result[0] == 1) {
      await historyService.addRecord({
        otId: body.id,
        operator: body.account,
        fromStatus: curOTInfo.status,
        toStatus: toStatus.status,
        userId: body.operatorId,
        ip: body.IP,
        remark: body.remark
      }, { transaction: transaction });
    }
    await transaction.commit();
  } catch (e) {
    await transaction.rollback();
    throw e;
  }

  return result && result.length > 0 ? body.id : false;
};

/* @desc 加班审核通过 */
const passExaminaList = async (body) => {
  let ids = body.ids;
  let promises = [];
  for (id of ids) {
    let promise = passExamina({ id: id, account: body.account });
    promise.catch(e => {
      console.log('@@##promise catch e:' + JSON.stringify(e));
      // return Promise.resolve({ id: id, error: e.message });
    })
    promises.push(promise);
  }

  let results = await Promise.all(promises);
  console.log('@@##passExaminaList:' + JSON.stringify(results));
  let result = [];
  for (let re of results) {
    result.push(re);
  }
  return result;
};



module.exports = {
  getCheckedList,
  getList,
  passExamina,
  rejectExamina,
  passExaminaList
};
