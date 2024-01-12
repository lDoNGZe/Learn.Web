const state = {
  isFullScreen: false,
  isCollapse: false,
}

const mutations = {
  SET_FULL_SCREEN(state, flag){
    state.isFullScreen = flag
  },
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse
  }
}

const actions = {
  // 是否全屏展示
  changScreenStatus({ commit }, flag) {
    commit('SET_FULL_SCREEN', flag)
  },
  // 是否收缩菜单
  toggleCollapse({ commit }) {
    commit('SET_COLLAPSE')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
