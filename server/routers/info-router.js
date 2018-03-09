const apiRouter = require('koa-router')();
const infoCtrl = require('../controllers/info-ctrl');
// apiRouter.post('/findAll', infoCtrl.findAll);

apiRouter.post('/applyOt', infoCtrl.applyOt);

apiRouter.post('/deleteInfo', infoCtrl.deleteInfo);

apiRouter.post('/getPersonalInfo', infoCtrl.getPersonalInfo);

module.exports = apiRouter;
