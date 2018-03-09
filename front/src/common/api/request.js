import axios from 'axios';

import router from '@/router';

import store from '@/stores/';
import { LOADING, STOP_LOADING } from '@/stores/mutations-type';

let base = process.env.API_ROOT;

function getToken () {
  return sessionStorage.getItem('token');
}
// 统一的错误处理
function noError (data) {
  if (data && data.code === 20) {
    router.push({ name: 'Login' });
    return false;
  }
  return true;
}
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
console.log('base is ' + base);
const apiInstance = axios.create({
  baseURL: base,
  headers: { 'Content-Type': 'application/json' }
});

let loadingInstance = null;
// 添加请求拦截器
apiInstance.interceptors.request.use(function (config) {
  // 在发送请求之前做某事
  // console.log('@@##request before!' + JSON.stringify(config))
  // let url = config.url.substr(config.baseURL.length + 1)
  let url = config.url;
  // 全屏处理
  // if (loadingMaps[url] && loadingMaps[url] == 3) {
  //   loadingInstance = Loading.service({ fullscreen: true, text: '加载中，请稍候...' });
  // } else
  if (loadingMaps[url]) {
    store.dispatch(LOADING, loadingMaps[url]);
  }

  // 所以请求都带上token
  config.headers.token = getToken();

  return config;
}, function (error) {
  // 请求错误时做些事
  if (loadingInstance) {
    loadingInstance.close();
  }
  return Promise.reject(error);
});
// 添加响应拦截器
apiInstance.interceptors.response.use(function (response) {
  // loadingInstance.close();
  // 对响应数据做些事
  let url = response.config.url;
  if (response.config.baseURL) {
    url = response.config.url.substr(response.config.baseURL.length + 1);
  }
  console.log('@@##response after:' + response.request.responseURL);
  // if (loadingMaps[url] && loadingMaps[url] == 3) {
  //   if (loadingInstance) {
  //     loadingInstance.close();
  //   }
  // } else
  if (loadingMaps[url]) {
    store.dispatch(STOP_LOADING, loadingMaps[url]);
  }
  if (response && response.status === 200 && noError(response.data)) { // 网络响应值是200并且通过了统一的错误处理
    return response.data;
  }
  return response.data;
}, function (error) {
  if (loadingInstance) {
    loadingInstance.close();
  }
  // 请求错误时做些事
  console.log('@@##response error:' + JSON.stringify(error));
  if (error) {
    router.push({ name: 'error', params: { message: error.response } });
  }
  return Promise.reject(error);
});

/**
 * @desc  检查用户session userid token 若有则返回，无则返回空，则作跳转处理(待开发)
 *        或者在http拦截前添加处理(正解)
 */
// function checkSession () {
//   let user = Vue.getCache('user', 'session');
//   return !user || !user.userId ? '' : user.userId;
// }

const api = {};
// url对应的loading方式 loadingType:1:table,2:模块,3: 全屏
let loadingMaps = {};

api.TABLE_LOADING = 1;

api.MODULE_LOADING = 2;

api.FULL_LOADING = 3;

api.BUTTON_LOADING = 4;

api.post = function (url, params, LoadingType, options) {
  loadingMaps[url] = LoadingType;
  console.log('@@##api post ' + JSON.stringify(loadingMaps));
  return apiInstance.post(url, params, options);
};

api.get = function (url, params) {
  return apiInstance.get(url, params);
};

api.setInterceptors = function (request, response) {
  apiInstance.interceptors.request.use(request);
  apiInstance.interceptors.response.use(response);
};

export default api;
