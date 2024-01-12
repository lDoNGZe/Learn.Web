import Layout from '@/layout'

export default {
  path: '/baidu',
  component: Layout,
  meta: {
    title: '外部链接',
    isFirstLevel: true,
    isLink: true,
    linkUrl: 'https://www.baidu.com/',
    icon: 'el-icon-link'
  },
  children: [
    {
      path: 'https://www.baidu.com/',
      meta: {
        title: '外部链接',
        icon: 'el-icon-link'
      }
    }
  ]
}