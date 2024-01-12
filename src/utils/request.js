import axios from "axios";
import store from "@/store";
import { Message, MessageBox } from "element-ui";
import { getToken } from "@/utils/auth";
import { getBackApiUrl } from "@/utils/tool";
import { encrypt, decrypt } from "@/utils/encryption";
import { backRoot } from "@/setting";

// 无需加密的请求地址集合
// const filterNoPasswordUrls = [
//   "/TokenAuth/CreateLoginVerifyCode", // 获取验证码接口
// ];

// 环境变量 development || production
const NODE_ENV = process.env.NODE_ENV;

// 创建请求服务对象
const service = axios.create({
  // url = base url + request url
  baseURL: NODE_ENV === "production" ? getBackApiUrl('backRoot') : "/user",
  // 请求超时时间
  timeout: 50000
});
const cancelTokenSource = axios.CancelToken.source();
// 设置请求头
service.interceptors.request.use(
  config => {
    // const { method, params, data } = config;
    // if (NODE_ENV === "production") {
    //   const needEncrypt = filterNoPasswordUrls.every(url => url !== config.url);
    //   if (needEncrypt) {
    //     config.headers["Content-Type"] = "application/json";s
    //     // 处理需要加密的请求
    //     if (method === "get" || method === "delete" || (method === "post" && params)) {
    //       let noSearchStr = false;
    //       let searchStr = "";
    //       if (params) {
    //         noSearchStr = Object.keys(params).length > 0;
    //         const searchParams = new URLSearchParams(params);
    //         searchStr = searchParams.toString();
    //       }
    //       if (noSearchStr) {
    //         config.params = encrypt(searchStr);
    //       }
    //     } else if (method === "post" || method === "put") {
    //       config.data = data ? encrypt(data) : {};
    //     }
    //   }
    // }
    config.params = {
      cancelToken: cancelTokenSource.token,
      ...config.params
    }
    if (store.getters.token && getToken()) {
      config.headers["Authorization"] = `Bearer ${getToken()}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 设置响应头
service.interceptors.response.use(
  response => {
    const { data } = response;
    // const { config, data } = response;
    // 保存响应数据的变量
    // let res = null;
    // const needDecrypt = filterNoPasswordUrls.every(url => url !== config.url);
    // if (needDecrypt) {
    //   // 处理需要解密的请求;
    //   res = NODE_ENV === "production" ? decrypt(data) : data;
    // } else {
    //   // 处理无需解密的请求
    //   res = data;
    // }
    const res = data
    const isBlob = toString.call(data) === '[object Blob]';
    if (res.code !== 200 && !isBlob) {
      // 状态码为 200 成功 || 420 友好提示 || 204 无数据 || 903 密码过期需更换密码
      // 401: Token 是非法的 / Token 过期了;
      switch (res.code) {
        case 401:
          // 重新登录
          Message({
            message: "您的账号存在异常，请重新登录！",
            type: "info",
            onClose: () => {
              store.dispatch("user/resetToken").then(() => {
                location.reload();
              });
            },
            duration: 5 * 1000
          });
          break;
        case 903:
          // 密码过期需更换密码;
          MessageBox({
            message: res.message || "密码已过期请重新更换密码",
            type: "info",
            closeOnClickModal: false,
            closeOnPressEscape: false,
            onClose: () => {
              const host = window.location.origin; // 获取 URL 的主机地址
              window.location.href = host + "/#/forget";
            },
            duration: 5 * 1000
          });
          break;
        case 420:
          // 友好提示
          Message({
            message: res.message || "友好提示",
            type: "warning",
            duration: 5 * 1000
          });
          break;
        case 204:
          // 无数据
          Message({
            message: res.message || "无数据",
            type: "info",
            duration: 5 * 1000
          });
          break;
        default:
          // 其他错误信息提示
          Message({
            message: res.message || "错误信息",
            type: "error",
            duration: 5 * 1000
          });
      }
      return Promise.reject(new Error(res.message || "请求问题"));
    } else if (isBlob) {
      return data;
    } else {
      return res;
    }
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
