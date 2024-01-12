<template>
  <div class="tip-alert">
    <el-tabs
      v-model="activeName"
      @tab-click="toggleTab"
      stretch
    >
      <el-tab-pane
        v-for="tab in tabList"
        :key="tab.name"
        :name="tab.name"
        :label="`${tab.label} (${tipNumber})`"
      >
        <div class="tip_content">
          <div class="content">{{ tipContent }}</div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="bot-btn-group">
      <el-button
        size="medium"
        type="text"
        class="btn_item"
      >{{ btnText }}</el-button>
      <el-button
        size="medium"
        type="text"
        class="btn_item"
      >查看全部</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "tip-alert",

  data() {
    return {
      tabList: [
        {
          name: "notice",
          label: "通知",
        },
        {
          name: "message",
          label: "消息",
        },
        {
          name: "todo",
          label: "待办",
        },
      ],
      activeName: "notice",
      tipNumber: 99,
      btnText: "",
      tipContent: "",
    };
  },

  methods: {
    toggleTab(tab) {
      this.activeName = tab.name;
      const findTab = this.tabList.find((tabItem) => tabItem.name == tab.name);
      findTab && (this.btnText = `清空${findTab.label}`);
      findTab && (this.tipContent = `${findTab.label}内容`);
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin scroll-style {
  /* 滚动条整体样式 高宽分别对应横竖滚动条的尺寸 */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background: transparent;
  }
  /* 滚动条里面小方块 */
  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    border-radius: 6px;
    background-color: rgba(50, 50, 50, 0.25);
  }
  /* 滚动条里面轨道 */
  &::-webkit-scrollbar-track {
    border-radius: 6px;
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    background-color: #fff;
  }
}
.tip-alert {
  width: 100%;
  height: 100%;
  .bot-btn-group {
    border-top: 1px solid #ebeef5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn_item {
      flex: 1;
      border-radius: 0;
      &:first-child {
        border-right: 1px solid #ebeef5;
      }
    }
  }
  .tip_content {
    height: 240px;
    overflow-y: auto;
    @include scroll-style;
  }
}
</style>