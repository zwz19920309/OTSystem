import request from './request';
import * as types from '@/stores/mutations-type';

/**
 * @desc 创建任务
 * @param {"agentid":"2682fbc843340a1e5daae9954b63d218","plateNumber":"粤AQ3123","owerName":"12312","provinceName":"广东省",
 * "provinceCode":"440000","cityName":"广州市","cityCode":"440100","flag":"0","queryFlag":"queryLastYearPolicy","datasourcesfrom":"3"}
 */
export const createTask = function (params) {
  return request.post('cm/mobile/insured/quote/create', params, types.FULL_LOADING);
};

/**
 * 大数据查询
 * cm/mobile/insured/quote/callInsureInfo
 */
export const callInsureInfo = function (params) {
  return request.post('cm/mobile/insured/quote/callInsureInfo', params, types.FULL_LOADING);
};

/**
 * 查询车型列表
 * cm/mobile/insured/quote/searchcarmodelvin
 */

export const searchcarmodelvin = function (params) {
  return request.post('cm/mobile/insured/quote/searchcarmodelvin', params, types.FULL_LOADING);
};
/**
 * cm/mobile/basedata/initcodetypes?randomNum=43642&types=rulepriceprovidetype,UserType,UseProps
 * 获取字典
 */
export const getCodeTypes = function (params) {
  return request.get('cm/mobile/basedata/initcodetypes?types=rulepriceprovidetype,UserType,UseProps,CertKinds', params, types.FULL_LOADING);
};

/**
 * cm/mobile/insured/quote/carmodelinfo
 */

export const carmodelinfo = function (params) {
  return request.post('cm/mobile/insured/quote/carmodelinfo', params, types.FULL_LOADING);
};

// cm/mobile/insured/quote/savecarinfo
export const savecarinfo = function (params) {
  return request.post('cm/mobile/insured/quote/savecarinfo', params);
};

/**
 * cm/mobile/insured/quote/searchprovider
 */
export const searchprovider = function (params) {
  return request.post('cm/mobile/insured/quote/searchprovider', params, types.FULL_LOADING);
};

/**
 * cm/mobile/insured/quote/choiceproviderids
 */
export const choiceproviderids = function (params) {
  return request.post('cm/mobile/insured/quote/choiceproviderids', params, types.FULL_LOADING);
};

/**
 * cm/mobile/insured/quote/schemelist?agentnotitype=0&processinstanceid=1937170&randomNum=22859
 */
export const schemelist = function (params) {
  return request.get('cm/mobile/insured/quote/schemelist', params, types.FULL_LOADING);
};

/**
 * cm/mobile/insured/quote/insurancescheme?plankey=zdypz&processinstanceid=1937170&randomNum=75506
 */
export const insurancescheme = function (params) {
  return request.get('cm/mobile/insured/quote/insurancescheme', params, types.FULL_LOADING);
};

/**
 * cm/mobile/insured/quote/savepeopleinfo
 * {"processinstanceid":1938202,"samecarowner":false,"flag":"0","personinfo":{"name":"测试","certificateType":"5","certNumber":"1321323123","email":null,"tel":null,"samecarowner":false,"title":"被保人","type":"0","isOk":true,"isSameInsurePerson":false}}
 */
export const savepeopleinfo = function (params) {
  return request.post('cm/mobile/insured/quote/savepeopleinfo', params, types.FULL_LOADING);
};

/**
 * cm/mobile/insured/quote/insuredconfig
 */
export const insuredconfig = function (params) {
  return request.post('cm/mobile/insured/quote/insuredconfig', params, types.FULL_LOADING);
};

/**
 * cm/mobile/insured/quote/verificationinsuredconfig
 */
export const verificationinsuredconfig = function (params) {
  return request.post('cm/mobile/insured/quote/verificationinsuredconfig', params, types.FULL_LOADING);
};

/**
 * cm/mobile/insured/quote/workflowstartquote
 */
export const workflowstartquote = function (params) {
  return request.post('cm/mobile/insured/quote/workflowstartquote', params, types.FULL_LOADING);
};

/**
 * 我的订单查询
 * cm/mobile/basedata/myTask/getMyOrderList
 * @params{"search":false,"ordeRSTATUS":"1","carlicenseno":"","insuredname":"","taskcreatetimeup":"","taskcreatetimedown":"","limit":5,"offset":0,"agentnum":"30000061"}
 */
