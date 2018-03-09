import axios from 'axios';
import router from '@/router';
// import CacheData from '@/libs/cache-data';
import Vue from 'vue';
import request from './request';

// import { Loading } from 'element-ui';

// let base = '//' + window.location.host + '/';
// let base = 'http://10.68.15.113:3000/';
let base = 'http://localhost:3003/';
// console.log('process.env.API_ROOT:' + process.env.API_ROOT);
// let base = process.env.API_ROOT;
// let cmBase = "http://10.68.15.23/";

// {account:'',password:''}
export const requestLogin = params => { return axios.post(`${base}/cm/mobile/login/login`, params).then(res => res.data); };

function getToken () {
  return localStorage.getItem('token');
}
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
console.log('base is ' + base);
const apiInstance = axios.create({
  baseURL: base,
  headers: { token: getToken(), 'Content-Type': 'application/json' }
});

// let loadingInstance = null;

// 添加请求拦截器
apiInstance.interceptors.request.use(function (config) {
  // 在发送请求之前做某事
  console.log('@@##request before!' + JSON.stringify(config));
  // loadingInstance = Loading.service({ fullscreen: true, text: '加载中，请稍候...' });
  if (!config.data) {
    console.log('@@##config data:' + JSON.stringify(config));
  } else {
    config.data.userId = checkSession();
  }

  // if (!config.data.userId) {
  //   return;
  // }
  return config;
}, function (error) {
  // 请求错误时做些事
  // loadingInstance.close();
  return Promise.reject(error);
});
// 添加响应拦截器
apiInstance.interceptors.response.use(function (response) {
  // loadingInstance.close();
  // 对响应数据做些事
  console.log('@@##response after!');
  if (response && response.status === 200) {
    return response.data;
  } else {
    router.push({ path: 'login' });
  }
  return '';
}, function (error) {
  // loadingInstance.close();
  // 请求错误时做些事
  return Promise.reject(error);
});

export const login = function (params) {
  return request.post('system/login', params, request.FULL_LOADING);
  // .then(function(respson){
  // console.log('login :'+JSON.stringify(respson));
  // });
};

// 获取城市数据
export const getRegions = function (params) {
  // CacheData.testCache();
  return request.get('codeTable/region', params);
};

// 打开规则集
export const openRuleSet = function (params) {
  // let user = Vue.getCache('user', 'local');
  // params.userId = user.userId;
  return request.post('editor/openRuleSet', params);
};

// 查询规则集列表
export const queryRuleSetList = function (params) {
  // let user = Vue.getCache('user', 'local');
  // params.userId = user.userId;
  return request.post('editor/queryRuleSetList', params, request.MODULE_LOADING);
};

// 查询规则集
export const queryRuleSet = function (params) {
  //   {
  //     "userId": "69e76fb7a9c54ffb8e974ed0e0bd4219",
  //     "ruleSetId": 528
  // }
  return request.post('editor/queryRuleSet', params);
};

// 查询已打开的规则
export const queryUsedRuleSetList = function () {
  // let user = Vue.getCache('user', 'local');
  return request.post('user/queryUsedRuleSetList', {}, request.FULL_LOADING);
};

// 删除正在打开的规则
export const delUsedRuleSet = function (params) {
  // let user = Vue.getCache('user', 'local');
  // params.userId = user.userId;
  return request.post('user/delUsedRuleSet', params, request.MODULE_LOADING);
};

/**
 * @desc 获取供应商列表
 * @param null
 */
export const getProviders = function () {
  return request.get('codeTable/provider', null);
};

/**
 * @desc  检查用户session userid token 若有则返回，无则返回空，则作跳转处理(待开发)
 *        或者在http拦截前添加处理(正解)
 */
function checkSession () {
  let user = Vue.getCache('user', 'session');

  return !user || !user.userId ? '' : user.userId;
}

/**
 * @desc  保存规则集editor/updateRuleSet
 * @param  {
    "id": 1641,
    "ruleBaseType": 2,
    "cityId": 110100,
    "companyId": 2019,
    "ruleBaseName": "sig_beijing_ct_test",
    "ruleBasePostil": "阳光财险_北京_传统_测试",
    "templetRuleSetId": 528
    }
 */
export const updateRuleSet = function (params) {
  // let user = Vue.getCache('user', 'local');
  // params.userId = user.userId;
  return request.post('editor/updateRuleSet', params, request.FULL_LOADING);
};

/**
 * @desc 查询基本配置规则 editor/queryInitRule
 * @param {
    "userId": "69e76fb7a9c54ffb8e974ed0e0bd4219",
    "ruleSetId": 528
   }
 */
export const queryInitRule = function (params) {
  // let user = Vue.getCache('user', 'local');
  // params.userId = user.userId;
  return request.post('editor/queryInitRule', params, request.FULL_LOADING);
};

