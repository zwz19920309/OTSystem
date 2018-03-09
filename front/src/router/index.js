import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login')
    }, {
      path: '/ot',
      name: 'OT',
      redirect: '/ot/apply',
      component: () => import('@/views/Nav'),
      children: [
        { // 审核-申请加班
          path: '/ot/apply',
          name: 'OTHome',
          redirect: '/ot/apply/myot',
          component: () => import('@/views/ot/ot-home'),
          children: [{ // 我的加班
            path: '/ot/apply/myot',
            name: 'myot',
            component: () => import('@/views/ot/ot-myot')
          }, { // 我的
            path: '/ot/apply/myexamine',
            name: 'myexamine',
            component: () => import('@/views/ot/ot-myexamine')
          }, { // 所有加班
            path: '/ot/apply/allovertimen',
            name: 'allovertimen',
            component: () => import('@/views/ot/ot-allovertimen')
          }, { // 调休统计
            path: '/ot/apply/otcount',
            name: 'otcount',
            component: () => import('@/views/ot/ot-count')
          }]
        },
        { // 设置
          path: '/ot/settings',
          name: 'OTSettings',
          component: () => import('@/views/settings/ot-settings'),
          children: [{ // 审批权限
            path: '/ot/settings/authsetting',
            name: 'authsetting',
            component: () => import('@/views/settings/auth/ot-auth-setting')
          },
          { // 查看权限
            path: '/ot/settings/authcheck',
            name: 'authcheck',
            component: () => import('@/views/settings/auth/ot-auth-check')
          }]
        }
      ]
    }
  ]
});
