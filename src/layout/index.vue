<template>
  <div
    class="layout"
    :style="{'--color': theme}"
  >
    <!--顶部导航 -->
    <headerBar
      v-if="showHeadbar"
      :filterRoutes="filterRoutes"
    />
    <!-- 底部区域 -->
    <div
      class="wrapper"
      :class="wrapperClassName"
    >
      <!-- 侧边栏导航 -->
      <sidebar
        v-if="!hideSidebar"
        class="sidebar"
        :class="sidebarClassName"
        :menuList="sidebarMenuList"
      />
      <!-- 右侧内容区域 -->
      <div
        class="rightbar"
        :class="rightbarClassName"
      >
        <!-- navbar区域 -->
        <div
          class="nav-bar"
          :class="navbarClassName"
        >
          <!-- 面包屑 -->
          <Breadcrumbs
            v-if="breadcrumbs && menuList.length > 0"
            :filterRoutes="filterRoutes"
          />
          <!-- 页签 -->
          <tags-view v-if="tagsView && menuList.length > 0" />
        </div>
        <!-- router-view内容区域 -->
        <div class="router-view">
          <transition
            name="fade-transform"
            mode="out-in"
          >
            <keep-alive :include="cachedRoutes">
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </div>
      <!-- 右侧配置面板 -->
      <RightPanel v-show="showSettings">
        <Setting />
      </RightPanel>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ResizeMixin from "./mixin/ResizeHandler";
import {
  HeaderBar,
  Sidebar,
  RightPanel,
  TagsView,
  Setting,
  Breadcrumbs,
} from "./components";

export default {
  name: "Layout",
  components: {
    HeaderBar,
    Sidebar,
    RightPanel,
    Setting,
    TagsView,
    Breadcrumbs,
  },
  mixins: [ResizeMixin],
  data() {
    return {
      menuList: [],
    };
  },
  computed: {
    ...mapState({
      theme: (state) => state.settings.theme,
      fixedNavbar: (state) => state.settings.fixedNavbar,
      tagsView: (state) => state.settings.tagsView,
      breadcrumbs: (state) => state.settings.breadcrumbs,
      showHeadbar: (state) => state.settings.showHeadbar,
      navStyleModel: (state) => state.settings.navStyleModel,
      showSettings: (state) => state.settings.showSettings,
      device: (state) => state.app.device,
      isFullscreen: (state) => state.settings.isFullscreen,
    }),
    ...mapGetters(["permission_routes", "isCollapse"]),
    filterRoutes() {
      return this.permission_routes.filter((item) => !item.hidden);
    },
    cachedRoutes() {
      return this.permission_routes.filter(
        (item) => !item.hidden && !item.meta.keepAlive
      );
    },
    hideSidebar() {
      const { navStyleModel, isFullscreen } = this;
      return (
        navStyleModel === 2 ||
        this.menuList.length === 0 ||
        (navStyleModel === 1 && isFullscreen)
      );
    },
    sidebarMenuList() {
      return this.navStyleModel === 3 ? this.menuList : this.filterRoutes;
    },
    wrapperClassName() {
      const {
        isCollapse,
        fixedNavbar,
        breadcrumbs,
        tagsView,
        showHeadbar,
        device,
      } = this;
      return {
        ["show-pinch"]: isCollapse,
        ["fixed-navbar"]: fixedNavbar,
        ["breadcrumbs"]: breadcrumbs && this.menuList.length > 0,
        ["tagsView"]: tagsView && this.menuList.length > 0,
        ["showHeadbar"]: showHeadbar,
        ["mobile"]: device === "mobile",
      };
    },
    navbarClassName() {
      const { showHeadbar } = this;
      return {
        ["showHeadbar"]: showHeadbar,
        ["hide-sidebar"]: this.hideSidebar,
      };
    },
    sidebarClassName() {
      const { showHeadbar } = this;
      return {
        ["showHeadbar"]: showHeadbar,
      };
    },
    rightbarClassName() {
      return {
        ["hide-sidebar"]: this.hideSidebar,
      };
    },
  },
  created() {
    this.$bus.$on("updateMenuList", (menuList) => {
      this.menuList = menuList;
    });
  },
};
</script>