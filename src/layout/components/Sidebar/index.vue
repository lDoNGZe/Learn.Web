<template>
  <el-scrollbar
    v-if="menuList.length > 0"
    wrap-class="scrollbar-wrapper"
  >
    <el-menu
      class="side-menu-bar"
      :collapse="isCollapse"
      :unique-opened="true"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :default-active="activeMenu"
      :default-openeds="openeds"
    >
      <template>
        <sidebar-item
          v-for="route in menuList"
          :key="route.path"
          :item="route"
          :base-path="`${route.path}`"
        ></sidebar-item>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import variables from "@/assets/style/variables.scss";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  props: {
    menuList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      openeds: ["1"],
    };
  },
  watch: {
    menuObj: {
      deep: true,
      handler(val) {
        console.log(val);
      },
    },
  },
  computed: {
    ...mapState({
      navStyleModel: (state) => state.settings.navStyleModel,
      isFullscreen: (state) => state.settings.isFullscreen,
    }),
    ...mapGetters(["isCollapse"]),
    filterRoutes() {
      let menus = [];
      if (this.navStyleModel === 3) {
        this.menuList.forEach((item) => {
          if (
            item.meta.isFirstLevel &&
            item.children.filter((child) => !child.hidden).length > 1
          ) {
            menus = item.children;
          } else {
            menus.push(item);
          }
        });
      } else {
        menus = this.menuList;
      }
      return menus;
    },
    variables() {
      return variables;
    },
    activeMenu() {
      return this.$route.path;
    },
  },
};
</script>

<style>
</style>