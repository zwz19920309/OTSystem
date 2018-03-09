<script>
import Vue from 'vue';

function updatePermission (el, binding, vnode) {
  // console.log('@@##permission udpate:' + el.innerHTML + ' ' + binding.value + ' ' + binding.oldValue);
  if (binding.value !== binding.oldValue) {
    let userPermissinos = Vue.getCache('permission', 'session');
    let permission = binding.value;
    // console.log('@@##permission is ' + el.innerHTML + ' ' + permission);
    let permissions = permission.split('.');
    // console.log('@@##permission:' + JSON.stringify(permissions));
    // console.log('@@##userPermissinos:' + JSON.stringify(userPermissinos));
    console.log('@@##permissions :' + JSON.stringify(permissions));
    if (permissions && userPermissinos && permissions.length > 0) {
      let temp = null;
      // 传过来的模块 最后一位是 view add edit delete 忽略
      for (let i = 0; i < permissions.length - 1; i++) {
        let key = permissions[i];
        if (!temp) {
          temp = userPermissinos[key];
        } else {
          temp = temp[key];
        }
      }

      let hasPermission = false;
      if (!temp) {
        // 没有此模块的权限列表
        hasPermission = false;
      } else {
        for (let per of temp) {
          if (per === permissions[permissions.length - 1]) {
            hasPermission = true;
          }
        }
      }

      if (hasPermission) {
        el.disabled = false;
        el.clickabled = true;
        console.log('@@##has permission ' + binding.value + ' ');
        el.style.cssText = '';
        // el.style.backgroundColor = '#ff00ff';
      } else {
        console.log('@@##has no permission ' + binding.value + ' ');
        el.disabled = true;
        el.clickabled = false;
        // el.style.backgroundColor = '#ffffff';
        el.style.cssText = 'pointer-events: none; cursor: default;';

        // el.style.cssText = 'display:none';
        // el.onclick = function () {
        //   // this.$message({ type: 'error', message: '没有权限' })
        //   console.log('@@##message !!!');
        // }
        // console.log('@@##vnode:' + Object.keys(vnode).join(', ') + vnode);
        // vnode.componentInstance.$on('click', function () {
        //   console.log('@@##没权限我照样点');
        // })
      }
    }
  }
}

/**
 * @desc 用于获取用户权限
 */
Vue.directive('permission', {
  update: function (el, binding, vnode) {
    updatePermission(el, binding, vnode);
  },
  bind: function (el, binding, vnode) {
    updatePermission(el, binding, vnode);
  }

});
</script>
