import request from './request';

const examina = {

  /* @desc 获取我的审核列表数据 */
  getCheckedList: function (params) {
    return request.post('examina/getCheckedList', params, request.TABLE_LOADING);
  },

  /* @desc 获取我的审核列表数据 */
  getExaminaList: function (params) {
    return request.post('examina/getExaminaList', params, request.TABLE_LOADING);
  },
  /* @desc 审核我的审核 */
  changeExaminaStatus: function (params) {
    return request.post('examina/changeExaminaStatus', params, request.FULL_LOADING);
  },

  /* @desc 批量审核我的审核 */
  passExaminaList: function (params) {
    return request.post('examina/passExaminaList', params, request.FULL_LOADING);
  }
};
export default examina;
