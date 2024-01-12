## Element-Admin-Template

> 北京华勤创新软件管理系统

## 构建项目

```bash
# 安装依赖
npm install

# 启动项目
npm run dev || npm start

# 生产环境打包项目
npm run build:prod

# 测试环境打包项目
npm run build:stage

# 查看项目资源大小和分布图
npm run build:report
```

## 全局配置

1. 配置放在 `src` 源代码目录下的 `setting.js` 文件

- title 页面标题
- backRoot 后台请求地址
- fileRoot 后台文件地址
- size ElementUI 组件尺寸大小
- showSettings 是否显示设置面板
- showHeadbar 是否显示 headbar 顶部导航
- tagsView 是否显示 tagsView 页签
- breadcrumbs 是否显示面包屑 breadcrumbs
- fixedHeader 是否开启固定头部
- headbarLogo 是否显示 Logo 在 headbar 组件
- fixedNavbar 是否开启固定 navbar
- autoSplitMenu 是否自动分割菜单
- navStyleModel 导航模式 1: 左侧导航 2: 顶部导航 3: 混合导航
- chartTheme Ehcarts 主题颜色
- errorLog 错误日志，需做如下配置 ['production', 'development']

## 项目注意事项

1. 引入路由组件，要引入到最后一级，最大化的减少程序自动化查找文件的次数，提高构建速度

- 如：路由组件为 `/views/test` 目录下的 `index` , 我们要引入到 `index` 这一级
- 正确做法：`/views/test/index`

2. 请求模块也就是 `api` 目录，应与 视图模块 也就是 `views` 保持对应关系，方便后续查找修改

3. 所有的工具方法，统一都封装在 `utils` 目录下

4. 所有的自定义过滤器，统一都封装在 `filters` 目录下

5. 所有的自定义指令，统一都封装在 `directives` 目录下

6. 所有的全局组件，统一都封装在 `components` 目录下

## 权限配置

1. 菜单权限应在系统管理-菜单管理模块中配置菜单权限

- 按钮级别的权限，应配置在页面级别下
- 按钮权限可分为下面几大类，权限代码 codeList 配置规则 ['页面名称.btn.权限类别']：
  - 新增: pageName.btn.add
  - 编辑: pageName.btn.edit
  - 删除: pageName.btn.delete
  - 导出: pageName.btn.export
  - 导入: pageName.btn.import
  - 批量删除: pageName.btn.batchDelete
  - 自定义：pageName.btn.自定义权限
