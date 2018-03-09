import * as types from './mutations-type';

export default {
  state: {
    loadingType: 0,
    tableLoading: false, // 表格中的局部加载
    moduleLoading: false, // 模块中的局部加载
    fullLoading: false,    // 全屏加载
    buttonLoading: false  // 按钮加载
  },
  mutations: {
    [types.LOADING] (state, loadingType) {
      console.log('@@##start loading!' + loadingType);
      state.loadingType = loadingType;
      // 1: table,2:module,3: full
      if (loadingType === 1) {
        state.tableLoading = true;
      } else if (loadingType === 2) {
        state.moduleLoading = true;
      } else if (loadingType === 3) {
        state.fullLoading = true;
      } else if (loadingType === 4) {
        state.buttonLoading = true;
      }
    },
    [types.STOP_LOADING] (state, loadingType) {
      console.log('@@##stop loading!' + JSON.stringify(loadingType));
      state.loadingType = loadingType;
      if (loadingType === 1) {
        state.tableLoading = false;
      } else if (loadingType === 2) {
        state.moduleLoading = false;
      } else if (loadingType === 3) {
        state.fullLoading = false;
      } else if (loadingType === 4) {
        state.buttonLoading = false;
      }
    }
  },
  actions: {
    [types.LOADING] (ctx, loadingType) {
      ctx.commit(types.LOADING, loadingType);
    },
    [types.STOP_LOADING] (ctx, loadingType) {
      ctx.commit(types.STOP_LOADING, loadingType);
    }
  },
  getters: {}
};
