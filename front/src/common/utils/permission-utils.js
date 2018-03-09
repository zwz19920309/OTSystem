import Vue from 'vue';
export default class PermissionUtils {
  static checkPermission (permission) {
    let userPermissinos = Vue.getCache('permission', 'session');

    let permissions = permission.split('.');
    // console.log('@@##permission:' + JSON.stringify(permissions));
    // console.log('@@##userPermissinos:' + JSON.stringify(userPermissinos));

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
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
