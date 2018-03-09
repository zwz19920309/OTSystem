
const historyModal = require('../models/ot-check-history');

const otSequelize = require('../mysql/ot-app-mysql');


/**
 * 添加审核记录
 * otId 加班申请表id 
 * operator 操作者
 * fromStatus toStatus 状态变更
 * remark 备注
 * @param {*} options
 */
const addRecord = async (options, trans) => {
  if (!options.operator) {
    throw new Error('缺少操作者')
  }

  let result = await historyModal.create(options, trans).catch(err => {
    console.log('@@##error:' + err);
    throw err;
  });
  // if (result) {
  //   throw new Error('测试:回滚');
  // }
  console.log('@@##add reccord:' + result);
  return result;
}

/**
 * 获取最新的一条记录
 * otId
 * @param {*} options 
 */
const getNearRecord = async (options) => {
  if (!options.otId) {
    throw new Error('请输入正确的参数');
  }

  let result = await historyModal.findOne({
    attributes: ['operator', 'otId', 'userId'],
    where: {
      otId: options.otId
    },
    order: [['updatedAt', 'DESC']]
  }).catch(err => {
    console.log('@@##error:' + err);
    throw err;
  });

  return result;

}

module.exports = {
  addRecord,
  getNearRecord
}
