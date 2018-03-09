<template>
<div class="relative h100">
  <div class="nav-header mainBg mainColor">
    <a>掌中保日常办公管理系统</a>
    <div class="f-right nav-hd-right">
      <span class="mrR20">{{realname}}</span>
      <span class="pointer" @click="logout()">退出</span>
    </div>
  </div>
  <div class="subnav">
    <el-row class="f-left h100">
      <el-col class="h100">
        <el-menu 
        class="h100"
          background-color="#545c64"
          text-color="#fff"
          :default-active="defalutIndex"
          :unique-opened=true
          @select="navSelect"
          active-text-color="#ffd04b">
          <el-submenu :index="String(index+1)" v-for="(list,index) in lists" :key="index">
            <template slot="title">
              <i :class="list.icon"></i>
              <span>{{list.name}}</span>
            </template>
            <el-menu-item-group v-for="(item, itemIndex) in list.children" :key="itemIndex">
              <el-menu-item :index="String(item.url)">{{item.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    <!-- 正文部分路由跳转 -->
    <div class="nav-contain">
      <router-view></router-view>
    </div>
    <!-- 正文部分路由跳转 -->
  </div>

</div>
</template>
<script>
import Vue from 'vue';
import { logout } from '@/common/api/user';
import * as types from '@/stores/mutations-type';
export default {
  data () {
    let lists = [{
      name: '审批',
      icon: 'el-icon-time',
      children: [{
        icon: 'el-icon-time',
        name: '加班',
        url: '/ot/apply'
      }
        // , {
        //   icon: 'el-icon-warning',
        //   name: '请假',
        //   url: '/ot/holiday'
        // }
      ]
    }, {
      name: '设置',
      icon: 'el-icon-time',
      children: [{
        icon: 'el-icon-time',
        name: '审批权限',
        url: '/ot/settings/authsetting'
      }
      // ,{
      //     icon: 'el-icon-warning',
      //     name: '查看权限',
      //     url: '/ot/settings/authcheck'
      //   }
      ]
    }];
    /* @desc 根据路由判断左边导航栏那个位置高亮
    * 遍历lists数组，看路由的url是否包含children的url，是，就高亮
    @author jiabao
    @return parentIndex--当前高亮的父index，activeIndexArry--当前高亮的[父index，url]，defaultIndex--当前高亮的导航栏的index
   */
    let user = Vue.getCache('login-user-info', 'local');
    let settingAuth = (user.account === 'baiyushi' || user.account === 'qusumei' || user.account === 'zhangjiaxin' || user.account === 'zhaizhenyong');
    if (!settingAuth) {
      lists.pop();
    }
    let _this = this;
    function getDefaultIndex () {
      let route = _this.$route.path;
      for (let i = 0; i < lists.length; i++) {
        for (let j = 0; j < lists[i].children.length; j++) {
          if (route.indexOf(lists[i].children[j].url) >= 0) {
            return {
              parentIndex: i + 1,
              activeIndexArry: [i + 1, lists[i].children[j].url],
              defaultIndex: lists[i].children[j].url
            };
          }
        }
      }
      console.log('路由出错');
      return {
        parentIndex: 0,
        activeIndexArry: [0, 0],
        defaultIndex: 0
      };
    }
    function realname () {
      if (_this.$store.state.user && _this.$store.state.user.userInfo) {
        return _this.$store.state.user.userInfo.realname;
      }
    }
    return {
      // 侧边导航栏默认高亮的index
      defalutIndex: getDefaultIndex().defaultIndex,
      activeIndex: getDefaultIndex().activeIndexArry,
      lists: lists,
      realname: realname()
    };
  },
  methods: {
    /* @desc element-ui自带的方法和参数
    @param 选中的(selectIndex):index,  (selectIndexArray) [总的第几个，选中的:index] */
    navSelect (selectIndex, selectIndexArray) {
      if (!selectIndex || !selectIndexArray || selectIndexArray.length < 2 || this.activeIndex[1] === selectIndexArray[1]) {
        return;
      }
      this.activeIndex = selectIndexArray;
      this.$router.push({
        path: selectIndex
      });
    },
    /* 退出登录 */
    logout () {
      logout().then(result => {
        if (result.code === 1) {
          this.$store.commit(types.USER_LOGOUT);
          localStorage.setItem('token', '');
          sessionStorage.setItem('token', '');
          this.$router.push({
            path: '/'
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
.nav-header {
  padding: 0 40px;
  z-index: 1;
  // background: #545c64 url("../assets/img/logo.png") no-repeat 20px center/25px;
  a {
    text-decoration: none;
    line-height: 60px;
    font-size: 30px;
    color: #ffc125;
  }
}
.nav-hd-right {
  width: 150px;
  line-height: 50px;
}
.nav-mainHeader {
  border-bottom: 0;
}
.subnav {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
}
.nav-subnav {
  float: left;
  width: 200px;
  height: 100%;
  text-align: left;
}
.nav-contain {
  padding: 10px 10px 0 7px;
  max-height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>

