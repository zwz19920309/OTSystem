

const toolsUtil = require('../../common/utils/tools');
const httpResult = require('../../common/http/http-result');
const authService = require('../../services/settings/auth-service');
const tokenService = require('../../common/token/token.js');

/**
* 获取部门列表
* @param  {object} ctx 请求参数
* @return {object} 部门列表数据
*/
const getDeptList = async (ctx) => {
  let params = ctx.request.body || {};
  let result = {};
  params = toolsUtil.dealParams(params);
  try {
    let res = await authService.getDeptList(params);
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, '获取数据成功', res);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.FAIL, '获取数据失败', { msg: '系统异常' });
  }
  ctx.response.body = result;
};

/**
* 更新部门列信息
* @param  {object}  ctx 请求参数
* @return {object} 更新结果
*/
const updateDept = async (ctx) => {
  let user = {};
  if (ctx.request.headers.token) {
    user = await tokenService.get(ctx.request.headers.token);

    if (!(user.account === 'qusumei' || user.account === 'baiyushi' || user.account === 'zhaizhenyong')) {
      ctx.response.body = httpResult.response(httpResult.HttpStatus.FAIL, '您无该操作权限', {});
      return;
    }
  };
  let params = ctx.request.body || {};
  let result = {};
  try {
    if (!params.id || !params.checker || !params.checkerName) {
      result = httpResult.response(httpResult.HttpStatus.FAIL, '参数缺失', {});
    } else {
      let res = await authService.updateDept({ checker: params.checker, checkerName: params.checkerName }, { where: { id: params.id } });
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, '更新数据成功', res);
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.FAIL, '更新数据失败', { msg: '系统异常' });
  }
  ctx.response.body = result;
};

// /**
// * 上传文件
// * @param  {object}  ctx 请求参数
// * @return {object} 更新结果
// */
// const testFile = async (ctx) => { 
//   let result = {};
//   try {
//     let rootPath = path.resolve(__dirname, '../../public');
//     let sRes = await uploadUtil.uploadFile(ctx.req, rootPath);
//     result = (sRes.status === resUtil.RSTATUS) ? 
//     httpResult.response(httpResult.HttpStatus.SUCCESS, '文件上传成功', sRes.body) : httpResult.response(httpResult.HttpStatus.FAIL, '文件上传失败', sRes.body);
//   } catch (e) {
//     result = httpResult.response(httpResult.HttpStatus.FAIL, '系统异常', {err: e});
//   }
//   ctx.response.body = result;
// }
module.exports = {
  getDeptList,
  updateDept
};
