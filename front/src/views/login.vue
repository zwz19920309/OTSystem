<template>
  <div class="layout">
     
  <div class="login-form">
    <h3 class="title">掌中保日常办公管理系统</h3>
    <el-input class="item" type="text" placeholder="请输入账号" v-model="account"/>

    <el-input class="item" type="password" placeholder="请输入密码" v-model="password"/>

    <el-checkbox class="item left" type="checkbox" @change="onCheck" v-model="isSavePWD">保存密码</el-checkbox>

    <el-button type="primary" style="width:100%" class="item" @click="submit" :loading="$store.state.common.buttonLoading">登录</el-button>
  </div>
  </div>
</template>
<script>
import { login } from '@/common/api/user';
import Vue from 'vue';
import * as types from '@/stores/mutations-type';
export default {
  data () {
    return {
      account: '',
      password: '',
      isSavePWD: false
    };
  },
  methods: {
    test () {
      return '1213213';
    },
    submit () {
      if (!this.account) {
        this.$message.error('请输入帐号！');
        return;
      }
      if (!this.password) {
        this.$message.error('请输入密码！');
        return;
      }
      let params = { account: this.account, password: this.password };
      login(params).then(result => {
        console.log('@@##!!!!!!!!!!!!!!!!!!!!result:' + JSON.stringify(result) + ' ' + this.$store.state.common.buttonLoading);
        if (result && result.code === 1) {
          console.log('@@##!!!!!!!!!!!!!!!!!!!!result 0:');
          this.$store.commit(types.USER_LOGIN, result.data);

          this.$router.push({ name: 'OTHome' });
          console.log('@@##!!!!!!!!!!!!!!!!!!!!result 1:');
          if (this.isSavePWD) {
            Vue.setCache('login-user-info', params, 'local');
            console.log('@@##!!!!!!!!!!!!!!!!!!!!result 2:');
          }
        } else {
          this.$message.error(result && result.msg ? result.msg : '登录失败，请重新登录！');
        }
      });
    },
    onCheck (val) {
      Vue.setCache('isSavePWD', val, 'local');
      if (val) {
        let params = { account: this.account, password: this.password };
        Vue.setCache('login-user-info', params, 'local');
      }
    }
  },
  created () {
    console.log('@@##onCreated:');
    this.isSavePWD = Vue.getCache('isSavePWD', 'local');
    let userInfo = Vue.getCache('login-user-info', 'local');
    this.account = userInfo && userInfo.account ? userInfo.account : '';
    this.password = userInfo && userInfo.password ? userInfo.password : '';
  }
};
</script>
<style lang="less" scoped>
.layout {
  display: flex;
  min-height: 0;
  height: 100%;
  align-items: center;
  .login-form {
    display: flex;
    flex-direction: column;
    width: 20%;
    margin: 0 auto;
    border: 1px #dcdfe6 solid;
    border-radius: 10px;
    padding: 2rem;

    .title {
      // margin: 0;
      color: #303133;
      text-align: center;
      padding: 0.5rem;
    }
    .left {
      text-align: left;
    }
    .item {
      margin: 0.5rem;
      align-items: center;
    }
  }
}
</style>

