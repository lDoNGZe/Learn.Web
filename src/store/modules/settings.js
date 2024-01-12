import variables from '@/assets/style/element-variables.scss'
import defaultSettings from '@/setting'

const {
  showSettings,
  showHeadbar,
  tagsView,
  breadcrumbs,
  fixedHeader,
  headbarLogo,
  fixedNavbar,
  navStyleModel,
  chartTheme,
  title
} = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  showHeadbar: showHeadbar,
  tagsView: tagsView,
  breadcrumbs: breadcrumbs,
  fixedHeader: fixedHeader,
  headbarLogo: headbarLogo,
  fixedNavbar: fixedNavbar,
  navStyleModel: navStyleModel,
  chartTheme: chartTheme,
  title: title,
  isFullscreen: false
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}