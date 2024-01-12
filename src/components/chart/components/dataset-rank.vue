<template>
  <div class="pie-chart-box">
    <div
      v-if="chartData && chartData.length > 0"
      :id="chartRef"
      :style="{ height: height, width: width }"
    ></div>
    <div
      v-else
      class="empty-wrap"
      :style="{ height: height, width: width }"
    >暂无图表数据</div>
  </div>
</template>

</script>


<script>
import * as echarts from "echarts";
import resize from "../mixins/resize";
export default {
  mixins: [resize],
  props: {
    chartData: {
      type: Array,
      required: true,
      default: () => [],
    },
    chartRef: {
      type: String,
      required: true,
      default: "chart",
    },
    title: {
      type: String,
      required: true,
      default: "",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "286px",
    },
  },
  computed: {
    chartTheme() {
      return this.$store.state.settings.chartTheme;
    },
  },
  data() {
    return {
      chart: null,
    };
  },

  watch: {
    chartData: {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.$nextTick(() => {
            this.initChart();
          });
        } else {
          // 清除之前的数据
          if (this.chart) {
            this.chart.dispose();
            this.chart = null;
          }
        }
      },
      deep: true,
    },
    chartTheme(newVal) {
      if (newVal) {
        this.chart.dispose();
        this.initChart();
      }
    },
  },

  created() {
    this.$nextTick(() => {
      if (this.chartData && this.chartData.length > 0) {
        this.initChart();
      }
    });
  },

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },

  methods: {
    initChart() {
      const chartDom = document.getElementById(this.chartRef);
      this.chart = echarts.init(chartDom, this.chartTheme);
      const option = {
        textStyle: {
          fontSize: "14",
          fontFamily:
            "Microsoft YaHei Regular, Microsoft YaHei Regular-Regular",
          fontWeight: 400,
          // color: "#a8dcff",
        },
        tooltip: {
          trigger: "axis",
          extraCssText: "z-index: 2",
        },
        grid: {
          left: "28%",
        },
        legend: {
          show: true,
          textStyle: {
            fontSize: "14",
            fontFamily:
              "Microsoft YaHei Regular, Microsoft YaHei Regular-Regular",
            fontWeight: 400,
            // color: "#a8dcff",
          },
          icon: "circle", // 设置图例为圆点
          // pageTextStyle: {
          //   // 设置上一页、下一页文字样式
          //   color: "#fff",
          // },
          // pageIconColor: "#fff",
        },
        xAxis: {
          // axisLine: {
          //   lineStyle: {
          //     color: "#053882",
          //   },
          // },
          splitLine: {
            show: false,
          },
          min: 0,
          max: 100,
        },
        yAxis: {
          type: "category",
          data: [],
          // axisLine: {
          //   lineStyle: {
          //     color: "#053882",
          //   },
          // },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: this.title,
            type: "bar",
            data: [],
            label: {
              show: true,
              position: "right",
              // textStyle: {
              //   fontSize: "14",
              //   fontFamily:
              //     "Microsoft YaHei Regular, Microsoft YaHei Regular-Regular",
              //   fontWeight: 400,
              //   color: "#a8dcff",
              // },
            },
          },
        ],
      };
      const yAxisData = [];
      const seriesData = [];
      this.chartData.forEach((item) => {
        yAxisData.unshift(item.key);
        seriesData.unshift(item.value);
      });
      option.yAxis.data = yAxisData;
      option.series[0].data = seriesData;
      option && this.chart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.pie-chart-box {
  .empty-wrap {
    color: #fff;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>