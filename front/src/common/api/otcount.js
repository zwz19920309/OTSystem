import request from './request';
import config from '@/config/config';
const otcountApi = {
  /*
  * 所有加班
  * @param  {Object} 查询参数
  * @return {Object} 加班列表
  */
  findDataByMoth: function (params) {
    return request.post('otcount/findDataByMoth', params, request.TABLE_LOADING);
  },
  uploadHoliday: function (params) {
    return request.post('otcount/uploadHoliday', params, request.TABLE_LOADING);
  },
  downloadExcelUrl: config.backend.ip + '/otcount/exportHoliday'
};

export default otcountApi;
