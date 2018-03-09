const examinaService = require('../services/examina-service');
// const jwtUtils = require('../routers/jwt-utils');
// const util = require('../util/util');
const httpResult = require('../common/http/http-result');
const jwt = require('jsonwebtoken');

const tokenService = require('../common/token/token.js');
const netUtils = require('../common/utils/net-utils');

/**
 * 获取已审批
 * @param ctx 
 */
const getCheckedList = async (ctx) => {
  let body = ctx.request.body;
  let result = null;
  if (!body || !body.account) {
    ctx.response.body = httpResult.response(httpResult.HttpStatus.FAIL, '参数不全', undefined);
    return;
  }
  try {
    result = await examinaService.getCheckedList(body);
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
}

const getList = async (ctx) => {
  let body = ctx.request.body;
  let result = null;
  if (!body || !body.account) {
    ctx.response.body = httpResult.response(httpResult.HttpStatus.FAIL, '参数不全', undefined);
    return;
  }
  try {
    result = await examinaService.getList(body);
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};
/** @desc 改变加班申请的状态
  @param {Array} rowId 加班数据的Id
  @param {string} ctrl 'pass'--通过 'reject'--拒绝
  @param {init} status [1-3]
*/
const changeExaminaStatus = async (ctx) => {
  let body = ctx.request.body;
  let result = '';
  if (!body || !body.id || !body.ctrl) { // 参数不全
    ctx.response.body = httpResult.response(httpResult.HttpStatus.ERROR_PARAMS, '参数不全', undefined);
    return;
  }
  try {
    let token = ctx.request.accept.headers.token;
    // var decoded = jwt.decode(token);
    // get the decoded payload and header
    // var decoded = jwt.decode(token, { complete: true });
    let userInfo = await tokenService.get(token);
    if (userInfo) {
      body.account = userInfo.account;
      body.operatorId = userInfo.id;
    }
    body.IP = netUtils.getClientIp(ctx.request.req);

    let data = null;
    if (body.ctrl === 'pass') {
      data = await examinaService.passExamina(body);
    } else if (body.ctrl === 'reject') {
      data = await examinaService.rejectExamina(body);
    } else {
      ctx.response.body = httpResult.response(httpResult.HttpStatus.ERROR_PARAMS, '参数ctrl不正确', undefined);
      return;
    }
    if (data) {
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', data);
    } else {
      result = httpResult.response(httpResult.HttpStatus.FAIL, 'FAIL', undefined);
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result; // 查完数据库以后的结果
};

const passExaminaList = async (ctx) => {
  let body = ctx.request.body;
  let result = null;
  try {
    let token = ctx.request.accept.headers.token;
    // var decoded = jwt.decode(token);
    // get the decoded payload and header
    var decoded = jwt.decode(token, { complete: true });

    body.account = decoded.payload.data.account;
    let data = await examinaService.passExaminaList(body);
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', data);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }

  ctx.response.body = result;

}
module.exports = {
  getCheckedList,
  getList,
  changeExaminaStatus,
  passExaminaList,
};
