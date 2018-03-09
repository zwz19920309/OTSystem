const otDept = require('./ot-dept.js');
const otInfo = require('./ot-info.js');
const otUser = require('./ot-user.js');
const otCheckHistory = require('./ot-check-history');
const sequelize = require('../mysql/ot-app-mysql');
const otHolidays = require('./ot-holidays.js');
/**
 * A.belognsTo(B) A是源模型 B是目标模型
 * belongsTo 外键存在于源模型
 * hasOne hasMany 外键存在于目标型
 */

otUser.belongsTo(otDept, { foreignKey: 'dept', constraints: false });
otInfo.belongsTo(otDept, { foreignKey: 'deptId', constraints: false });
otInfo.belongsTo(otUser, { foreignKey: 'userId', constraints: false });

otUser.hasMany(otInfo, { foreignKey: 'userId', sourceKey: 'id', constraints: false });

otDept.hasOne(otUser, { foreignKey: 'account', sourceKey: 'leader', constraints: false });

otDept.hasMany(otDept, { foreignKey: 'parent', constraints: false });

// 审批记录
otInfo.hasMany(otCheckHistory, { foreignKey: 'otId', sourceKey: 'id', constraints: false });
otCheckHistory.belongsTo(otUser, { foreignKey: 'userId', constraints: false });


// force: true will drop the table if it already exists
sequelize.sync({ force: false }).then(function () {
  // Table created
  console.log('@@##db sync!');
}).catch((err) => {
  console.log('@@##db sync failed.... ' + err);
});

// module.exports = {
//   otUser,
//   otInfo,
//   otDept
// };
