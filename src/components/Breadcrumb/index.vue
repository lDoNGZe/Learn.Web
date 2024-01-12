<template>
  <div class="demo">
    <el-breadcrumb
      class="app-breadcrumb"
      separator-class="el-icon-arrow-right"
    >
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="(item, index) in levelList"
          :key="item.path"
        >
          <span
            v-if="item.redirect==='noRedirect' || index == levelList.length - 1"
            class="no-redirect"
          >
            {{ item.meta.title }}
          </span>
          <a
            v-else
            @click.prevent="handleLink(item)"
          >
            {{ item.meta.title }}
          </a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>

</template>

<script>
import pathToRegexp from "path-to-regexp";

export default {
  props: {
    filterRoutes: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      levelList: [],
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      // const first = matched[0];
      // console.log(matched, first, "asdasd");
      // if (this.isDashboard(first)) {
      //   matched = [
      //     {
      //       path: "/",
      //       meta: { title: "首页" },
      //       redirect: this.filterRoutes[0].path,
      //     },
      //   ];
      //   this.levelList = matched;
      // } else {
      //   matched = [
      //     {
      //       path: "/",
      //       meta: { title: "首页" },
      //       redirect: this.filterRoutes[0].path,
      //     },
      //   ].concat(matched);
      //   this.levelList = matched.filter(
      //     (item) =>
      //       item.meta && item.meta.title && item.meta.breadcrumb !== false
      //   );
      // }
      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim() === this.filterRoutes[0].name;
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
  },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  flex: 1;
  ::v-deep .el-breadcrumb__inner {
    a {
      font-size: 16px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: 400;
      text-align: left;
      color: #555555;
    }
  }
  ::v-deep .el-breadcrumb__separator {
    font-size: 16px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    text-align: left;
    color: #555555;
  }
}
.app-breadcrumb.el-breadcrumb {
  display: block;
  font-size: 14px;
  line-height: 30px;
  margin-left: 8px;

  .no-redirect {
    cursor: text;
    font-size: 16px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    color: #555555;
  }
}
</style>