/**
 * @desc 更新基本配置规则 editor/updateInitRule
 * @param {
    "userId": "69e76fb7a9c54ffb8e974ed0e0bd4219",
    "ruleSetId": 528,
    "contents": [
        {
            "metadataId": 49,
            "itemValue": "是"
        },
        {
            "metadataId": 80,
            "itemValue": "不含税价"
        }
    ]
}
 */
export const updateInitRule = function (params) {
  // let user = Vue.getCache('user', 'local');
  // params.userId = user.userId;
  return request.post('editor/updateInitRule', params);
};

export const queryPreReleaseLog = function (params) {
  //   {
  //     "userId": "f51ebd0b331d450abe7346fbe3e6438d",
  //     "ruleSetId": "164"
  // }
  return request.post('log/queryPreReleaseLog', params);
};

/**
 * @desc 查询车型配置列表 editor/queryCarModelRuleList
 * @param {
    "userId": "69e76fb7a9c54ffb8e974ed0e0bd4219",
    "ruleSetId": 528
     }
 */
export const queryCarModelRuleList = function (params) {
  let userId = checkSession();
  if (!userId) {
    return;
  }
  params.userId = userId;
  return request.post('editor/queryCarModelRuleList', params);
};

/**
 * @desc 查询车型品牌 codeTable/carModel/queryBrand
 * @param {
    "queryKey": "奥迪"
    }
 */
export const queryBrand = function (params) {
  return request.post('codeTable/carModel/queryBrand', params);
};

/**
 * @desc 查询品牌系列 /codeTable/carModel/queryFamily
 * @param {
    "brandName": "奥迪"
}
 */
export const queryBrandFamily = function (params) {
  return request.post('codeTable/carModel/queryFamily', params);
};

/**
 * @desc 更新规则子项 editor/updateRuleItem
 * @param {
    "userId": "69e76fb7a9c54ffb8e974ed0e0bd4219",
    "itemId": 1153308,
    "ruleBaseId": 42524,
    "metadataId": 46,
    "conditionType": "与",
    "itemRange": "RHS",
    "itemKey": "car1",
    "expression": "等于",
    "itemValue": "一汽奥迪_一汽奥迪A6,一汽奥迪_一汽奥迪Q5"
}
 */
export const updateRuleItem = function (params) {
  let userId = checkSession();
  if (!userId) {
    return;
  }
  params.userId = userId;
  return request.post('editor/updateRuleItem', params);
};

/**
 * @desc 查询规则子项editor/queryRuleItem
 * @param {
    "userId": "69e76fb7a9c54ffb8e974ed0e0bd4219",
    "ruleBaseId": 42524，
    "itemId": 1153306
}
 */
export const queryRuleItem = function (params) {
  return request.post('editor/queryRuleItem', params);
};

/**
 * @desc 删除规则子项 editor/delRuleItem
 * @param {"userId":"69e76fb7a9c54ffb8e974ed0e0bd4219","ruleSetId":528,"itemId",123456}
 */
export const delRuleItem = function (params) {
  return request.post('editor/delRuleItem', params);
};

/**
 * @desc 查询号牌区域列表 editor/queryCarNumberRuleList
 * @param {
    "userId": "69e76fb7a9c54ffb8e974ed0e0bd4219",
    "initRuleId": 42524
}
 */
export const queryCarNumberRuleList = function (params) {
  return request.post('editor/queryCarNumberRuleList', params);
};

/**
 * @desc 查询号牌区域码表
http://10.68.3.2:8080/codeTable/carNumber
 */
export const getCarNumber = function (params) {
  return request.post('codeTable/carNumber', params);
};

/**
 * @desc 查询规则列表 editor/queryRuleList
 */
export const queryRuleList = function (params) {
  return request.post('editor/queryRuleList', params, request.TABLE_LOADING);
};

/**
 * @desc 查询规则详情 editor/queryRule
 * @param {
    "userId": "69e76fb7a9c54ffb8e974ed0e0bd4219",
    "ruleSetId": 528,
    "ruleBaseId": 42454
}
 */
export const queryRule = function (params) {
  return request.post('editor/queryRule', params);
};

/**
 * @desc 查询规则子项列表 editor/queryRuleItemList
 * @param {
    "userId": "69e76fb7a9c54ffb8e974ed0e0bd4219",
    "ruleBaseId": 42454,
    "itemRange": "LHS"
}
 */
export const queryRuleItemList = function (params) {
  return request.post('editor/queryRuleItemList', params);
};

/**
 * @desc 删除规则 /editor/delRule
 * @param {
    "userId": "69e76fb7a9c54ffb8e974ed0e0bd4219",
    "ruleSetId": 528,
    "ruleBaseId": 198820
}
 */
export const delRule = function (params) {
  return request.post('editor/delRule', params);
};

/**
 * @desc 更新规则 editor/updateRule
 * @param {
    "userId": "69e76fb7a9c54ffb8e974ed0e0bd4219",
    "id": 0,
    "engineId": 528,
    "ruleGroup": "check",
    "ruleActivation": "",
    "ruleSalience": 0,
    "rulePostil": "规则描述",
    "ruleExpression": "",
    "rulESTATUS": 1
}
 */
