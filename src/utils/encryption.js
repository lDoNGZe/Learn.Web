import CryptoJS from "crypto-js";

// 加密秘钥
const _keyStr = "0123456789abcdef";
// 秘钥转utf-8格式
const key = CryptoJS.enc.Utf8.parse(_keyStr);

/**
 * AES加密
 * @param {*} encryptData 加密的请求数据
 * @returns 加密好的base64格式的字符串
 */
export const encrypt = encryptData => {
  let encryptedStr = "";
  if (typeof encryptData == "string") {
    const searchStr = CryptoJS.enc.Utf8.parse(encryptData);
    encryptedStr = CryptoJS.AES.encrypt(searchStr, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
  } else if (typeof encryptData == "object") {
    //对象格式的转成json字符串
    const data = JSON.stringify(encryptData);
    const searchParams = CryptoJS.enc.Utf8.parse(data);
    encryptedStr = CryptoJS.AES.encrypt(searchParams, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
  }
  return encryptedStr.toString();
};

/**
 * AES解密
 * @param {*} encryptStr 加密好的base64格式响应数据
 * @returns 解密出来的js对象数据
 */
export const decrypt = encryptStr => {
  const decrypt = CryptoJS.AES.decrypt(encryptStr, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedStr);
};
