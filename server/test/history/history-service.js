
const historyService = require('../../services/history-service');
const expect = require('chai').expect;
describe('测试history record service', () => {
  it('test add record', async () => {
    let result = await historyService.addRecord({}).catch(e => {

    })

    expect(result[0]).to.be.equal(1);

  })

})