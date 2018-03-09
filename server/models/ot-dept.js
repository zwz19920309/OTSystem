/**
 * 部门
 */
const userSequelize = require('../mysql/ot-app-mysql');
const Sequelize = require('sequelize');

// `id` int NOT NULL,
// `name` varchar(200) NULL,
// `parent` int NULL,
// `path` varchar(200) NULL,
// `grade` int NULL,
// `leader` varchar(30) NULL,
// `checker` varchar(30) NULL COMMENT '审核者',
// `checker2` varchar(30) NULL COMMENT '审核者2',
// `remark` varchar(200) NULL,
// `remark1` varchar(200) NULL,
// `remark2` varchar(200) NULL,

var Department = userSequelize.define('t_dept', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(30)
  },
  parent: {
    type: Sequelize.INTEGER
  },
  grade: {
    type: Sequelize.INTEGER
  },
  leader: {
    type: Sequelize.STRING(30)
  },
  // 部门负责人中文名
  leaderName: {
    type: Sequelize.STRING(30)
  },
  checker: {
    type: Sequelize.STRING(30)
  },
  // 部门审核人中文名
  checkerName: {
    type: Sequelize.STRING(30)
  },
  checker2: {
    type: Sequelize.STRING(30)
  },
  remark: {
    type: Sequelize.STRING(30)
  }
}, {
  // 不要添加时间戳属性 (updatedAt, createdAt)
  // timestamps: false,
  // underscored: true,
  tableName: 't_dept'
});

module.exports = Department;