export const getMyOrderList = function (params) {
  return request.post('cm/mobile/basedata/myTask/getMyOrderList', params, request.FULL_LOADING);
};

/**
 * 报价列表
 * cm/mobile/basedata/myTask/getMultiQuoteInfo
 * @params{"processInstanceId":"1934699"}
 */
export const getMultiQuoteInfo = function (params) {
  return request.post('cm/mobile/basedata/myTask/getMultiQuoteInfo', params, request.FULL_LOADING);
};

/**
 * 报价详情
 * cm/mobile/basedata/AppDetaileMobile/riskKindPrice
 *{"processInstanceId":"1937521","inscomcode":"2011440101"}
 * */
export const riskKindPrice = function (params) {
  return request.post('cm/mobile/basedata/AppDetaileMobile/riskKindPrice', params, request.FULL_LOADING);
};

/**
 * 修改保险配置
 * cm/mobile/basedata/AppDetaileMobile/riskKindPrice
 * */
export const updateinduredconfig = function (params) {
  return request.post('cm/mobile/insured/quote/updateinduredconfig', params, request.FULL_LOADING);
};

/**
 * 检测保险配置合法
 * cm/mobile/basedata/AppDetaileMobile/riskKindPrice
 * */
export const checkupdateinsureconf = function (params) {
  return request.post('cm/mobile/insured/quote/checkupdateinsureconf', params, request.FULL_LOADING);
};

/**
 * 推工作流
 * cm/mobile/insured/quote/workflowrestartconf
 *{"processinstanceid":"1938872","pid":"20164401","flowflag":"3"}
 * */
export const workflowrestartconf = function (params) {
  return request.post('cm/mobile/insured/quote/workflowrestartconf', params, request.FULL_LOADING);
};

/**
 *检查核保状态
 * cm/mobile/basedata/myTask/checkUnderwritESTATUS
 *{"processInstanceId":"1939996","inscomcode":"208844"}
 * */
export const checkUnderwritESTATUS = function (params) {
  return request.post('cm/mobile/basedata/myTask/checkUnderwritESTATUS', params, request.FULL_LOADING);
};

/**
 *查询投保信息
 * cm/mobile/basedata/myTask/checkUnderwritesta
 *{"processInstanceId":"1939996","inscomcode":"208844"}
 * */
export const getBriefTaskInfoBeforePolicy = function (params) {
  return request.post('cm/mobile/basedata/myTask/getBriefTaskInfoBeforePolicy', params, request.FULL_LOADING);
};

/**
 *查询核保补充信息项
 * cm/mobile/basedata/myTask/checkUnderwritesta
 *{"processInstanceId":"1939996","inscomcode":"208844"}
 * */
export const needuploadimage = function (params) {
  return request.get('cm/mobile/insured/quote/needuploadimage', params, request.FULL_LOADING);
};

/**
 *获取网点
 * cm/mobile/basedata/myTask/checkUnderwritesta
 *{"processInstanceId":"1939996","inscomcode":"208844"}
 * */
export const getprovidersinglesite = function (params) {
  return request.get('cm/mobile/insured/quote/getprovidersinglesite', params, request.FULL_LOADING);
};

// cm/mobile/insured/quote/queryselectedinsure?processinstanceid=24999502&proid=2011440101&randomNum=54611
export const queryselectedinsure = function (params) {
  return request.get('cm/mobile/insured/quote/queryselectedinsure', params, request.FULL_LOADING);
};

/**
 * 取消多方报价
 * cm/mobile/basedata/myTask/cancelQuote
 */
export const cancelQuote = function (params) {
  return request.post('cm/mobile/basedata/myTask/cancelQuote', params, request.FULL_LOADING);
};

/**
 * 取消单方报价
 * cm/mobile/basedata/myTask/cancelCover
 */
export const cancelCover = function (params) {
  return request.post('cm/mobile/basedata/myTask/cancelCover', params, request.FULL_LOADING);
};

/**
 * 我要人工报价
 * cm/mobile/basedata/myTask/resqquotation
 */
