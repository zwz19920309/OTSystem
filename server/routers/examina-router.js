const examinaRouter = require('koa-router')();
const examinaCtrl = require('../controllers/examina-ctrl');
var jwt = require('./jwt-utils');

// 获取我的审核列表
examinaRouter.post('/getExaminaList', examinaCtrl.getList);
/* 修改数据的status */
examinaRouter.post('/changeExaminaStatus', jwt.verify, examinaCtrl.changeExaminaStatus);

examinaRouter.post('/passExaminaList', examinaCtrl.passExaminaList);

examinaRouter.post('/getCheckedList', examinaCtrl.getCheckedList);

module.exports = examinaRouter;
