const userSequelize = require('../mysql/zentao-mysql');
const Sequelize = require('sequelize');

// `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
// `dept` mediumint(8) unsigned NOT NULL DEFAULT '0',
// `account` char(30) NOT NULL DEFAULT '',
// `password` char(32) NOT NULL DEFAULT '',
// `role` char(10) NOT NULL DEFAULT '',
// `realname` char(30) NOT NULL DEFAULT '',
// `nickname` char(60) NOT NULL DEFAULT '',
var User = userSequelize.define('zt_user', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  dept: {
    type: Sequelize.INTEGER
  },
  account: {
    type: Sequelize.STRING(30)
  },
  password: {
    type: Sequelize.STRING(32)
  },
  realname: {
    type: Sequelize.STRING(30)
  }
}, {
    // 不要添加时间戳属性 (updatedAt, createdAt)
  timestamps: false,
    // underscored: true,
  tableName: 'zt_user'
});

// force: true will drop the table if it already exists
// User.sync({ force: true }).then(function () {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });

module.exports = User;
