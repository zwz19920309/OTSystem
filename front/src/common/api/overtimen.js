import request from './request';
import config from '@/config/config';
const overtimen = {
  /*
  * 所有加班
  * @param  {Object} 查询参数
  * @return {Object} 加班列表
  */
  infoList: function (params) {
    return request.post('overtimen/infoList', params, request.BUTTON_LOADING);
  },
  /*
  * 加班列表excel下载
  * @param  {Object} 查询参数
  * @return {File} 加班列表Excel文件
  */
  download: function (params) {
    return request.get('overtimen/download', params, request.BUTTON_LOADING);
  },
   /*
  * 加班列表分页查询
  * @param  {Object} 查询参数
  * @return {Object} 加班列表
  */
  findDataByPage: function (params) {
    return request.post('overtimen/findDataByPage', params, request.BUTTON_LOADING);
  },

  /*
  * 加班列表分页查询
  * @param  {Object} 查询参数
  * @return {Object} 加班列表
  */
  deleteData: function (params) {
    return request.post('overtimen/deleteData', params, request.BUTTON_LOADING);
  },
  /*
  * 更新加班数据
  * @param  {Object} 更新参数
  * @return {Object} 返回结果
  */
  updateData: function (params) {
    return request.post('overtimen/updateData', params, request.BUTTON_LOADING);
  },
  /*
  * 加班列表excel下载路径
  */
  downloadExcelUrl: config.backend.ip + '/overtimen/download'
};

export default overtimen;
