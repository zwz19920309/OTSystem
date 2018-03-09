const userService = require('../services/user-service');
const assert = require('assert');
const md5 = require('md5');
const supertest = require('supertest');
const Koa = require('koa');
// const app = new Koa();
// const router = require('../routers/index');
// app.use(router.routes()).use(router.allowedMethods());
const app = require('../app.js');
const jwt = require('../routers/jwt-utils');
const jsonwebtoken = require('jsonwebtoken');
const expect = require('chai').expect;
var server = app.listen(3000);
const httpStatus = require('../common/http/http-result');
// 集成测试使用
let request = supertest(server);

// let request = supertest.agent('http://localhost:3003');

describe('test user service', () => {
  let req;
  // 测试接口前一定要先登录
  before('获取登录', () => {
    it('test login sucess', (done) => {
      request.post('/user/login').send({ account: 'zhaizhenyong', password: 'zhaizhenyong' }).on('error', (errors) => {
        console.log('@@##errors:' + errors);
      }).expect(200).end((errr, res) => {
        console.log('@@##/user/login:' + JSON.stringify(res.body));
        expect(res.body.code).to.be.equal(0);
        console.log('@@##end!!!');
        done();
      });

      // let res = await userService.login({ account: 'zhaizhenyong', password: 'zhaizhenyong' });
      // console.log('@@##res:' + JSON.stringify(res));
      // expect(res.name).to.be.equal('zhaizhenyong');

      // console.log('@@##end!!!');
    });
  });
  it('test login sucess', (done) => {
    request.post('/user/login').send({ account: 'zhaizhenyong', password: 'zhaizhenyong' }).on('error', (errors) => {
      console.log('@@##errors:' + errors);
    }).expect(200).end((errr, res) => {
      console.log('@@##/user/login:' + JSON.stringify(res.body));
      expect(res.body.code).to.be.equal(1);
      console.log('@@##end!!!');
      done();
    });
    // let res = await userService.login({ account: 'zhaizhenyong', password: 'zhaizhenyong' });
    // console.log('@@##res:' + JSON.stringify(res));
    // expect(res.name).to.be.equal('zhaizhenyong');

    // console.log('@@##end!!!');
  });


  it('test overtimen success', (done) => {
    request.post('/overtimen/findDataByPage').send({ account: 'zhaizhenyong', password: 'zhaizhenyong' }).on('error', (errors) => {
      console.log('@@##errors:' + errors);
    }).expect(200).end((errr, res) => {
      console.log('@@##/overtimen/findDataByPage:' + JSON.stringify(res.body));
      expect(res.body.code).to.be.equal(1);
      console.log('@@##end!!!');
      done();
    });
  });


  it('test overtimen success', (done) => {
    request('/overtimen/download').send({ account: 'zhaizhenyong', password: 'zhaizhenyong' }).on('error', (errors) => {
      console.log('@@##errors:' + errors);
    }).expect(200).end((errr, res) => {
      console.log('@@##/overtimen/findDataByPage:' + JSON.stringify(res.body));
      expect(res.body.code).to.be.equal(1);
      console.log('@@##end!!!');
      done();
    });
  });




  after('关闭服务器', (done) => {
    console.log('@@##关闭服务器');
    // req.abort();
    // request.close();
    // if (server) { server.close(done); }
    done();
  });
});
