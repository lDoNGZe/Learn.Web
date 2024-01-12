import Layout from '@/layout'
const _import = require('../import-' + process.env.NODE_ENV)

// 冷却塔系统菜单
export default {
  path: '/cooling-tower',
  component: Layout,
  name: 'cooling-tower',
  redirect: '/cooling-tower/cockpit',
  meta: {
    title: '冷却塔系统',
    breadcrumb: true,
    isFirstLevel: true,
    hidden: true,
    icon: 'el-icon-s-platform'
  },
  children: [
    /* 监管端菜单 */
    {
      path: 'cockpit',
      component: _import('cooling-tower/sup-menu/home/index'),
      name: 'cockpit',
      meta: {
        title: '驾驶舱',
        breadcrumb: true,
        icon: 'el-icon-discover',
        affix: true
      },
    }
  ]
}