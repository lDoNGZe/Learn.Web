import { asyncRoutes, constantRoutes } from "@/router";
import { getPermissionRoutes } from "@/api/user.js";
import { packingRoute, getPermissionBtn } from "@/utils/routerUtils.js";

const state = {
  routes: [],
  addRoutes: [],
  buttons: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
  SET_BUTTONS(state, buttons) {
    state.buttons = buttons;
  }
};
const actions = {
  // 获取当前登录用户拥有的权限菜单
  generateRoutes({ commit }) {
    return new Promise(async resolve => {
      // * 匹配符：找不到的路由路径全部重定向到404页面
      const hiddenRoutes = [
        {
          path: "*",
          redirect: "404"
        }
      ];
      // 生产环境 production || development
      if (process.env.NODE_ENV == "production") {
        const { code, result } = await getPermissionRoutes({
          selectType: 1,
        });
        if (code === 200) {
          // 当前账号有分配权限菜单
          if (result && result.length > 0) {
            // 包装后台菜单数据为前台路由结构
            const mapMenus = packingRoute(result);
            const btnList = getPermissionBtn(mapMenus);
            const btnCodeList = btnList.map(btn => btn.icon)
            commit("SET_BUTTONS", btnCodeList)
            // 首页展示的页面
            const indexPageRoute = [
              {
                path: "/",
                hidden: true,
                redirect: mapMenus[0].path
              }
            ];
            commit("SET_ROUTES", mapMenus);
            resolve(indexPageRoute.concat(mapMenus.concat(hiddenRoutes)));
          } else {
            // 当前账号没有分配权限菜单
            commit("SET_ROUTES", []);
            resolve([]);
          }
        }
      } else {
        // 开发环境
        // 首页
        const indexPageRoute = [
          {
            path: "/",
            hidden: true,
            redirect: asyncRoutes[0].path
          }
        ];
        const btnList = getPermissionBtn(asyncRoutes);
        const btnCodeList = btnList.map(btn => btn.icon)
        commit("SET_BUTTONS", btnCodeList)
        commit("SET_ROUTES", asyncRoutes);
        resolve(indexPageRoute.concat(asyncRoutes.concat(hiddenRoutes)));
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
