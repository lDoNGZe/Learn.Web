const _import = require("../import-" + process.env.NODE_ENV);

import Layout from "@/layout";

export default {
  path: '/demo',
  component: Layout,
  name: 'demo',
  redirect: '/demo/uploader',
  meta: {
    title: 'demo',
    breadcrumb: false,
    isFirstLevel: true,
    hidden: true,
    icon: 'el-icon-setting'
  },
  children: [
    {
      path: 'uploader',
      name: 'uploader',
      component: _import('demo/uploader/uploader'),
      meta: {
        title: 'demo吕东泽',
        breadcrumb: true,
        icon: 'el-icon-setting'
      },
    }
  ]
};