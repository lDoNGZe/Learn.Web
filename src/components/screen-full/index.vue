<template>
  <div class="screen-box">
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="click"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import screenfull from "screenfull";

export default {
  name: "Screenfull",
  data() {
    return {
      isFullscreen: false,
    };
  },
  computed: {
    ...mapState({
      navStyleModel: (state) => state.settings.navStyleModel,
    }),
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: "你的浏览器不支持全屏",
          type: "warning",
        });
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
      this.$store.dispatch("settings/changeSetting", {
        key: "isFullscreen",
        value: this.isFullscreen,
      });
      if (this.isFullscreen && this.$route.meta.isBigScreen) {
        this.enterFullScreen();
      }
      if (!this.isFullscreen && this.$route.meta.isBigScreen) {
        this.exitFullScreen();
      }
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off("change", this.change);
      }
    },
    enterFullScreen() {
      this.$store.dispatch("settings/changeSetting", {
        key: "showHeadbar",
        value: false,
      });
      this.$store.dispatch("settings/changeSetting", {
        key: "tagsView",
        value: false,
      });
      this.$store.dispatch("settings/changeSetting", {
        key: "breadcrumbs",
        value: false,
      });
    },
    exitFullScreen() {
      // this.$store.dispatch("settings/changeSetting", {
      //   key: "navStyleModel",
      //   value: this.navStyleModel,
      // });
      this.$store.dispatch("settings/changeSetting", {
        key: "showHeadbar",
        value: true,
      });
      this.$store.dispatch("settings/changeSetting", {
        key: "tagsView",
        value: true,
      });
      this.$store.dispatch("settings/changeSetting", {
        key: "breadcrumbs",
        value: true,
      });
    },
  },
};
</script>

<style scoped>
.screen-box {
  cursor: pointer;
}
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 14px;
  height: 14px;
  vertical-align: 8px;
}
</style>