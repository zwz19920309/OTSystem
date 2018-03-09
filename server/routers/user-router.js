const apiRouter = require('koa-router')();
const userCtrl = require('../controllers/user-ctrl');
var jwt = require('./jwt-utils');
apiRouter.post('/login', userCtrl.login);
apiRouter.post('/syncDept', userCtrl.syncDept);
apiRouter.post('/fuzzySearch', userCtrl.fuzzySearch);
apiRouter.post('/logout', userCtrl.logout);
module.exports = apiRouter;
