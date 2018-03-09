
const path = require('path');
const assert = require('assert');
const expect = require('chai').expect;
let excel = require('../../common/file/excel');
let fileUtil = require('../../common/file/file');
describe('Excel', function () {
	describe('create ExcelData Test', function () {
  	it('should return 0 when the options is right', function () {
      let jsonArr = [{id: '11', name: '1234', startTime: '2017-12-14', endTime: '2017-12-20', days: 12, holidays: 11}];
      let colsName = [{id: '编号'}, {name: '申请者'}, {startTime: '开始时间'}, {endTime: '结束时间'}, {days: '总时长'}, {holidays: '调休时长'}, {reason: '加班事由'}, {status: '状态'}, {operator: '部门负责人'}];
      let result = excel.create('加班申请表', jsonArr, colsName);
      expect(result.code).to.be.equal(0);
    })
	});
});


// create EcxelFile 
describe('create Excel File', function() {
  let excelResult = {};
  beforeEach (function () {
    let jsonArr = [{id: '11', name: '1234', startTime: '2017-12-14', endTime: '2017-12-20', days: 12, holidays: 11}];
    let colsName = [{id: '编号'}, {name: '申请者'}, {startTime: '开始时间'}, {endTime: '结束时间'}, {days: '总时长'}, {holidays: '调休时长'}];
    excelResult = excel.create('加班申请表', jsonArr, colsName);
  });
  it ('create Excel File Success', async () => {
    let rootPath = path.resolve(__dirname);
    let filePath = rootPath + '/加班申请表.xlsx';
    let fileResult = await fileUtil.writeFileAsync(filePath, excelResult.body);
    expect(fileResult).to.be.equal(undefined);
  });
});