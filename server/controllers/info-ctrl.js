
const infoService = require('../services/info-service');
const httpResult = require('../common/http/http-result');
const jwt = require('jsonwebtoken');

const tokenService = require('../common/token/token.js');
const netUtils = require('../common/utils/net-utils');
// 查看全部加班信息
// const findAll = async (ctx) => {
//   let data = infoService.findAll();

//   ctx.response.body = { code: 0, data: data };
// };

// 查看个人加班
const getPersonalInfo = async (ctx) => {
  let data = ctx.request.body;
  let token = ctx.request.accept.headers.token;
  // var decoded = jwt.decode(token);
  // get the decoded payload and header
  // var decoded = jwt.decode(token, { complete: true });
  let userInfo = await tokenService.get(token);
  if (userInfo) {
    data.account = userInfo.account;
    data.operatorId = userInfo.id;
  }
  let resResult = httpResult.response(httpResult.HttpStatus.FAIL, '获取数据失败', {});
  try {
    let result = await infoService.getPersonalInfo(data);
    if (result) {
      resResult = httpResult.response(httpResult.HttpStatus.SUCCESS, '获取数据成功', result);
    }
  } catch (e) {
    resResult = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, null);
  }
  ctx.response.body = resResult;
};

// 申请加班
const applyOt = async (ctx) => {
  let data = ctx.request.body;
  let result = httpResult.response(httpResult.HttpStatus.FAIL, '添加失败');
  try {
    let token = ctx.request.accept.headers.token;
    // var decoded = jwt.decode(token);
    // get the decoded payload and header
    // var decoded = jwt.decode(token, { complete: true });
    let userInfo = await tokenService.get(token);
    if (userInfo) {
      data.account = userInfo.account;
      data.userId = userInfo.id;
    }
    data.IP = netUtils.getClientIp(ctx.request.req);

    if (await infoService.addInfo(data)) {
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, '添加成功');
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, null);
  }
  ctx.response.body = result;
};

// 删除加班记录
const deleteInfo = async (ctx) => {
  let result = await infoService.deleteInfo(ctx.request.body);
  if (result) {
    ctx.response.body = httpResult.response(httpResult.HttpStatus.SUCCESS, '删除成功');
    return;
  }
  ctx.response.body = httpResult.response(httpResult.HttpStatus.FAIL, '删除失败');
};

module.exports = {
  // findAll,
  applyOt,
  getPersonalInfo,
  deleteInfo
};
