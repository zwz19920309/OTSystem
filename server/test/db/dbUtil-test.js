const assert = require('assert');
const expect = require('chai').expect;
const OTInfoModel = require('../../models/ot-info');
const DeptModel = require('../../models/ot-dept');
const dbUtil = require('../../common/db/dbUtil');
// const Sequelize = require('sequelize');
const otSequelize = require('../../mysql/ot-app-mysql');

describe('dbUtil', () => {
    it('test findAll', async () => {
    //   let result = await dbUtil.findAll(OTInfoModel, {include: {model: DeptModel, where: {id: otSequelize.col('t_ot_info.deptId')}}});
    let result = await dbUtil.findAll(OTInfoModel, {where: { id: 1 }, include: [{model: DeptModel, where: { id: otSequelize.col('t_ot_info.deptId') }}]});
    console.log('@result: ');
    console.dir(result);
    expect(result.body.length).to.be.equal(2);
  });
});

describe('dbUtil', () => {
    it('test count', async () => {
      let result = await dbUtil.count(OTInfoModel);
      expect(result.body).to.be.equal(2);
    });
});
  
  
// describe('dbUtil', () => {
//     it('test delete', async () => {
//       let result = await dbUtil.deleteByCons(OTInfoModel, {where: {id: 2}});
//       expect(result.body).to.be.equal(1);
//     });
// });
  

describe('dbUtil', () => {
    it('test update', async () => {
      let result = await dbUtil.updateData(OTInfoModel, {name: 'haha'}, {where: {id: 2}});
      expect(result.body[0]).to.be.equal(1);
    });
});
  