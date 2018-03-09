const holidaysSequelize = require('../mysql/ot-app-mysql');
const Sequelize = require('sequelize');

// `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
// `dept` mediumint(8) unsigned NOT NULL DEFAULT '0',
// `account` char(30) NOT NULL DEFAULT '',
// `password` char(32) NOT NULL DEFAULT '',
// `role` char(10) NOT NULL DEFAULT '',
// `realname` char(30) NOT NULL DEFAULT '',
// `nickname` char(60) NOT NULL DEFAULT '',
var Holidays = holidaysSequelize.define('t_holidays', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  sid: {
    type: Sequelize.BIGINT,
  },
  name: {
   type: Sequelize.STRING(30), unique:"uk_t_holiday"
  },
  account: {
    type: Sequelize.STRING(30)
  },
  holidays: {
    type: Sequelize.FLOAT
  },
  vacation: {
    type: Sequelize.FLOAT
  },
  moth: {
    type: Sequelize.STRING(30), unique:"uk_t_holiday"
  }
}, {
  timestamps: true,
  tableName: 't_holidays'
});

module.exports = Holidays;
