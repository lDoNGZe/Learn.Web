import {
  getToken,
  setToken,
  removeToken
} from "@/utils/auth";

import {
  resetRouter
} from "@/router";

import {
  login,
  getUserInfo,
  logout
} from "@/api/user.js";

const state = {
  token: getToken(),
  eprInfo: {
    userType: "",
    approvalStatus: "",
    approvalRemark: "",
    eprName: "",
  },
  sysuserName: "",
  approvalStatus: '',
  isVoiceRemind: false,
  connection: null
};

const mutations = {
  SET_USER_INFO (state, eprInfo) {
    const {
      userType,
      approvalStatus,
      approvalRemark,
      eprName
    } = eprInfo;
    state.eprInfo.userType = userType;
    state.eprInfo.approvalStatus = approvalStatus;
    state.eprInfo.approvalRemark = approvalRemark;
    state.eprInfo.eprName = eprName;
  },
  SET_APPROVAL_STATUS (state, approvalStatus) {
    state.approvalStatus = approvalStatus;
  },
  SET_USER_NAME (state, sysuserName) {
    state.sysuserName = sysuserName;
  },
  SET_VOICE_REMIND (state, isVoiceRemind) {
    state.isVoiceRemind = isVoiceRemind;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_CONNECTION: (state, connection) => {
    state.connection = connection;
  }
};

const actions = {
  // 登录账号
  login ({ commit }, loginParam) {
    return new Promise((resolve, reject) => {
      login(loginParam)
        .then(response => {
          const { result } = response;
          commit("SET_TOKEN", result.accessToken);
          setToken(result.accessToken, result.expireInSeconds);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 获取当前登录用户的个人信息
  getUserInfo ({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(response => {
          const {
            result
          } = response;
          if (!result) {
            return reject("验证失败，请重新登录！");
          }
          const {
            sysuserName,
            approvalStatus
          } = result;
          // 本地缓存消息提示状态
          commit("SET_USER_NAME", sysuserName);
          commit("SET_APPROVAL_STATUS", approvalStatus);
          commit("SET_USER_INFO", result);
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 修改消息提示音
  changeVoiceRemind ({
    commit
  }, isVoiceRemind) {
    commit("SET_VOICE_REMIND", isVoiceRemind);
  },
  // 退出登录
  logout ({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout({
        status: false
      })
        .then(async () => {
          commit("SET_TOKEN", "");
          commit("SET_USER_NAME", "");
          commit("SET_APPROVAL_STATUS", "");
          commit("SET_USER_INFO", {
            userType: "",
            approvalStatus: "",
            approvalRemark: "",
            eprName: ""
          })
          // 清除路由缓存
          resetRouter();
          removeToken();
          if (state.connection) {
            await state.connection.stop();
          }
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 强制退出登录
  reLogout ({
    commit,
    state
  }) {
    return new Promise(async (resolve, reject) => {
      commit("SET_TOKEN", "");
      commit("SET_USER_NAME", "");
      commit("SET_APPROVAL_STATUS", "");
      commit("SET_USER_INFO", {
        userType: "",
        approvalStatus: "",
        approvalRemark: "",
        eprName: ""
      })
      // 清除路由缓存
      resetRouter();
      removeToken();
      if (state.connection) {
        await state.connection.stop();
      }
      resolve();
    });
  },
  // 重置token
  resetToken ({
    state
  }) {
    return new Promise(async resolve => {
      removeToken();
      if (state.connection) {
        await state.connection.stop();
      }
      resolve();
    });
  },
  // 初始化scoket
  initScoket ({
    commit
  }, connection) {
    commit("SET_CONNECTION", connection);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
