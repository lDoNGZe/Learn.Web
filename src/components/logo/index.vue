<template>
  <span class="companyTitle">
    <span class="logo-name">{{ title }}</span>
  </span>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      title: (state) => state.settings.title,
    }),
  },
};
</script>

<style>
</style>