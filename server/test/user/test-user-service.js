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
var server = app.listen(3000);
const httpStatus = require('../../common/http/http-result');
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

  // 登录失败
  it('test login fail', (done) => {
    request.post('/user/login').send({ account: 'zhaizhenyong', password: 'zhaizhenyong123' }).on('error', (errors) => {
      console.log('@@##errors:' + errors);
    }).expect(200).end((errr, res) => {
      console.log('@@##/user/login:' + JSON.stringify(res.body));
      expect(res.body.code).to.be.equal(-1);
      console.log('@@##end!!!');
      done();
    });
  });

  it('test login fail for exception!', (done) => {
    let config = require('../../config/db-config');
    config.MYSQL.PORT = 80;
    var server = app.listen(3003);
    // 集成测试使用
    let request2 = supertest(server);
    request2.post('/user/login').send({ account: 'zhaizhenyong', password: 'zhaizhenyong123' }).on('error', (errors) => {
      console.log('@@##errors:' + errors);
    }).expect(200).end((errr, res) => {
      console.log('@@##/user/login:' + JSON.stringify(res.body));
      expect(res.body.code).to.be.equal(-3);
      console.log('@@##end!!!');
      done();
    });
  });

  it('test syncDept', () => {
    app.use(jwt.verify);
    let token = jsonwebtoken.sign({
      data: { account: 'zhaizhenyong', password: 'zhaizhenyong' },
      // 设置 token 过期时间
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // 60 seconds * 60 minutes = 1 hour
    }, 'zhaizy');
    request.post('/user/syncDept').set('token', token).expect(200).end((errr, res) => {
      console.log('@@##/user/syncDept:' + JSON.stringify(res.body));
      // 断言返回的code是0
      expect(res.body.code).to.be.equal(0);
    });
    // userService.syncDept();
  });

  after('关闭服务器', (done) => {
    console.log('@@##关闭服务器');
    // req.abort();
    // request.close();
    // if (server) { server.close(done); }
    done();
  });
});
