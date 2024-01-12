<template>
  <div class="breadcrumb-wrap">
    <span
      v-if="navStyleModel !== 2"
      class="toogle-icon"
      :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
      @click="toggleCollapse"
    ></span>
    <transition
      name="breadcrumb-transform"
      mode="out-in"
    >
      <Breadcrumb
        :filterRoutes="filterRoutes"
        :navStyleModel="navStyleModel"
      />
    </transition>
    <!-- <person-center
              v-if="navStyleModel === 1 && !showHeadbar"
              :navStyleModel="navStyleModel"
              :isCollapse="isCollapse"
            /> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PersonCenter from "@/components/person-center";
import { Breadcrumb } from "../../components";
export default {
  components: {
    Breadcrumb,
    PersonCenter,
  },
  props: {
    filterRoutes: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  computed: {
    ...mapState({
      showHeadbar: (state) => state.settings.showHeadbar,
      navStyleModel: (state) => state.settings.navStyleModel,
    }),
    ...mapGetters(["isCollapse"]),
  },
  methods: {
    // 切换收缩菜单
    toggleCollapse() {
      this.$store.dispatch("fullscreen/toggleCollapse");
    },
  },
};
</script>

<style>
</style>