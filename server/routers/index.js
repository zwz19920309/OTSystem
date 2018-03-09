
/* 整合子路由 */
const Router = require('koa-router');

// var jwt = require('koa-jwt');

let userApi = require('./user-router');
let InfoApi = require('./info-router');
let overtimen = require('./overtimen-router');
let examina = require('./examina-router');
let settingsApi = require('./settings-router');
let otcountApi = require('./otcount-router');
var jwt = require('./jwt-utils');

// 装载所有子路由
let router = new Router();

// router.use(jwt({ secret: 'zhaizy' }));

const check = async (ctx, next) => {
  console.log('@@##check!');
  return next();
};

// 接口中转直连
router.use('/user', check, userApi.routes(), userApi.allowedMethods());
router.use('/info', check, jwt.verify, InfoApi.routes(), InfoApi.allowedMethods());
router.use('/overtimen', overtimen.routes(), overtimen.allowedMethods());
router.use('/examina', jwt.verify, examina.routes(), examina.allowedMethods());
router.use('/otcount', otcountApi.routes(), otcountApi.allowedMethods());
router.use('/settings', settingsApi.routes(), settingsApi.allowedMethods());
module.exports = router;
