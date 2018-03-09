const overtimenRouter = require('koa-router')();
const overtimenCtrl = require('../controllers/overtimen-ctrl');

overtimenRouter.post('/infoList', overtimenCtrl.infoList);
overtimenRouter.get('/download', overtimenCtrl.download);
overtimenRouter.post('/findDataByPage', overtimenCtrl.findDataByPage);
overtimenRouter.post('/deleteData', overtimenCtrl.deleteData);
overtimenRouter.post('/updateData', overtimenCtrl.updateData);
module.exports = overtimenRouter;
