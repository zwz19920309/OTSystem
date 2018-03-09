const dateUtil = require('./date');
const checkStatus = require('../../services/examine-status/index');
const validator = require('../../common/utils/validator');
module.exports = {
  // 将model转换为excel数据
  modelToExcel: function (dataList) {
    let jsonArr = [];
    if (dataList && dataList[0] && dataList[0].dataValues) {
      for (let m in dataList) {
        dataList[m].dataValues.operator = (dataList[m].dataValues.t_dept && dataList[m].dataValues.t_dept.checkerName) ? dataList[m].dataValues.t_dept.checkerName : '';
        dataList[m].dataValues.status = checkStatus['status' + dataList[m].dataValues.status].name;
        dataList[m].dataValues.date = dateUtil.dateFormat(dataList[m].dataValues.startTime , 'yyyy-MM-dd');
        dataList[m].dataValues.start = dateUtil.dateFormat(dataList[m].dataValues.startTime , 'hh:mm');
        dataList[m].dataValues.end =  dateUtil.dateFormat(dataList[m].dataValues.endTime , 'hh:mm');
        dateUtil.DatetoString(dataList[m].dataValues);
        jsonArr.push(dataList[m].dataValues);
      }
    } else {
      jsonArr = dataList;
    }
    return jsonArr;
  },
  // 将model转换为json数据
  modelToJson: function (dataList) {
    let jsonArr = [];
    if (dataList && dataList[0] && dataList[0].dataValues) {
      for (let m in dataList) {
        jsonArr.push(dataList[m].dataValues);
      }
    } else {
      jsonArr = dataList;
    }
    return jsonArr;
  },
  dealParams: function (params) {
    let options = {};
    if (!validator.isEmpty(params)) {
      options.where = params;
    }
    return options;
  },
  // 将excel数组数据转为键值对模式
  excelToModel (excelArr, names, numFormat) {
    let data= [];
    for (let m in excelArr) {
      let ele = {};
      for (n in excelArr[m]) {
        if (numFormat && typeof(excelArr[m][n]) === 'number' ) {
          if (this.baseIsFloat(excelArr[m][n])) {
            excelArr[m][n] = excelArr[m][n].toFixed(2);
          }
        } 
        ele[names[n]] = excelArr[m][n];
      }
      data.push(ele);
    }
    return data;
  },
  // 为数组添加一个key,value
  addEleToArr (arr, name, value) {
    arr.forEach((val, index) => {
      val[name] = value;
    });
    return arr;
  },
  // 判断是否为浮点数
  baseIsFloat (theFloat) {
    let strNum = theFloat.toString();
    return (strNum.indexOf('.') > 0);
  }
}
