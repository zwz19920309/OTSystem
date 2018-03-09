class Global {
  // 判断接口是否返回的code是0，status是success
  apiStatusIsOk (code, status) {
    return code === 1 || code === 200 || status === 'success';
  }
}
export default new Global();
