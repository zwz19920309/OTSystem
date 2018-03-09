const userService = require('../../services/user-service');
const assert = require('assert');
const md5 = require('md5');
const supertest = require('supertest');
const Koa = require('koa');
// const app = new Koa();
// const router = require('../routers/index');
// app.use(router.routes()).use(router.allowedMethods());
const app = require('../../app.js');
const jwt = require('../../routers/jwt-utils');
const jsonwebtoken = require('jsonwebtoken');
const expect = require('chai').expect;
var server = app.listen(3003);
const httpStatus = require('../../common/http/http-result');
// 集成测试使用
let request = supertest(server);

// let request = supertest.agent('http://localhost:3003');

describe('test examine service', () => {
  let req;
  let token;
  // 测试接口前一定要先登录
  before('获取登录', (done) => {
    console.log('!!@@before!');
    // it('test login sucess', async (done) => {
    request.post('/user/login').send({ account: 'zhaizhenyong', password: 'zhaizhenyong' }).on('error', (errors) => {
      console.log('@@##errors:' + errors);
      done();
    }).expect(200).end((errr, res) => {
      console.log('@@##/user/login:' + JSON.stringify(res.body));
      token = res.body.data.token;
      expect(res.body.code).to.be.equal(httpStatus.HttpStatus.SUCCESS);
      console.log('@@##end!!!');
      done();
    });
    // });
  });
  it('test get examine list sucess', (done) => {
    request.post('/examina/getExaminaList').set('token', token).send({ account: 'zhaizhenyong', page: 0, size: 10 }).on('error', (errors) => {
      console.log('@@## examina errors:' + errors);
    }).expect(200).end((errr, res) => {
      console.log('@@##/examina/changeExaminaStatus' + JSON.stringify(res.body));
      expect(res.body.code).to.be.equal(httpStatus.HttpStatus.SUCCESS);
      console.log('@@##end!!!');
      done();
    });
  });
  it('test examina pass sucess', (done) => {
    request.post('/examina/changeExaminaStatus').set('token', token).send({ id: '18', ctrl: 'pass' }).on('error', (errors) => {
      console.log('@@## examina errors:' + errors);
    }).expect(200).end((errr, res) => {
      console.log('@@##/examina/changeExaminaStatus' + JSON.stringify(res.body));
      expect(res.body.code).to.be.equal(httpStatus.HttpStatus.SUCCESS);
      console.log('@@##end!!!');
      done();
    });
  });

  it('test examina reject sucess', (done) => {
    request.post('/examina/changeExaminaStatus').set('token', token).send({ id: '18', ctrl: 'reject' }).on('error', (errors) => {
    }).expect(200).end((errr, res) => {
      expect(res.body.code).to.be.equal(httpStatus.HttpStatus.SUCCESS);
      console.log('@@##end!!!');
      done();
    });
  });

  after('关闭服务器', (done) => {
    console.log('@@##关闭服务器');
    done();
  });
});
