// 链接地址校验
export function isExternal (path) {
  return /^(https?:|http:|mailto:|tel:)/.test(path);
}

// 手机号或者电话号校验
export function validatePhone (str) {
  const reg = /^1[3456789]\d{9}$|^(0\d{2,3}-?|\(0\d{2,3}\)|0\d{2,3} )?[1-9]\d{6,7}(-\d{1,8})?$/;
  return reg.test(str);
}

// 手机号校验
export function validateMobileNumber (str) {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(str);
}

// 密码校验
export function validatePassword (str) {
  const reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}$/;
  return reg.test(str);
}

// 统一社会信用代码校验
export function validateEprCorpCode (str) {
  const reg = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/;
  return reg.test(str);
}

// 邮箱校验
export function validateEmail (str) {
  const reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return reg.test(str);
}

// 居民身份证
export function validatePersonIdNumber (str) {
  const reg = /(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)|(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/;
  return reg.test(str);
}

// 账号名校验
export function validateUserName (str) {
  const reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{3,14}$/;
  return reg.test(str);
}

// 台湾居民来往大陆通行证 支持新版旧版
export function validateTwRoadNumber (str) {
  const reg = /(^\d{8}$)|(^[a-zA-Z0-9]{10}$)|(^\d{18}$)/;
  return reg.test(str);
}

// 港澳居民来往大陆通行证 支持新版旧版
export function validateGaRoadNumber (str) {
  const reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{3,14}$/;
  return reg.test(str);
}

// 护照
export function validateHzNumber (str) {
  const reg = /^([a-zA-z]|[0-9]){5,17}$/;
  return reg.test(str);
}
