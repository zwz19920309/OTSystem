const HttpStatus = {
  SUCCESS: 1, // 返回成功
  FAIL: -1, // 返回失败
  EMPTY: -2, // 数据为空
  EXCEPTION: -3, // 程序异常
  ERROR_DB: 11, // 数据库请求异常
  ERROR_PARAMS: 12 // 入参异常
};

HttpStatus.checkHttpResult = (result) => {
  return result && result.code === HttpStatus.SUCCESS;
};

export default HttpStatus;