export const updateRule = function (params) {
  return request.post('editor/updateRule', params, request.MODULE_LOADING);
};

/**
 * @desc 查询规则元数据项 codeTable/ruleMetadata
 * @param {
    "userId": "69e76fb7a9c54ffb8e974ed0e0bd4219",
    "metadataRange": "LHS,LRHS",
    "moduleName": "check"
}
 */
export const getRuleMetadata = function (params) {
  return request.post('codeTable/ruleMetadata', params);
};

/**
 * @desc 更新规则状态 editor/updateRulESTATUS
 * @param {
    "userId": "69e76fb7a9c54ffb8e974ed0e0bd4219",
    "ruleSetId": 528,
    "ruleIdList": "42454,42456",
    "rulESTATUS": 1
}
 */
export const updateRulESTATUS = function (params) {
  return request.post('editor/updateRulESTATUS', params);
};

/**
 * @desc 复制规则 editor/copyRule
 * @param {
    "userId": "69e76fb7a9c54ffb8e974ed0e0bd4219",
    "ruleSetId": 528,
    "ruleIdList": "42454",
    "ruleSetIdList": "524"
}
 */
export const copyRule = function (params) {
  return request.post('editor/copyRule', params);
};

/**
 * @desc 查询测试元数据项 case/queryCaseMetadata
 * @param {
    "userId": "ce0f2161bcb44a4f9fca03c4a0875341",
    "caseId": 60
}
 */
export const queryCaseMetadata = function (params) {
  return request.post('case/queryCaseMetadata', params, request.MODULE_LOADING);
};

/**
 * @desc case/queryCaseList
 * @param 查询测试用例列表
 */
export const queryCaseList = function () {
  return request.post('case/queryCaseList', {});
};

/**
 * @desc 删除用例 case/delCase
 * @param {
    "userId": "ce0f2161bcb44a4f9fca03c4a0875341",
    "caseId": 87
}
 */
export const delCase = function (params) {
  return request.post('case/delCase', params, request.MODULE_LOADING);
};

/**
 * @desc 更新用例case/updateCase
 * @param {
    "userId": "ce0f2161bcb44a4f9fca03c4a0875341",
    "caseId": 60,
    "exampleName": "newCase",
    "exampleContent": ""
}
 */
export const updateCase = function (params) {
  return request.post('case/updateCase', params, request.MODULE_LOADING);
};

/**
 * @desc editor/compileRuleContent
 * @param {
    "userId": "69e76fb7a9c54ffb8e974ed0e0bd4219",
    "ruleSetId": 528
}
 */
export const compileRuleContent = function (params) {
  return request.post('editor/compileRuleContent', params, request.BUTTON_LOADING);
};

/**
 * @desc 测试规则 case/execRuleTest
 * @param "ruleItem.ruleID":528,
  "ruleItem.interfaceName":"quoteRule",
  "ruleItem.environment": "local"
 */
export const execRuleTest = function (params) {
  return request.post('case/execRuleTest', params, request.FULL_LOADING);
};

/**
 * @desc 规则发布获取地区列表release/getRegionList
 */
export const getRegionList = function (params) {
  return request.post('release/getRegionList', params);
};

/**
 * @desc 规则发布获取保险公司列表release/getProviderList
 */
export const getProviderList = function () {
  return request.get('release/getProviderList');
};

/**
 * @desc 规则发布查询规则集列表release/getRuleEngineDebug
 * @param {
    "companyId": 2019,
    "cityId": 320100,
    "ruleBaseType": 0
}
 */
export const getRuleEngineDebug = function (params) {
  return request.post('release/getRuleEngineDebug', params);
};

/**
 * @desc 启用/停用规则release/updatESTATUS
 * @param {
    "id": 12,
    "status": 1
}
 */
export const updatESTATUS = function (params) {
  return request.post('release/updatESTATUS', params);
};

/**
 * @desc 规则发布release/doRelease
 * @param {
    "id": 5,
    "connTags": [
        "org",
        "plan",
        "prod"
    ]
}
 */
export const doRelease = function (params) {
  return request.post('release/doRelease', params);
};

/**
 * 复制初始规则子项目 editor/copyInitRuleItem
 * @param {*} params {
    "userId": "69e76fb7a9c54ffb8e974ed0e0bd4219",
    "initRuleId": 42524,
    "ruleItemIdList": "1153305",
    "ruleSetIdList": "524"
}
 */
export const copyInitRuleItem = function (params) {
  return request.post('editor/copyInitRuleItem', params, request.BUTTON_LOADING);
};

/**
 * 查询操作日志 log/queryActionLog
 * @param {*} params {
"realName":"齐毅",
"actionType": "修改_规则子项目"
}
 */
export const queryActionLog = function (params) {
  return request.post('log/queryActionLog', params, request.BUTTON_LOADING);
};
