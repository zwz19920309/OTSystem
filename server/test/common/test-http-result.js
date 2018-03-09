let httpStatus = require('../../common/http/http-result');

const expect = require('chai').expect;

describe('test http-result', () => {
  it('http-result SUCCESS', () => {
    let result = httpStatus.response(httpStatus.HttpStatus.SUCCESS, 'success', { name: 'zhaizy' });
    expect(result.code).to.be.equals(1);
  });
  it('http-result FAILL', () => {
    let result = httpStatus.response(httpStatus.HttpStatus.FAIL, 'success', { name: 'zhaizy' });
    expect(result.code).to.be.equals(-1);
    expect(result.data.name).to.be.equals('zhaizy');
  });
});
