<template>
  <span class="cur-time">{{ currDateTime }}</span>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "time-down",

  data() {
    return {
      currDateTime: dayjs().format("YYYY-MM-DD HH : mm : ss"),
    };
  },
  mounted() {
    let dateTimer = setInterval(() => {
      this.currDateTime = dayjs().format("YYYY-MM-DD HH : mm : ss");
    }, 1000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(dateTimer);
      dateTimer = null;
    });
  },
};
</script>

<style scoped>
.cur-time {
  width: 80px;
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  color: #eaf0ff;
}
</style>