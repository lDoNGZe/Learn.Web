// 引入进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 引入 ElementUI 对话框
import { Message } from "element-ui";
// 引入路由器
import router from "./router";
// 引入vuex仓库
import store from "./store";
// 引入获取token方法
import { getToken } from "@/utils/auth";
// 引入获取路由页面标题方法
import getPageTitle from "@/utils/get-page-title";

// 进度加载条配置
NProgress.configure({ showSpinner: false });

// 路由白名单
const whiteList = [
  "/container",
  "/login",
  "/register",
  "/forget",
];

/*
  全局路由导航守卫：
    - 处理请求前，对用户权限做验证
    - 处理请求前，保存用户的一些信息，比如角色、匹配的权限菜单等等
*/
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to);

  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      const sysuserName = store.getters.sysuserName;
      if (sysuserName) {
        next();
      } else {
        try {
          const { sysuserName } = await store.dispatch(
            "user/getUserInfo"
          )
          // 系统账号 
          if (sysuserName) {
            const accessRoutes = await store.dispatch(
              "permission/generateRoutes"
            );
            if (!accessRoutes.length) {
              await store.dispatch("user/resetToken");
              Message({
                message: "没有可访问的权限菜单，请联系管理员分配权限！",
                type: "error"
              });
              next("/login");
              NProgress.done();
            } else {
              router.addRoutes(accessRoutes);
              next({ ...to, replace: true });
            }
          } else {
            await store.dispatch("user/resetToken");
            Message({
              message: "系统用户错误",
              type: "error"
            });
            next('/login')
            NProgress.done();
          }
        } catch (error) {
          await store.dispatch("user/resetToken");
          Message({
            message: error || "错误信息",
            type: "error"
          });
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
    await store.dispatch("user/reLogout");
  }
});

router.afterEach(() => {
  NProgress.done();
});
