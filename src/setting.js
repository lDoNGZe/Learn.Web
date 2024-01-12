// 全局配置文件
module.exports = {
  /**
  * @type {String} 
  * @description 标题名称
  */
  title: "北京华勤创新软件管理系统",

  /**
    * @type {String}  线上地址 http://39.98.251.240:8115/bjwjlqt/HQ.Abp/api
    * @description 后台请求地址
    */
  backRoot: process.env.NODE_ENV == 'production' ? "{protocol}//{ipport}/bjwjlqt/HQ.Abp/api" : "http://ldz:21021/HQ.Abp/api",

  /**
   * @type {String}  线上地址 http://39.98.251.240:8115/bjwjlqt/HQ.Abp/
   * @description 后台文件地址
   */
  fileRoot: process.env.NODE_ENV == 'production' ? "{protocol}//{ipport}/bjwjlqt/HQ.Abp/" : "http://ldz:21021/HQ.Abp/",

  /**
  * @type {String} large/medium/small/mini
  * @description ElementUI 库组件的大小尺寸
  */
  size: 'small',

  /**
  * @type {boolean} true || false
  * @description 是否显示设置面板
  */
  showSettings: true,

  /**
   * @type {boolean} true || false
   * @description 是否显示headbar顶部导航
   */
  showHeadbar: true,

  /**
   * @type {boolean} true || false
   * @description 是否显示tagsView页签
   */
  tagsView: true,

  /**
   * @type {boolean} true || false
   * @description 是否显示面包屑breadcrumbs
   */
  breadcrumbs: true,

  /**
   * @type {boolean} true || false
   * @description 是否开启固定头部
   */
  fixedHeader: true,

  /**
   * @type {boolean} true || false
   * @description 是否显示Logo在headbar组件
   */
  headbarLogo: true,

  /**
   * @type {boolean} true || false
   * @description 是否开启固定navbar
   */
  fixedNavbar: true,

  /**
   * @type {boolean} true || false
   * @description 是否自动分割菜单
   */
  autoSplitMenu: false,

  /**
   * @type {boolean} true || false
   * @description 导航模式 1: 左侧导航 2: 顶部导航 3: 混合导航
   */
  navStyleModel: 3,

  /**
   * @type {string} customed || chalk || walden || westeros
   * @description Ehcarts主题颜色
   */
  chartTheme: 'customed',

  /**
   * @type {string | array} 'production' || ['production', 'development']
   * @description Need show err logs component.
   * 错误日志开启在生产环境，默认只被用在生产环境
   * 如果你也想用在开发环境，需做如下配置 ['production', 'development'] 
   */
  errorLog: 'production'
}