<template>
  <div class="pie-chart-box">
    <div
      v-if="chartData.legendData && chartData.legendData.length > 0"
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

<script>
import * as echarts from "echarts";
import resize from "../mixins/resize";
export default {
  mixins: [resize],
  props: {
    chartData: {
      type: Object,
      required: true,
      default: () => {},
    },
    chartRef: {
      type: String,
      required: true,
      default: "chart",
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
        if (newVal.legendData && newVal.legendData.length > 0) {
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
      if (this.chartData.legendData && this.chartData.legendData.length > 0) {
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
          trigger: "item",
          extraCssText: "z-index: 2",
        },
        legend: {
          type: "scroll",
          top: "5%",
          left: "left",
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
        series: [
          {
            type: "pie",
            radius: "70%",
            center: ["50%", "50%"],
            data: [],
            label: {
              position: "outer",
              alignTo: "labelLine",
              bleedMargin: 5,
              textStyle: {
                fontSize: "14",
                fontFamily:
                  "Microsoft YaHei Regular, Microsoft YaHei Regular-Regular",
                fontWeight: 400,
                // color: "#fff",
              },
              formatter: (data) => {
                return `${data.name} ${data.value}`;
              },
            },
          },
        ],
      };
      const { legendData, legend } = this.chartData;
      const data = [];
      legend.forEach((item) => {
        const findLeg = legendData.find((leg) => leg.key === item.key);
        const obj = {
          name: item.value,
          value: findLeg ? findLeg.value : 0,
        };
        data.push(obj);
      });
      option.series[0].data = data;
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
