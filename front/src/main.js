// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import Vuex from 'vuex';

import store from './stores/';

import CacheData from './libs/cache-data';

import './element-ui';

Vue.config.productionTip = false;

Vue.use(Vuex);

Vue.use(CacheData);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
