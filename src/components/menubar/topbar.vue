<template>
  <el-menu
    class="top-bar"
    mode="horizontal"
    :background-color="variables.headerBgCorlor"
    :text-color="variables.menuText"
    :active-text-color="theme"
    :default-active="activeMenu"
  >
    <template v-if="menuList.length > 0">
      <side-item
        v-for="route in menuList"
        :key="route.path"
        :item="route"
        :base-path="`${route.path}`"
      ></side-item>
    </template>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
import variables from "@/assets/style/variables.scss";
import SideItem from "./side-item.vue";

export default {
  components: { SideItem },
  props: {
    menuList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    variables() {
      return variables;
    },
    activeMenu() {
      return this.$route.path;
    },
    ...mapState({
      theme: (state) => state.settings.theme,
    }),
  },
};
</script>

<style lang="scss">
@import "@/assets/style/variables.scss";

.top-bar {
  flex: 1;
  display: flex;
  align-items: center;
  &.el-menu {
    &.el-menu--horizontal {
      .el-submenu,
      .el-submenu__title,
      .el-menu-item {
        height: $headerHeight;
        line-height: $headerHeight;
        font-size: 16px;
        &.is-active {
          color: var(--color) !important;
          .iconfont {
            color: var(--color) !important;
          }
          .el-submenu__icon-arrow {
            &.el-icon-arrow-down {
              color: var(--color) !important;
            }
          }
        }
        .iconfont {
          font-size: 16px !important;
          margin-right: 4px !important;
        }
        .el-submenu__icon-arrow {
          &.el-icon-arrow-down {
            right: 0 !important;
          }
        }
      }
      .el-submenu {
        &.is-active {
          .el-submenu__title {
            color: var(--color) !important;
            .iconfont {
              color: var(--color) !important;
            }
            .el-submenu__icon-arrow {
              &.el-icon-arrow-down {
                color: var(--color) !important;
              }
            }
          }
        }
        .iconfont {
          font-size: 16px !important;
          margin-right: 4px !important;
        }
        .el-submenu__icon-arrow {
          &.el-icon-arrow-down {
            right: 0 !important;
          }
        }
      }
    }
  }
}

.el-menu--horizontal {
  .el-menu--popup {
    .menu-item-wrapper {
      .el-menu-item {
        .iconfont {
          font-size: 16px !important;
          margin-right: 4px !important;
        }
        &.is-active {
          .iconfont {
            color: var(--color) !important;
          }
        }
      }
      .el-submenu {
        .el-submenu__title {
          .iconfont {
            font-size: 16px !important;
            margin-right: 4px !important;
          }
        }
        &.is-active {
          .el-submenu__title {
            .iconfont {
              color: var(--color) !important;
            }
          }
        }
      }
    }
  }
}
</style>