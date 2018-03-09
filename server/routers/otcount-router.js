const otcountRouter = require('koa-router')();
const otcountCtrl = require('../controllers/otcount-ctrl');

otcountRouter.post('/uploadHoliday', otcountCtrl.uploadHoliday);
otcountRouter.post('/findDataByMoth', otcountCtrl.findDataByMoth);
otcountRouter.get('/exportHoliday', otcountCtrl.exportHoliday);
module.exports = otcountRouter;
