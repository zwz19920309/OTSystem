import * as types from './mutations-type';

export default {
  state: {
    token: sessionStorage.getItem(types.USER_LOGIN),
    userInfo: sessionStorage.getItem(types.USER_INFO) ? JSON.parse(sessionStorage.getItem(types.USER_INFO)) : {}
  },
  mutations: {
    [types.USER_LOGIN] (state, userInfo) {
      state.token = userInfo.token;
      state.userInfo = userInfo;
      sessionStorage.setItem(types.USER_LOGIN, state.token);
      sessionStorage.setItem(types.USER_INFO, JSON.stringify(userInfo));
      console.log('@@##USER_LOGIN:' + JSON.stringify(userInfo));
    },
    [types.USER_LOGOUT] (state) {
      state.userId = null;
      state.userInfo = {};
      sessionStorage.setItem(types.USER_LOGIN, '');
      sessionStorage.setItem(types.USER_INFO, '');
    }
  },
  actions: {
    [types.USER_LOGOUT] (ctx) {
      return new Promise((resolve, reject) => {
        ctx.commit(types.USER_LOGOUT);
        resolve();
      });
    }
  },
  getters: {

  }
};
