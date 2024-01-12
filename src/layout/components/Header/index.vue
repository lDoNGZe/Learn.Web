<template>
  <div class="headerBar">
    <menu-bar :filterRoutes="filterRoutes" />
    <div class="right-container">
      <!-- 系统时间 -->
      <time-down />
      <!-- 消息通知 -->
      <Notice />
      <!-- 全屏显示 -->
      <screen-full />
      <!-- 个人中心 -->
      <person-center />
    </div>
  </div>
</template>

<script>
import TimeDown from "@/components/timedown";
import ScreenFull from "@/components/screen-full";
import PersonCenter from "@/components/person-center";
import Notice from "@/components/notice";
import MenuBar from "@/components/menubar";

export default {
  components: {
    ScreenFull,
    TimeDown,
    PersonCenter,
    Notice,
    MenuBar,
  },

  props: {
    filterRoutes: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.right-container {
  display: flex;
  align-items: center;
  ::v-deep .el-badge__content.is-fixed {
    top: 10px;
    right: 35px;
  }
}
</style>