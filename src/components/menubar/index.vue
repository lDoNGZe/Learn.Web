<template>
  <!-- 顶部菜单 navStyleModel === 3 混合模式下显示 -->
  <div class="left-container">
    <!-- 左侧Logo -->
    <Logo v-if="headbarLogo && device === 'desktop'" />
    <template v-if="navStyleModel === 3">
      <el-menu
        :default-active="currentRoutePath"
        class="top-menu-bar"
        mode="horizontal"
        :background-color="variables.headerBgCorlor"
        :text-color="variables.menuText"
        :active-text-color="theme"
      >
        <template v-for="item in filterRoutes">
          <!-- 一级菜单 -->
          <template v-if="item.meta.isFirstLevel">
            <app-link
              :key="item.path"
              :to="item.meta.isLink ? resolvePath(item.children[0].path) : resolvePath(item.path)"
            >
              <el-menu-item :index="resolvePath(item.path)">
                <i
                  v-if="item.meta.icon"
                  :class="`iconfont ${item.meta.icon}`"
                ></i>
                <i
                  v-else
                  class="little-circle"
                ></i>
                <span slot="title">{{ item.children && item.children.length === 1 ?  item.children[0].meta.title : item.meta.title }}</span>
              </el-menu-item>
            </app-link>
          </template>
          <!-- 二级菜单 -->
          <el-submenu
            v-else-if="item.meta.isSecondLevel"
            :index="item.path"
            :key="item.path"
            :base-path="$route.path"
          >
            <template slot="title">
              <i
                v-if="item.meta.icon"
                :class="`iconfont ${item.meta.icon}`"
              ></i>
              <span slot="title">{{ item.meta.title }}</span>
            </template>
            <app-link
              v-for="cItem in item.children"
              :key="cItem.path"
              :to="resolvePath(cItem.path)"
            >
              <el-menu-item :index="resolvePath(cItem.path)">{{ cItem.meta.title }}</el-menu-item>
            </app-link>
          </el-submenu>
        </template>
      </el-menu>
    </template>
    <template v-if="navStyleModel === 2">
      <Topbar :menuList="filterRoutes" />
    </template>
  </div>
</template>

<script>
import path from "path";
import { mapState, mapGetters } from "vuex";
import Logo from "@/components/logo";
import Topbar from "./topbar.vue";
import AppLink from "./Link";
import variables from "@/assets/style/variables.scss";
import { isExternal } from "@/utils/validate";
export default {
  components: {
    Topbar,
    Logo,
    AppLink,
  },
  props: {
    filterRoutes: {
      type: Array,
      required: true,
      default: () => [],
    },
    basePath: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      currentRoutePath: "",
      onlyOneChild: null,
    };
  },
  computed: {
    ...mapState({
      headbarLogo: (state) => state.settings.headbarLogo,
      navStyleModel: (state) => state.settings.navStyleModel,
      theme: (state) => state.settings.theme,
      device: (state) => state.app.device,
    }),
    ...mapGetters(["permission_routes"]),
    variables() {
      return variables;
    },
  },
  watch: {
    $route: {
      handler(newVal) {
        if (newVal.meta.isLink) {
          console.log(newVal, "newVal.meta.isLink)");
        } else {
          let fLevel = "";
          let sLevel = "";
          const pathArr = newVal.path.split("/");
          if (pathArr.length > 3) {
            if (newVal.matched.some((match) => match.meta.isFirstLevel)) {
              sLevel = "/" + pathArr[1];
              this.currentRoutePath = sLevel;
              this.getCurrentRoutes(sLevel, [sLevel]);
            } else {
              fLevel = "/" + pathArr[1];
              sLevel = "/" + pathArr[1] + "/" + pathArr[2];
              this.currentRoutePath = sLevel;
              this.getCurrentRoutes(sLevel, [fLevel, sLevel]);
            }
          } else {
            sLevel = "/" + pathArr[1];
            this.currentRoutePath = sLevel;
            this.getCurrentRoutes(sLevel, [sLevel]);
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    getCurrentRoutes(key) {
      this.currentRoutePath = key;
      const filterRoutes = this.permission_routes.filter(
        (route) => !route.hidden
      );
      if (this.navStyleModel === 3) {
        let menus = [];
        filterRoutes.forEach((route) => {
          if (route.meta.isSecondLevel) {
            route.children.forEach((child) => {
              if (child.path === key) {
                menus.push(child);
              }
            });
          } else if (route.meta.isFirstLevel) {
            if (route.children && route.children.length === 1) {
              if (route.children[0].path === key) {
                menus.push(route.children[0]);
              }
            } else {
              if (route.path === key) {
                menus.push(route);
              }
            }
          }
        });
        this.$bus.$emit("updateMenuList", menus);
      } else {
        const routes = this.permission_routes.filter((route) => !route.hidden);
        this.$bus.$emit("updateMenuList", routes);
      }
    },
    hasOneShowingChild(parent) {
      const showingChildren = parent.children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          this.onlyOneChild = item;
          return true;
        }
      });
      if (showingChildren.length === 1) {
        return true;
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }
      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/variables.scss";

.top-menu-bar {
  &.el-menu--horizontal {
    &.el-menu {
      display: flex;
      align-items: center;
      .el-menu-item {
        box-sizing: border-box;
        font-size: 16px !important;
        height: $headerHeight !important;
        line-height: $headerHeight !important;
        padding: 0 14px !important;
        display: flex !important;
        align-items: center !important;
        // border-bottom-width: 2px !important;
        // border-bottom-style: solid !important;
        // border-bottom-color: $headerBgCorlor !important;
        .iconfont {
          margin-right: 4px !important;
        }
        // &.is-active {
        //   border-bottom-color: var(--color) !important;
        // }
      }
      .el-submenu {
        .el-submenu__title {
          padding: 0 14px !important;
          font-size: 16px !important;
          border: 0px !important;
          height: $headerHeight !important;
          line-height: $headerHeight !important;
          span {
            display: inline-block !important;
            height: $headerHeight !important;
            line-height: $headerHeight !important;
          }
          .iconfont {
            margin-right: 4px !important;
          }
        }
        .el-submenu__icon-arrow {
          &.el-icon-arrow-down {
            color: $menuText !important;
          }
        }
        &.is-active {
          .el-submenu__icon-arrow {
            &.el-icon-arrow-down {
              color: var(--color) !important;
            }
          }
          .iconfont {
            color: var(--color) !important;
          }
        }
      }
    }
  }
}
</style>