import Vue from 'vue';
import Login from '@/views/login';
import CacheData from '@/libs/cache-data';
import Vuex from 'vuex';
import store from '@/stores/';

import { mount, createLocalVue } from 'vue-test-utils';

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

  const localValue = createLocalVue();
  localValue.use(CacheData);
  localValue.use(Vuex);

  it('use login success', () => {
    // 现在挂载组件，你便得到了这个包裹器
    const wrapper = mount(Login, {
      store, localValue
    });

    // 你可以通过 `wrapper.vm` 访问实际的 Vue 实例
    const vm = wrapper.vm;

    vm.account = 'zhaizhenyong';
    vm.password = 'zhaizhenyong';

    // vm.submit();
    wrapper.find('button').trigger('click');

    console.log('@@##test:' + vm.test());
  });

  it('use login fail', () => {
    // 现在挂载组件，你便得到了这个包裹器
    const wrapper = mount(Login, {
      store, localValue
    });

    // 你可以通过 `wrapper.vm` 访问实际的 Vue 实例
    const vm = wrapper.vm;

    vm.account = '';
    vm.password = '';

    // vm.submit();
    wrapper.find('button').trigger('click');

    console.log('@@##test:' + vm.test());
    // expect();
  });
});
