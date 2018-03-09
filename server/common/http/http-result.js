/**
 * @author zhaizy 20171221
 */
const HttpStatus = {
  SUCCESS: 1, // 返回成功
  FAIL: -1, // 返回失败
  EMPTY: -2, // 数据为空
  EXCEPTION: -3, // 程序异常
  ERROR_DB: 11, // 数据库请求异常
  ERROR_PARAMS: 12, // 入参异常,
  TOKEN_OUTTIME: 20 // token超时
};

const response = (code, msg, result) => {
  return {
    code: code,
    msg: msg,
    data: result
  };
};

module.exports = {
  HttpStatus,
  response
};
