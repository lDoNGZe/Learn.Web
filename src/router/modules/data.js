import Layout from '@/layout'
const _import = require('../import-' + process.env.NODE_ENV)

export default {
  path: '/data',
  component: Layout,
  name: 'data',
  redirect: '/data/big-screen',
  meta: {
    title: '数据大屏',
    breadcrumb: false,
    isFirstLevel: true,
    hidden: true,
    isBigScreen: true,
    icon: 'el-icon-data-board',
  },
  children: [
    /* 监管端菜单 */
    {
      path: 'big-screen',
      component: _import('cooling-tower/sup-menu/big-screen/index'),
      name: 'big-screen',
      meta: {
        title: '数据大屏',
        breadcrumb: true,
        icon: 'el-icon-discover',
        isBigScreen: true
      },
    },
  ]
}