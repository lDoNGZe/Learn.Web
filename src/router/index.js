import Vue from "vue";
import Router from "vue-router";
import Layout from '@/layout'
const _import = require("./import-" + process.env.NODE_ENV);

// 引入路由模块
import settingRouter from "./modules/setting";
import coolingTowerRouter from "./modules/cooling-tower";
import componentRouter from "./modules/component";
import baiduRouter from "./modules/baidu";
import dataRouter from "./modules/data";
import uploaderRouter from "./modules/uploader";


Vue.use(Router);

/*
  {
    hidden: true                    为真，不在侧边栏显示（默认为真）
    meta:{
      roles: ['admin','editor']   控制页面角色(您可以设置多个角色)
      icon:'',                    侧边栏图标
      headerMenu:true             一级路由必须设置
    }
  }
*/

// 无需鉴权页面
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: _import("login/index"),
    meta: {
      title: "用户登录"
    },
    hidden: true
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      title: "注册页面"
    },
    component: _import("register/index"),
    hidden: true
  },
  {
    path: "/forget",
    name: "Forget",
    component: _import("forget/index"),
    meta: {
      title: "忘记密码"
    },
    hidden: true
  },
  {
    path: "/404",
    component: _import("error/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => _import("error/401"),
    hidden: true,
  },
];
// 需要鉴权页面
export const asyncRoutes = [
  uploaderRouter,
  coolingTowerRouter,
  componentRouter,
  baiduRouter,
  dataRouter,
  settingRouter,
];

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // 重置路由器
}

export default router;
