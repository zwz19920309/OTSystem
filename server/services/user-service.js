
const userModel = require('../models/user');
const otUserModel = require('../models/ot-user');
const otDeptModel = require('../models/ot-dept');
const sequelize = require('../mysql/zentao-mysql');

const login = async (options) => {
  let data = await userModel.findOne({
    attributes: ['id', 'account', 'realname', 'dept'],
    where: { account: options.account, password: options.password }
  }).catch(e => {
    console.log('@@##Login catch:' + e);
    throw e;
  });

  console.log('@@##data:' + JSON.stringify(data));
  if (data) {
    // 保存更新记录
    await otUserModel.upsert(data.dataValues, { validate: true }).then(result => {
      console.log('@@##upset result:' + JSON.stringify(result));
    }).catch(e => {
      console.log('@@##upsert catch:' + e);
      throw e;
    });
  }

  return data;
};

// 同步部门数据
const syncDept = async () => {
  let result = await sequelize.query('select * from zt_dept', { type: sequelize.QueryTypes.SELECT });
  console.log('@@##sync dept:' + JSON.stringify(result));
  if (result && result.length > 0) {
    result.forEach(async element => {
      element.leader = element.manager;
      var leader = await userModel.findOne({
        attributes: ['account', 'realname'],
        where: {
          account: element.manager
        }
      }).catch(e => {
        console.log('@@##syncDept catch:' + e);
        throw e;
      });

      if (leader && leader.dataValues) {
        console.log('@@##learder name:' + leader.dataValues.realname);
        element.leaderName = leader.dataValues.realname;
        // element.checker = leader.account;
        // element.checkerName = element.leaderName;
      }
      otDeptModel.upsert(element).then(createRe => {
        console.log('create result:' + JSON.stringify(createRe));
      });
    });
  }

  // let re = {};
  // try {
  //   let ztDept = sequelize.query('select * from zt_dept', { type: sequelize.QueryTypes.SELECT }).then(result => {
  //     // console.log('@@##sync dept :' + JSON.stringify(result));
  //     if (result && result.length > 0) {
  //       result.forEach(element => {
  //         element.leader = element.manager;
  //         otDeptModel.upsert(element).then(createRe => {
  //           console.log('create result:' + JSON.stringify(createRe));
  //           re.count++;
  //           if (re.count === result.length) {

  //           }
  //         });
  //       });
  //     }
  //   });
  // } catch (e) {

  // }
};

const fuzzySearch = async (options) => {
  let data = await userModel.findAll(options).catch(e => {
    console.log('@@##fuzzySearch catch:' + e);
    throw e;
  });
  return data;
};

// 账号查找是否有这个用户
const getUser = async (options) => {
  let data = await userModel.findAll({ where: { account: options.account } }).catch(e => {
    throw e;
  });
  return data;
};

module.exports = {
  login,
  syncDept,
  fuzzySearch,
  getUser
};
