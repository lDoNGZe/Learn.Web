<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">系统主题</h3>

      <div class="drawer-item">
        <span>主题颜色</span>
        <theme-picker
          style="float: right; height: 26px; margin: -3px 8px 0 0"
          @change="themeChange"
        />
      </div>
    </div>
    <!-- 导航模式 -->
    <div>
      <h3 class="drawer-title">导航模式</h3>
      <div class="nav-group">
        <!-- 第一种 左侧导航 -->
        <div
          class="nav-style-item"
          :class="[navStyleModel == 1 ? 'is-active' : '']"
          @click.stop="toggleNavStyleModel(1)"
        >
          <div class="left-box"></div>
          <div class="right-box">
            <div class="top-box-wrap"></div>
            <div class="bot-box-wrap"></div>
          </div>
        </div>
        <!-- 第二种 顶部导航 -->
        <div
          v-if="device != 'mobile'"
          class="nav-style-item"
          :class="[navStyleModel == 2 ? 'is-active' : '']"
          @click.stop="toggleNavStyleModel(2)"
        >
          <div class="top-box"></div>
          <div class="bot-box"></div>
        </div>
        <!-- 第三种 混合导航 -->
        <div
          v-if="device != 'mobile'"
          class="nav-style-item style3"
          :class="[navStyleModel == 3 ? 'is-active' : '']"
          @click.stop="toggleNavStyleModel(3)"
        >
          <div class="top-box"></div>
          <div class="bot-box">
            <div class="right-box-wrap"></div>
            <div class="left-box-wrap"></div>
          </div>
        </div>
      </div>
      <div class="drawer-item">
        <span>固定顶部</span>
        <el-switch
          v-model="fixedHeader"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>固定导航栏</span>
        <el-switch
          v-model="fixedNavbar"
          class="drawer-switch"
        />
      </div>
    </div>
    <div>
      <h3 class="drawer-title">内容区域</h3>

      <div class="drawer-item">
        <span>顶部导航</span>
        <el-switch
          v-model="showHeadbar"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>Logo</span>
        <el-switch
          v-model="headbarLogo"
          class="drawer-switch"
        />
      </div>
      <div class="drawer-item">
        <span>面包屑</span>
        <el-switch
          v-model="breadcrumbs"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>页签</span>
        <el-switch
          v-model="tagsView"
          class="drawer-switch"
        />
      </div>
    </div>
    <div>
      <h3 class="drawer-title">图表主题色</h3>
      <div class="theme-list">
        <div
          class="item"
          :class="[
            currentThemeKey == chartTheme.value
              ? `${chartTheme.value} is-active`
              : `${chartTheme.value}`
          ]"
          v-for="chartTheme in chartThemeOptions"
          :key="chartTheme.key"
          @click="toggleTheme(chartTheme.value)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import ThemePicker from "@/components/theme-picker";

export default {
  components: { ThemePicker },

  data() {
    return {
      chartThemeOptions: [
        {
          key: "1",
          value: "customed",
        },
        {
          key: "2",
          value: "chalk",
        },
        {
          key: "3",
          value: "walden",
        },
        {
          key: "4",
          value: "westeros",
        },
      ],
      currentThemeKey: "customed",
    };
  },

  computed: {
    showHeadbar: {
      get() {
        return this.$store.state.settings.showHeadbar;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showHeadbar",
          value: val,
        });
      },
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "tagsView",
          value: val,
        });
      },
    },
    breadcrumbs: {
      get() {
        return this.$store.state.settings.breadcrumbs;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "breadcrumbs",
          value: val,
        });
      },
    },
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader;
      },
      set(val) {
        if (!val) {
          this.$store.dispatch("settings/changeSetting", {
            key: "fixedHeader",
            value: val,
          });
          this.$store.dispatch("settings/changeSetting", {
            key: "fixedNavbar",
            value: val,
          });
        } else {
          this.$store.dispatch("settings/changeSetting", {
            key: "fixedHeader",
            value: val,
          });
        }
      },
    },
    fixedNavbar: {
      get() {
        return this.$store.state.settings.fixedNavbar;
      },
      set(val) {
        if (val) {
          this.$store.dispatch("settings/changeSetting", {
            key: "fixedHeader",
            value: val,
          });
          this.$store.dispatch("settings/changeSetting", {
            key: "fixedNavbar",
            value: val,
          });
        } else {
          this.$store.dispatch("settings/changeSetting", {
            key: "fixedNavbar",
            value: val,
          });
        }
      },
    },
    headbarLogo: {
      get() {
        return this.$store.state.settings.headbarLogo;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "headbarLogo",
          value: val,
        });
      },
    },
    navStyleModel: {
      cache: false,
      get() {
        return this.$store.state.settings.navStyleModel;
      },
    },
    device: {
      cache: false,
      get() {
        return this.$store.state.app.device;
      },
    },
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch("settings/changeSetting", {
        key: "theme",
        value: val,
      });
    },
    /**
     * 切换导航模式
     * 1：左侧导航 2：顶部导航 3：混合导航
     */
    toggleNavStyleModel(val) {
      this.$store
        .dispatch("settings/changeSetting", {
          key: "navStyleModel",
          value: val,
        })
        .then(() => {
          this.$nextTick(() => {
            this.$router.replace({
              path: "/redirect" + this.$route.fullPath,
            });
          });
        });
    },
    /**
     * 切换图表主题
     *
     */
    toggleTheme(val) {
      this.currentThemeKey = val;
      this.$store.dispatch("settings/changeSetting", {
        key: "chartTheme",
        value: val,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 15px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }

  .nav-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    .nav-style-item {
      width: 44px;
      height: 36px;
      margin-right: 16px;
      overflow: hidden;
      background-color: #f0f2f5;
      border-radius: 4px;
      box-shadow: 0 0px 2.5px 0 rgba(0, 0, 0, 0.18);
      cursor: pointer;
      display: flex;
      &.style3 {
        flex-direction: column;
      }
      &.is-active {
        position: relative;
        &::before {
          content: "∨";
          position: absolute;
          right: 0;
          bottom: 4px;
          width: 20px;
          height: 20px;
          font-size: 20px;
        }
      }
      .left-box {
        width: 33.3333%;
        background-color: #000;
      }
      .right-box {
        flex: 1;
        .top-box-wrap {
          width: 100%;
          height: 25%;
          background-color: #fff;
        }
      }
      .top-box {
        width: 100%;
        height: 25%;
        background-color: #000;
      }
      .bot-box {
        flex: 1;
        width: 100%;
        display: flex;
        .left-box-wrap {
          width: 33.33%;
          background-color: #fff;
        }
      }
    }
  }

  .theme-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      width: 30px;
      height: 30px;
      background-color: #fff;
      cursor: pointer;
      &.is-active {
        position: relative;
        &::before {
          content: "∨";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          font-size: 20px;
          color: darkturquoise;
        }
      }
      &.customed {
        background-color: #f0f2f5;
      }
      &.chalk {
        background-color: rgb(41, 52, 65);
      }
      &.walden {
        background-color: rgb(220, 220, 220);
      }
      &.westeros {
        background-color: rgb(0, 0, 0);
      }
    }
  }
}
</style>