import request from '../request';

const authApi = {
  /* @desc 获取我的部门表数据 */
  getDeptList: function (params) {
    return request.post('settings/getDeptList', params, request.FULL_LOADING);
  },
  /* @desc 更新表数据 */
  updateDept: function (params) {
    return request.post('settings/updateDept', params, request.FULL_LOADING);
  },
  /* @desc 更新表数据 */
  testFile: function (params) {
    return request.post('settings/testFile', params, request.FULL_LOADING);
  }
};
export default authApi;
