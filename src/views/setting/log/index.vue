<template>
  <div class="container">
    <div class="tab-container">
      <el-radio-group
        v-model="current"
        @input="toggleTab"
        size="medium"
      >
        <el-radio-button
          v-for="tab in tabList"
          :key="tab.id"
          :label="tab.id"
        >{{tab.title}}</el-radio-button>
      </el-radio-group>
    </div>
    <component :is="currentComponent" />
  </div>
</template>

<script>
export default {
  name: "log",
  data() {
    return {
      currentComponent: null,
      current: 1,
      tabList: [
        { id: 1, title: "操作日志" },
        { id: 2, title: "登录日志" },
      ],
    };
  },
  mounted() {
    this.loadComponent();
  },
  methods: {
    toggleTab(id) {
      this.current = id;
      this.loadComponent();
    },
    async loadComponent() {
      let component = "";
      if (this.current == 1) {
        component = await import("./components/operation.vue");
      } else {
        component = await import("./components/login.vue");
      }
      this.currentComponent = component.default;
    },
  },
};
</script>