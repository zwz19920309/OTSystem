const dateUtil = require('./date');
module.exports = {
  RResult: function (result, msg, code) {
    return {
      status: 'success',
      code: code || '0',
      body: result,
      message: msg || '操作成功'
    };
  },
  EResult: function (result, msg, code) {
    return {
      status: 'fail',
      code: code || '-1',
      body: result,
      message: msg || ''
    };
  },
  DatetoString: function (obj) {
    for (let m in obj) {
      if (Object.prototype.toString.call(obj[m]) === '[object Date]') {
        obj[m] = dateUtil.dateFormat(obj[m], 'yyyy-MM-dd hh:mm:ss');
      }
    }
  },
  // 分页函数
  pageOptions: function (params) {
    let options = params || {offset: 0, limit: 10};
    options.offset = options.offset ? options.offset : 0;
    options.limit = options.limit ? options.limit : 10;
    return options;
  }
};
