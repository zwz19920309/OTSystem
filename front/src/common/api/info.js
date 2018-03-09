import request from './request';

// 申请/修改 加班
export const applyOt = function (params) {
  return request.post('info/applyOt', params, request.FULL_LOADING);
};

// 查找个人加班信息
export const getPersonalInfo = function (params) {
  return request.post('info/getPersonalInfo', params, request.TABLE_LOADING);
};

// 删除个人加班信息
export const deleteInfo = function (params) {
  return request.post('info/deleteInfo', params, request.TABLE_LOADING);
};
