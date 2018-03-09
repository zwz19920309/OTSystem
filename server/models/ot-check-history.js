const userSequelize = require('../mysql/ot-app-mysql');
const Sequelize = require('sequelize');

// `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
// `dept` mediumint(8) unsigned NOT NULL DEFAULT '0',
// `account` char(30) NOT NULL DEFAULT '',
// `password` char(32) NOT NULL DEFAULT '',
// `role` char(10) NOT NULL DEFAULT '',
// `realname` char(30) NOT NULL DEFAULT '',
// `nickname` char(60) NOT NULL DEFAULT '',
var CheckHistory = userSequelize.define('t_check_history', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  otId: {
    type: Sequelize.BIGINT
  },
  account: {
    type: Sequelize.STRING(30)
  },
  ip: {
    type: Sequelize.STRING(32)
  },
  operator: {
    type: Sequelize.STRING(30)
  },
  fromStatus: {
    type: Sequelize.INTEGER
  },
  toStatus: {
    type: Sequelize.INTEGER
  },
  remark: {
    type: Sequelize.STRING(200)
  }
}, {
    // 不要添加时间戳属性 (updatedAt, createdAt)
    timestamps: true,
    // underscored: true,
    tableName: 't_check_history'
  });

module.exports = CheckHistory;
