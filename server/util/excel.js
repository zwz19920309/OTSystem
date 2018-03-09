const xlsx = require('node-xlsx');
const fileUtil = require('./file');
/**
  * 生成Excel数据
  * @param  {String} tname 表名称
  * @param  {Array} jsonArr excel行内容
  * @param  {Array} colnames excel行名称
  * @return {object} Excel数据
 */
const create = function (tname, jsonArr, colnames) {
  // json数据转换为excel数据
  function trurnToExcelData (dataJson, cols) {
    let data = [];
    let names = [];
    let keys = {};
    let filter = false; // 根据cols输出字段
    // 列名
    if (cols instanceof Array) {
      if (cols[0] && (typeof cols[0] === 'string')) {
        data.push(cols);
      } else {
        for (let k in cols) {
          if (typeof cols[k] === 'object') {
            filter = true;
            for (let t in cols[k]) {
              names.push(cols[k][t]);
              keys[t] = 1;
            }
          }
        }
        data.push(names);
      }
    }
    // 具体数据
    for (let n in dataJson) {
      let arr = [];
      let value = dataJson[n];
      for (var m in value) {
        if (filter) {
          if (keys[m]) {
            arr.push(value[m]);
          }
        } else {
          arr.push(value[m]);
        }
      }
      data.push(arr);
    };
    return data;
  }
  if (!(jsonArr && jsonArr instanceof Array)) {
    return {error: 'jsonArr必须是json数组'};
  }
  let info = [{name: tname, data: (trurnToExcelData(jsonArr, colnames))}];
  let buffer = xlsx.build(info);
  return buffer;
};

module.exports = {
  create
};