export const resqquotation = function (params) {
  return request.get('cm/mobile/basedata/myTask/resqquotation', params, request.FULL_LOADING);
};

/**
 *保存信息
 * cm/mobile/basedata/myTask/checkUnderwritesta
 *{"processInstanceId":"1939996","inscomcode":"208844"}
 * */
export const editPolicyInfoBeforePolicy = function (params) {
  return request.post('cm/mobile/insured/myTask/editPolicyInfoBeforePolicy', params, request.FULL_LOADING);
};

/**
 *获取核保信息
 * cm/mobile/basedata/myTask/checkUnderwritesta
 *{"processInstanceId":"1939996","inscomcode":"208844"}
 * */
export const getCarTaskInfoBeforePolicy = function (params) {
  return request.post('cm/mobile/basedata/myTask/getCarTaskInfoBeforePolicy', params, request.FULL_LOADING);
};

export const policySubmit = function (params) {
  return request.post('cm/mobile/insured/myTask/policySubmit', params, request.FULL_LOADING);
};

/**
 * 报价退回查询投保信息
 * /cm/mobile/insured/quote/queryinsureinfo?inscomcode=208844&processinstanceid=1941766&randomNum=40257
 */
export const queryinsureinfo = function (params) {
  return request.get('cm/mobile/insured/quote/queryinsureinfo', params, request.FULL_LOADING);
};

/**
 * 报价退回保存信息
 * cm/mobile/insured/quote/saveorupdateinsureinfo
 */
export const saveorupdateinsureinfo = function (params) {
  return request.post('cm/mobile/insured/quote/saveorupdateinsureinfo', params, request.FULL_LOADING);
};

/**
 * 核保退回查询投保信息
 * cm/mobile/insured/quote/queryinsureinfohis?inscomcode=208844&processinstanceid=1942206&randomNum=14151
 */
export const queryinsureinfohis = function (params) {
  return request.get('cm/mobile/insured/quote/queryinsureinfohis', params, request.FULL_LOADING);
};

// /**
//  * 需要上传影像
//  * cm/mobile/insured/quote/needuploadimage?companyId=208844&processinstanceid=1942206&randomNum=58539&status=1
//  */
// export const needuploadimage = function (params) {
//   return request.get('cm/mobile/insured/quote/needuploadimage', params);
// }

/**
 * 查询已经上传的影像
 * cm/mobile/insured/quote/alreadyuploadimage?processinstanceid=1942206&randomNum=63103
 */
export const alreadyuploadimage = function (params) {
  return request.get('cm/mobile/insured/quote/alreadyuploadimage', params, request.FULL_LOADING);
};

/**
 * 上传图片
 * cm/mobile/registered/fileUpLoadBase64ByCos
 */
export const fileUpLoadBase64ByCos = function (params) {
  return request.post('cm/mobile/registered/fileUpLoadBase64ByCos', params, request.FULL_LOADING);
};

/**
 * 删除影像
 * cm/mobile/insured/quote/deleteupdateimage?fileid=dc7fce908be311e75e428b54b7d72e02&processinstanceid=1942206&randomNum=44877
 */

export const deleteupdateimage = function (params) {
  return request.get('cm/mobile/insured/quote/deleteupdateimage', params);
};

/**
 * cm/mobile/basedata/myTask/updateinsuredate
 *   var dateParams = {
          'processinstanceid': $scope.processinstanceid,
          'inscomcode': $scope.proComCode,
          'systartdate': $scope.syDate,
          'jqstartdate': $scope.jqDate
        };

        if (!!$scope.sjdateSame) { //商业险与交强险一致
          dateParams.jqstartdate = dateParams.systartdate;
        }
 */
export const updateinsuredate = function (params) {
  return request.post('cm/mobile/basedata/myTask/updateinsuredate', params, request.FULL_LOADING);
};

/**
 * cm/mobile/insured/myTask/proposal/getProposalInfo
 */
export const getProposalInfo = function (params) {
  return request.post('cm/mobile/insured/myTask/proposal/getProposalInfo', params, request.FULL_LOADING);
};

/**
 * cm/mobile/basedata/AppDetaileMobile/aPPborder
 */
export const aPPborder = function (params) {
  return request.post('cm/mobile/basedata/AppDetaileMobile/aPPborder', params, request.FULL_LOADING);
};

