export default class Tools {
  static formatJSON (textValue) {
    var res = '';
    for (var i = 0, j = 0, k = 0, ii, ele; i < textValue.length; i++) { // k:缩进，j:''个数
      ele = textValue.charAt(i);
      if (j % 2 === 0 && ele === '}') {
        k--;
        for (ii = 0; ii < k; ii++) ele = '    ' + ele;
        ele = '\n' + ele;
      } else if (j % 2 === 0 && ele === '{') {
        ele += '\n';
        k++;
        // debugger;
        for (ii = 0; ii < k; ii++) ele += '    ';
      } else if (j % 2 === 0 && ele === ',') {
        ele += '\n';
        for (ii = 0; ii < k; ii++) ele += '    ';
      } else if (ele === '\'') j++;
      res += ele;
    }
    return res;
  }

  /**
   * @desc 判断某个对象是否为空对象 {}
   * @author zhaizy 20150509
   */
  static isEmptyObject (e) {
    var t;
    for (t in e) {
      return !1;
    }
    return !0;
  }
   /*
  * 字符串转日期对象
  * @param  {Strng} dateStr 日期字符串
  * @return {Date} 日期对象
  */
  static parseDate (dateStr) {
    return new Date(dateStr.replace(/-/g, '/'));
  }
  static formatDate (timestamp, fmt) {
    let date = new Date(timestamp);
    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  }

  static clone (obj) {
    let o;
    if (typeof obj === 'object') {
      if (obj === null) {
        o = null;
      } else {
        if (obj instanceof Array) {
          o = [];
          for (let i = 0, len = obj.length; i < len; i++) {
            o.push(this.clone(obj[i]));
          }
        } else {
          o = {};
          for (var j in obj) {
            o[j] = this.clone(obj[j]);
          }
        }
      }
    } else {
      o = obj;
    }
    return o;
  }
    /* 获取有效时间
  * @param  {Date}  开始时间
  * @param  {Date}  结束时间
  * @return {String} 有效时间
  */
  static getValidHoliDays (startDate, endDate) {
    let sh = startDate.getHours();
    let eh = endDate.getHours();
    let em = endDate.getMinutes();
    let sm = startDate.getMinutes();
    // 14:00开始
    if (sh >= 12 && sh <= 14) {
      sh = 14;
    }
    // 19:30开始
    if (sh === 18 || ((sh === 19) && (sm <= 30))) {
      sh = 19;
      sm = 30;
    }
    // 12:00结束
    if (eh >= 12 && eh <= 14) {
      eh = 12;
    }
    // 18:00结束
    if (eh === 18 || ((eh === 19) && (em <= 30))) {
      eh = 18;
      em = 0;
    }
    let addH = ((em - sm) >= 0) ? 0 : -1;
    let days = (eh - sh) + addH;
    // 减去12:00~~14:00
    if (sh < 12 && eh > 14) {
      days -= 2;
    }
    // 减去18:00~~19:30
    if (((eh > 19) || (eh === 19 && em >= 30)) && (sh < 18)) {
      days -= 1.5;
    }
    days = days > 0 ? days : 0;
    days = days > 7 ? 7 : days;
    return Math.floor(days);
  }
}
