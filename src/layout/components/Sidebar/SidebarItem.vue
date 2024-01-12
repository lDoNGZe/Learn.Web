<template>
  <div v-if="!item.hidden">
    <template v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      ">
      <app-link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <i
            v-if="hasOneShowingChild(item.children, item) && item.meta.icon"
            :class="`iconfont ${item.meta.icon}`"
          ></i>
          <i
            v-else
            class="little-circle"
          ></i>
          <span slot="title">{{ onlyOneChild.meta.title }}</span>
        </el-menu-item>
      </app-link>
    </template>
    <template v-else-if="!item.meta.hidden || navStyleModel === 1">
      <el-submenu
        ref="subMenu"
        :index="resolvePath(item.path)"
        popper-append-to-body
      >
        <template slot="title">
          <i
            v-if="item.meta.icon"
            :class="`iconfont ${item.meta.icon}`"
          ></i>
          <span>{{ item.meta.title }}</span>
        </template>
        <sidebar-item
          v-for="(child,index) in item.children"
          :text="index"
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </el-submenu>
    </template>
    <template v-else>
      <sidebar-item
        v-for="(child,index) in item.children"
        :test="index"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </template>
  </div>
</template>

<script>
import path from "path";
import { mapState } from "vuex";
import { isExternal } from "@/utils/validate";
import AppLink from "./link";
export default {
  name: "SidebarItem",
  components: {
    AppLink,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState({
      navStyleModel: (state) => state.settings.navStyleModel,
    }),
  },
  data() {
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
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

<style>
</style>