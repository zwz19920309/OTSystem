
const expect = require('chai').expect;

describe('test 普通测试', () => {
  it('test parseInt', () => {
    let a = 0.5;
    expect(parseInt(a)).to.be.equal(0);
  });
  it('test parseFloat', () => {
    let a = 0.5;
    expect(parseFloat(a)).to.be.equal(0.5);
  });
});
