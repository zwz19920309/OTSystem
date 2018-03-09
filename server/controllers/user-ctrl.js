const UserService = require('../services/user-service');
var md5 = require('md5');
const httpResult = require('../common/http/http-result');
const tokenCtrl = require('../common/token/token.js');

const login = async (ctx) => {
  let user = ctx.request.body;
  console.log('@@##login:' + JSON.stringify(user));

  console.log('@@##login password:' + md5(user.password));
  // await User.sync({ force: true });
  // // console.log('@@##result is ' + JSON.stringify(result));

  // let re = await User.create({
  //   account: user.account,
  //   password: user.password
  // });

  let result = null;

  user.password = md5(user.password);

  try {
    let data = await UserService.login(user);
    if (data) {
      let token = tokenCtrl.sign(user, data);
      data.dataValues.token = token;
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, '登录成功', data);
    } else {
      result = httpResult.response(httpResult.HttpStatus.FAIL, '帐号或密码错误，请重试!', undefined);
    }
  } catch (e) {
    console.log('@@##login catch:' + e);
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }

  ctx.response.body = result;
};

// 同步部门数据
const syncDept = async (ctx) => {
  let result = httpResult.response(httpResult.HttpStatus.SUCCESS, '同步部门数据成功', null);
  try {
    await UserService.syncDept();
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e, null);
  }

  ctx.response.body = result;
};

const fuzzySearch = async (ctx) => {
  let params = ctx.request.body;
  let result = null;
  let options = {};
  let account = params.account ? ('%' + params.account + '%') : '';
  let realname = params.realname ? ('%' + params.realname + '%') : '';
  if (account && realname) {
    options = { where: { $or: [{ account: { $like: account } }, { realname: { $like: realname } }] } };
  } else if (account) {
    options = { where: { account: { $like: account } } };
  } else if (realname) {
    options = { where: { realname: { $like: realname } } };
  }
  try {
    let data = await UserService.fuzzySearch(options);
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, '查询成功', data);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e, null);
  }
  ctx.response.body = result;
};

// 退出登录
const logout = async (ctx) => {
  let result;
  try {
    let token = ctx.request.header.token;
    tokenCtrl.del(token);
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, '退出成功', null);
    // }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e, null);
  }
  ctx.response.body = result;
};
module.exports = {
  login,
  syncDept,
  fuzzySearch,
  logout
};
