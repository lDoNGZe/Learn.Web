const _import = require("../router/import-" + process.env.NODE_ENV);

import Layout from "@/layout";

/**
 * packingRoute 包装后台菜单数据为前台路由菜单结构的方法
 * @param {*} routes 
 * @returns []
 */
export const packingRoute = routes => {
  return routes.map(route => {
    let obj = {};
    // type 为 0 是模块  type 为 1 是页面 type 为 3 是链接  type 为 2 是按钮
    if (route.type === 0) {
      obj.path = route.path;
      obj.name = route.permissionName;
      obj.redirect = route.redirect;
      obj.meta = {
        title: route.title,
        icon: route.icon,
      };
      if (route.headerMenu) {
        obj.meta.hidden = route.headerMenu;
      }
      if (route.isBreadCrumbs) {
        obj.meta.breadcrumb = route.isBreadCrumbs;
      } else {
        obj.meta.breadcrumb = false;
      }
      // 是顶部菜单模块
      if (route.isFirstLevel || route.isSecondLevel) {
        obj.component = Layout;
        obj.meta.hidden = true;
        if (route.isSecondLevel) {
          obj.meta.isSecondLevel = route.isSecondLevel;
        }
        if (route.isFirstLevel) {
          obj.meta.isFirstLevel = route.isFirstLevel;
        }
      } else {
        // 是顶部对应的左侧菜单模块
        obj.component = {
          render: c => c("router-view")
        };
      }
    } else if (route.type === 1) {
      // 是页面
      obj.path = route.path;
      obj.name = route.permissionName;
      obj.component = _import(route.component);
      obj.hidden = route.headerMenu;
      obj.meta = {
        title: route.title,
        icon: route.icon,
        btnList: route.children.filter(item => item.type === 2),
        tabList: route.children.filter(item => item.type === 4),
        isKeepAlive: route.isKeepAlive
      };
      if (route.isBreadCrumbs) {
        obj.meta.breadcrumb = route.isBreadCrumbs;
      } else {
        obj.meta.breadcrumb = false;
      }
    } else if (route.type === 3) {
      // 外部链接
      if (route.isFirstLevel) {
        obj.path = route.path;
        obj.name = route.permissionName;
        obj.component = Layout;
        obj.meta = {
          title: route.title,
          isFirstLevel: true,
          isLink: true,
          linkUrl: route.component
        };
      } else {
        obj.path = route.path;
        obj.name = route.permissionName;
        obj.meta = {
          title: route.title,
          isLink: true,
          linkUrl: route.component
        };
      }
    }
    if (route.children.length && route.type != 1) {
      obj.children = packingRoute(route.children);
    }
    return obj;
  });
};

/**
 * getPermissionBtn 收集按钮权限数组
 * @param {*} menus 菜单数据
 * @param {*} returnBtns 拥有的按钮权限数组
 * @returns []
 */
export const getPermissionBtn = (menus, permissionBtns = []) => {
  menus.forEach(menu => {
    const { meta } = menu
    if (meta && meta.btnList && meta.btnList.length > 0) {
      meta.btnList.forEach(btn => {
        permissionBtns.push(btn)
      })
    }
    if (menu.children && menu.children.length > 0) {
      getPermissionBtn(menu.children, permissionBtns)
    }
  })
  return permissionBtns;
}
