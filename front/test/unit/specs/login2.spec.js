import Vue from 'vue';
// import Login from '@/views/login';
import CacheData from '@/libs/cache-data';
import Vuex from 'vuex';
import store from '@/stores/';
import flushPromises from 'flush-promises';

import router from '@/router/';

import { mount, createLocalVue } from 'vue-test-utils';

import * as types from '@/stores/mutations-type';

import chai from 'chai';
const expect = chai.expect;

Vue.use(Vuex);
Vue.use(CacheData);

describe('login.vue', () => {
  // it('should login success', () => {
  //   const Constructor = Vue.extend({ Login, store });
  //   const vm = new Constructor().$mount();
  //   // expect(vm.$el.querySelector('.hello h1').textContent)
  //   //   .to.equal('Welcome to Your Vue.js App');
  //   vm.account = 'zhaizhenyong';
  //   vm.password = 'zhaizhenyong';
  //   vm.submit();
  // });
  let inject = null;
  let component = null;
  beforeEach('模拟HTTP', () => {
    inject = require('!!vue-loader?inject!@/views/login.vue');
    component = inject({
      '@/common/api/user': {
        login (params) {
          // let data = { code: '-1', msg: '这是测试' };
          // resolve(data);
          return new Promise((resolve) => {
            let data = { code: -1, msg: '这是测试!!!' };
            console.log('@@##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~' + JSON.stringify(params));
            if (params.account === 'zhaizhenyong') {
              data = {
                'code': 1,
                'msg': '登录成功',
                'data': {
                  'id': 47,
                  'account': 'zhaizhenyong',
                  'realname': '前端-翟镇勇',
                  'dept': 14,
                  'token': 'teststetsses'
                }
              };
            }
            resolve(data);
          });
        }
      }
    });
  });

  const localValue = createLocalVue();
  localValue.use(CacheData);
  localValue.use(Vuex);
  localValue.use(router);

  it('use login success', async () => {
    // // 现在挂载组件，你便得到了这个包裹器
    const wrapper = mount(component, {
      store,
      localValue
    });

    // 你可以通过 `wrapper.vm` 访问实际的 Vue 实例
    const vm = wrapper.vm;

    vm.account = 'zhaizhenyong';
    vm.password = 'zhaizhenyong';

    vm.submit();

    await flushPromises();

    console.log('@@##end success!' + vm.$store.state.user.userInfo.account);

    expect(vm.$store.state.user.userInfo.account).to.be.equal('zhaizhenyong');

    // wrapper.find('button').trigger('click');

    // console.log('@@##test:' + vm.test());
  });

  it('use login fail', async () => {
    // 现在挂载组件，你便得到了这个包裹器
    const wrapper = mount(component, {
      store, localValue
    });

    // 你可以通过 `wrapper.vm` 访问实际的 Vue 实例
    const vm = wrapper.vm;

    vm.$store.commit(types.USER_LOGOUT);

    vm.account = 'sdsfd';
    vm.password = '111';

    vm.submit();
    await flushPromises();
    // wrapper.find('button').trigger('click');

    console.log('@@##test:' + vm.test());

    expect(vm.$store.state.user.userInfo.account).to.be.undefined;
  });

  it('save pwd', async () => {
    const wrapper = mount(component, {
      store,
      localValue
    });

    // 你可以通过 `wrapper.vm` 访问实际的 Vue 实例
    const vm = wrapper.vm;

    vm.account = 'zhaizhenyong';
    vm.password = 'zhaizhenyong';
    // wrapper.find({ ref: 'checkbox' }).trigger('click');
    vm.onCheck(true);
    await flushPromises();
    expect(vm.isSavePWD).to.be.true;
  });
});
