import Vue from "vue";
import App from "./App";
// 按需引入dv-full-screen-container全屏容器从DataV中
import { fullScreenContainer } from '@jiaminghi/data-view'
// 引入 ElementUI 相关文件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/style/index.scss";
// 引入路由配置
import router from "./router";
// 引入vuex仓库
import store from "./store";
// 引入 icons 图标
import './icons'
// 引入全局组件
import "./components";
// 引入element.js
// import "./plugins/element";
// 全局过滤器
import * as filters from "./filters";
// 全局指令
import './directives/index';
// 引入权限控制
import "./permission";
// 引入全局配置
import { size } from "./setting";
// 引入全局日期工具方法
import { formatAddDay, formatDay } from '@/utils/date'
import { statusColor } from '@/utils/tool'

// 引入全局在线预览弹窗
import { previewDialog } from '@/components/preview-doc/index';

// 引入 Echarts 注册主题工具方法
import { registerTheme } from 'echarts'
// 引入 Echarts chalk || customed || purplepassion || dark 主题
import chalk from './assets/echart/chalk.json'
import customed from './assets/echart/customed.json'
import purplepassion from './assets/echart/purple-passion.json'
import dark from './assets/echart/dark.json'

// 注册 Echarts 主题
registerTheme('chalk', chalk)
registerTheme('westeros', dark)
registerTheme('walden', purplepassion)
registerTheme('customed', customed)
Vue.use(fullScreenContainer)
// 应用ElementUI
Vue.use(ElementUI, {
  size,
  zIndex: 999
});
ElementUI.Dialog.props.closeOnClickModal.default = false;
// ElementUI.Dialog.props.lockScroll.default = false;

// 关闭Vue生产环境提示
Vue.config.productionTip = false;

// 注册全局的过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// 创建vm实例对象
new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
  // 绑定全局事件总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$previewDialog = previewDialog;
    Vue.prototype.$formatAddDay = formatAddDay
    Vue.prototype.$formatDay = formatDay
    Vue.prototype.$statusColor = statusColor
  }
});
