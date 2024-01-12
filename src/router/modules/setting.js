const _import = require("../import-" + process.env.NODE_ENV);

import Layout from "@/layout";
// 系统管理菜单
export default {
  path: "/setting",
  component: Layout,
  name: "setting",
  redirect: "/setting/userList",
  meta: {
    title: "系统管理",
    breadcrumb: true,
    isFirstLevel: true,
    hidden: true,
    icon: 'el-icon-setting'
  },
  children: [
    {
      path: "/setting/userList",
      component: {
        render: c => c("router-view")
      },
      redirect: "/setting/userList/eprUser",
      name: "userList",
      meta: {
        title: "用户管理",
        breadcrumb: true,
        icon: 'el-icon-user-solid'
      },
      children: [
        {
          path: "eprUser",
          component: _import("setting/userList/enterprise/index"),
          name: "eprUser",
          meta: {
            title: "企业用户",
            breadcrumb: true,
            btnList: [
              {
                sort: 1,
                title: '添加',
                icon: 'eprUser.btn.add'
              },
              {
                sort: 2,
                title: '编辑',
                icon: 'eprUser.btn.edit'
              },
              {
                sort: 3,
                title: '导出',
                icon: 'eprUser.btn.export'
              },
              {
                sort: 4,
                title: '删除',
                icon: 'eprUser.btn.delete'
              },
            ]
          }
        },
        {
          path: "sprUser",
          component: _import("setting/userList/supervise/index"),
          name: "sprUser",
          meta: {
            title: "监管用户",
            breadcrumb: true,
            btnList: [
              {
                sort: 1,
                title: '添加',
                icon: 'sprUser.btn.add'
              },
              {
                sort: 2,
                title: '编辑',
                icon: 'sprUser.btn.edit'
              },
              {
                sort: 3,
                title: '导出',
                icon: 'sprUser.btn.export'
              },
              {
                sort: 4,
                title: '删除',
                icon: 'sprUser.btn.delete'
              },
            ]
          }
        }
      ]
    },
    {
      path: "/setting/permission",
      component: {
        render: c => c("router-view")
      },
      redirect: "/setting/permission/eprPermission",
      name: "permission",
      meta: {
        title: "权限管理",
        breadcrumb: true,
        icon: 'el-icon-s-platform'
      },
      children: [
        {
          path: "eprPermission",
          component: _import("setting/permission/enterprise/index"),
          name: "eprPermission",
          meta: {
            title: "企业权限",
            breadcrumb: true,
            btnList: [
              {
                sort: 1,
                title: '新建角色',
                icon: 'eprPermission.btn.addRole'
              },
              {
                sort: 2,
                title: '编辑角色',
                icon: 'eprPermission.btn.editRole'
              },
              {
                sort: 3,
                title: '删除角色',
                icon: 'eprPermission.btn.deleteRole'
              },
              {
                sort: 4,
                title: '关联用户',
                icon: 'eprPermission.btn.bindUser'
              },
              {
                sort: 5,
                title: '批量移除用户',
                icon: 'eprPermission.btn.batchUnBindUser'
              },
              {
                sort: 6,
                title: '移除用户',
                icon: 'eprPermission.btn.unBindUser'
              },
              {
                sort: 7,
                title: '保存功能权限',
                icon: 'eprPermission.btn.saveMenu'
              },
            ]
          }
        },
        {
          path: "sprPermission",
          component: _import("setting/permission/supervise/index"),
          name: "sprPermission",
          meta: {
            title: "监管权限",
            breadcrumb: true,
            btnList: [
              {
                sort: 1,
                title: '新建角色',
                icon: 'sprPermission.btn.addRole'
              },
              {
                sort: 2,
                title: '编辑角色',
                icon: 'sprPermission.btn.editRole'
              },
              {
                sort: 3,
                title: '删除角色',
                icon: 'sprPermission.btn.deleteRole'
              },
              {
                sort: 4,
                title: '关联用户',
                icon: 'sprPermission.btn.bindUser'
              },
              {
                sort: 5,
                title: '批量移除用户',
                icon: 'sprPermission.btn.batchUnBindUser'
              },
              {
                sort: 6,
                title: '移除用户',
                icon: 'sprPermission.btn.unBindUser'
              },
              {
                sort: 7,
                title: '保存功能权限',
                icon: 'sprPermission.btn.saveMenu'
              },
            ]
          }
        }
      ]
    },
    {
      path: "/setting/log",
      component: _import("setting/log/index"),
      name: "log",
      meta: {
        title: "日志管理",
        breadcrumb: true,
        icon: 'el-icon-aim'
      }
    },
    {
      path: "/setting/menu",
      component: {
        render: c => c("router-view")
      },
      redirect: "/setting/menu/eprMenu",
      name: "menu",
      meta: {
        title: "菜单管理",
        breadcrumb: true,
        icon: 'el-icon-menu'
      },
      children: [
        {
          path: "eprMenu",
          component: _import("setting/menu/enterprise/index"),
          name: "eprMenu",
          meta: {
            title: "企业菜单",
            breadcrumb: true
          }
        },
        {
          path: "sprMenu",
          component: _import("setting/menu/supervise/index"),
          name: "sprMenu",
          meta: {
            title: "监管菜单",
            breadcrumb: true
          }
        }
      ]
    },
  ]
};
