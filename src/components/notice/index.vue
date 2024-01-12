<template>
  <el-popover
    placement="top-end"
    width="350"
    trigger="click"
    popper-class="headbar_popper"
    @show="popoverShow"
    @after-enter="popoverShowed"
  >
    <!-- 消息组件 -->
    <tip-alert ref="TipAlert" />
    <el-badge
      slot="reference"
      :value="200"
      :max="99"
      class="item"
    >
      <span class="el-icon-bell message"></span>
    </el-badge>
  </el-popover>
</template>

<script>
import TipAlert from "@/components/tip-alert";
export default {
  components: {
    TipAlert,
  },
  methods: {
    /**
     * 解决 el-popver 里面渲染 tabs 组件
     * 出现的 tab-item 无法高亮下边框效果
     */
    popoverShow() {
      const refNode = this.$refs["TipAlert"];
      refNode.activeName = "";
      refNode.btnText = "";
      refNode.tipContent = "";
    },
    popoverShowed() {
      const refNode = this.$refs["TipAlert"];
      refNode.activeName = "notice";
      refNode.btnText = "清空通知";
      refNode.tipContent = "通知内容";
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  margin-left: 6px;
}
.message {
  cursor: pointer;
  font-size: 20px;
  line-height: 50px;
  padding-right: 16px;
}
</style>