/**
 * 加班信息
 */
const otSequelize = require('../mysql/ot-app-mysql');
const Sequelize = require('sequelize');
const moment = require('moment');

// CREATE TABLE `t_ot_info` (
//   `id` bigint NOT NULL,
//   `name` varchar(255) NULL,
//   `startTime` datetime NULL,
//   `endTime` datetime NULL,
//   `days` float NULL,
//   `holidays` float NULL,
//   `reason` varchar(255) NULL,
//   `operator` varchar(255) NULL COMMENT '当前处理者',
//   `status` int NULL COMMENT '0:未审核 1:部门审核 2:项目审核 3:CTO审核',
//   `remark` varchar NULL,
//   `remark1` varchar NULL,
//   `remark2` varchar NULL,
//   `remark3` varchar NULL,
//   PRIMARY KEY (`id`)
//   FOREIGN KEY (`accountId`)
//   FOREIGN KEY (`deptId`)
//   );
var OTInfo = otSequelize.define('t_ot_info', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(30)
  },
  // 部门名字：一级+二级
  deptName: {
    type: Sequelize.STRING(30)
  },
  // 部门负责人中文名
  leaderName: {
    type: Sequelize.STRING(30)
  },
  // checkerName: {
  //   type: Sequelize.STRING(30)
  // },
  startTime: {
    allowNull: false,
    type: Sequelize.DATE(),
    get () {
      return moment(this.getDataValue('startTime')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  endTime: {
    allowNull: false,
    type: Sequelize.DATE(),
    get () {
      return moment(this.getDataValue('endTime')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  days: {
    type: Sequelize.FLOAT
  },
  holidays: {
    allowNull: true,
    defaultValue: 0,
    type: Sequelize.FLOAT
  },
  reason: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  // varchar(255) NULL COMMENT '当前处理者',
  operator: {
    type: Sequelize.STRING(30)
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  }, // int NULL COMMENT '0:未审核 1:部门审核 2:项目审核 3:CTO审核' 4:审核通过 5:审核拒绝,
  remark: {
    type: Sequelize.STRING(255)
  },
  remark1: {
    type: Sequelize.STRING(255)
  },
  remark2: {
    type: Sequelize.STRING(255)
  },
  remark3: {
    type: Sequelize.STRING(255)
  }
}, {
  // 不要添加时间戳属性 (updatedAt, createdAt)
  timestamps: true,
  // underscored: true,
  tableName: 't_ot_info'
});

module.exports = OTInfo;
