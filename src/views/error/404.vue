<template>
  <div class="page-container">
    <div class="left-bg">
      <img
        src="../../assets/photos/zuobiantu.png"
        alt="zuobiantu"
      />
    </div>
    <div class="right-wrap">
      <div class="alret-title">您访问的页面没有被找到</div>
      <el-button
        type="primary"
        icon="el-icon-back"
        @click="goBack"
      >返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page404",
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>