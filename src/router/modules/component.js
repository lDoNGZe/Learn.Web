import Layout from '@/layout'
const _import = require('../import-' + process.env.NODE_ENV)

// 二级菜单
export default {
  path: '/level',
  component: Layout,
  name: 'level',
  redirect: '/level/level1',
  meta: {
    title: '常用组件',
    breadcrumb: true,
    isSecondLevel: true,
    hidden: true,
    icon: 'el-icon-table-lamp'
  },
  children: [
    {
      path: '/level/level1',
      component: {
        render: c => c("router-view")
      },
      name: 'level1',
      meta: {
        title: '通用组件',
        breadcrumb: true,
        icon: 'el-icon-notebook-1',
        hidden: true
      },
      redirect: '/level/level1/demo1',
      children: [
        {
          path: "demo1",
          component: _import("level/level1/demo1/index"),
          name: "demo1",
          meta: {
            title: "通用组件一",
            breadcrumb: true,
            icon: 'el-icon-discount',
          }
        },
        {
          path: "demo2",
          component: _import("level/level1/demo2/index"),
          name: "demo2",
          meta: {
            title: "通用组件二",
            breadcrumb: true,
            icon: 'el-icon-price-tag',
          }
        }
      ]
    },
    {
      path: '/level/level2',
      component: {
        render: c => c("router-view")
      },
      name: 'level2',
      meta: {
        title: '业务组件',
        breadcrumb: true,
        icon: 'el-icon-notebook-2',
        hidden: true
      },
      redirect: '/level/level2/demo1',
      children: [
        {
          path: "demo1",
          component: _import("level/level2/demo1/index"),
          name: "demo1",
          meta: {
            title: "业务组件一",
            breadcrumb: true,
            icon: 'el-icon-discount',
          }
        },
        {
          path: "demo2",
          component: _import("level/level2/demo2/index"),
          name: "demo2",
          meta: {
            title: "业务组件二",
            breadcrumb: true,
            icon: 'el-icon-price-tag',
          }
        }
      ]
    },
  ]
}