const userSequelize = require('../mysql/ot-app-mysql');
const Sequelize = require('sequelize');

// `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
// `dept` mediumint(8) unsigned NOT NULL DEFAULT '0',
// `account` char(30) NOT NULL DEFAULT '',
// `password` char(32) NOT NULL DEFAULT '',
// `role` char(10) NOT NULL DEFAULT '',
// `realname` char(30) NOT NULL DEFAULT '',
// `nickname` char(60) NOT NULL DEFAULT '',
var User = userSequelize.define('t_user', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  account: {
    type: Sequelize.STRING(30),
    primaryKey: true,
    unique: true
  },
  password: {
    type: Sequelize.STRING(32)
  },
  realname: {
    type: Sequelize.STRING(30)
  }
}, {
  // 不要添加时间戳属性 (updatedAt, createdAt)
  timestamps: true,
  // underscored: true,
  tableName: 't_user'
});

module.exports = User;