/**
 * 检测支付权限
 * mobile/basedata/payment/pay
 */
export const checkPay = function (params) {
  return request.post('cm/mobile/insured/quote/pay', params, request.FULL_LOADING);
};

/**
 * 支付方式
 * cm/mobile/basedata/myTask/showPayChannel
 */
export const showPayChannel = function (params) {
  return request.post('cm/mobile/basedata/myTask/showPayChannel', params, request.FULL_LOADING);
};

/**
 * 支付方式详情
 * cm/mobile/basedata/myTask/showPayChannel
 */
export const showPayChannelDetail = function (params) {
  return request.post('cm/mobile/basedata/myTask/showPayChannelDetail', params, request.FULL_LOADING);
};

/**
 *  链接支付
 * cm/mobile/basedata/myTask/showPayChannel
 */
export const webPay = function (params) {
  return request.post('cm/mobile/basedata/payment/pay', params, request.FULL_LOADING);
};

/**
 * 选择支付方式
 * cm/mobile/basedata/myTask/showPayChannel
 */
export const choosePayChannel = function (params) {
  return request.post('cm/mobile/basedata/myTask/choosePayChannel', params, request.FULL_LOADING);
};

/**
 * ocr识别
 * cm/ocr/dri
 * {"id":"88b2bcb08caf11e7856b0560282f7b8e",
 * "filepath":"https://newzzbdev-10004774.file.myqcloud.com/cmbg/2017-08-29/2aca7e8a1b280ef3ac46a6d9346fe70f.png",
 * "ocrtype":"dri"}
 */
export const ocrDriverCard = function (params) {
  return request.post('cm/ocr/dri', params, request.FULL_LOADING);
};

/**
 * cm/ocr/idc
 */
export const ocrIDCard = function (params) {
  return request.post('cm/ocr/idc', params, request.FULL_LOADING);
};

/**
 * cm/mobile/basedata/myTask/getDeliveryInfo
 */
export const getDeliveryInfo = function (params) {
  return request.post('cm/mobile/basedata/myTask/getDeliveryInfo', params, request.FULL_LOADING);
};

/**
 * https://morg.52zzb.com/cm/mobile/basedata/myTask/saveOrderDelivery
 */
export const saveOrderDelivery = function (params) {
  return request.post('cm/mobile/basedata/myTask/saveOrderDelivery', params, request.FULL_LOADING);
};

/**
 * mobile/basedata/my/generalSetting/getAllProvinceForPS
 */
export const getAllProvinceForPS = function (params) {
  return request.post('cm/mobile/basedata/my/generalSetting/getAllProvinceForPS', params, request.FULL_LOADING);
};

/**
 * mobile/basedata/my/generalSetting/getAllProvinceForPS
 */
export const getAllCityForPS = function (params) {
  return request.post('cm/mobile/basedata/my/generalSetting/getAllCityForPS', params, request.FULL_LOADING);
};

/**
 * mobile/basedata/my/generalSetting/getAllProvinceForPS
 */
export const getAllCountryForPS = function (params) {
  return request.post('cm/mobile/basedata/my/generalSetting/getAllCountryForPS', params, request.FULL_LOADING);
};

/**
 * 编辑地址
 * cm/mobile/basedata/myTask/editAddress
 */
export const editAddress = function (params) {
  return request.post('cm/mobile/basedata/myTask/editAddress', params, request.FULL_LOADING);
};

/**
 * 添加地址
 * cm/mobile/basedata/myTask/deleteAddress
 */
export const deleteAddress = function (params) {
  return request.post('cm/mobile/basedata/myTask/deleteAddress', params, request.FULL_LOADING);
};

/**
 * cm/mobile/basedata/myTask/addNewAddress
 */
export const addNewAddress = function (params) {
  return request.post('cm/mobile/basedata/myTask/addNewAddress', params, request.FULL_LOADING);
};
// 获取个人信息 cm/mobile/basedata/my/getMyPersonalInfo
export const getMyPersonalInfo = function (params) {
  return request.post('cm/mobile/basedata/my/getMyPersonalInfo', params, request.FULL_LOADING);
};

export const getComment = function (params) {
  return request.post('cm/mobile/basedata/myTask/comment', params, request.FULL_LOADING);
};
