import request from './request';

/**
 * @desc 登录
 * @param {
"userName":"qy",
"userType":"master",
"cityId":"0"
}
 */
export const login = function (params) {
  return request.post('user/login', params, request.BUTTON_LOADING);
};

export const fuzzySearch = function (params) {
  return request.post('user/fuzzySearch', params, request.BUTTON_LOADING);
};

export const syncDept = function (params) {
  return request.post('user/syncDept', params, request.BUTTON_LOADING);
};

export const logout = function (params) {
  return request.post('user/logout', params, request.BUTTON_LOADING);
};
