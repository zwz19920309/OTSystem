const apiRouter = require('koa-router')();
const authCtrl = require('../controllers/settings/auth-ctrl');

apiRouter.post('/getDeptList', authCtrl.getDeptList);
apiRouter.post('/updateDept', authCtrl.updateDept);
module.exports = apiRouter;
