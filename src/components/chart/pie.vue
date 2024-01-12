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

</script>


<script>
import * as echarts from "echarts";

export default {
  name: "Pie",

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
      default: "280px",
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
      this.chart = echarts.init(chartDom);
      this.chart.on("click", (param) => {
        const { targetRiskLevel, calFormulaId } = param.data;
        this.$emit("update:pieData", { targetRiskLevel, calFormulaId });
      });
      const { legendData, legend } = this.chartData;
      const total = legendData.reduce(
        (prev, next) => prev + Number(next.value),
        0
      );
      const option = {
        color: ["#F56C6C", "#E6A23C", "#67C23A"],
        title: {
          zlevel: 0,
          text: ["总计\n\n" + total],
          rich: {
            value: {
              fontSize: 40,
              fontWeight: 500,
              lineHeight: 40,
            },
            name: {
              lineHeight: 20,
            },
          },
          top: "center",
          left: "50%",
          textAlign: "center",
          textStyle: {
            rich: {
              value: {
                fontSize: 40,
                fontWeight: "bold",
                lineHeight: 40,
              },
              name: {
                lineHeight: 20,
              },
            },
          },
        },
        textStyle: {
          fontSize: "14",
          fontFamily:
            "Microsoft YaHei Regular, Microsoft YaHei Regular-Regular",
          fontWeight: 400,
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
          },
          icon: "circle", // 设置图例为圆点
        },
        series: [
          {
            type: "pie",
            radius: ["45%", "55%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              fontFamily:
                "Microsoft YaHei Regular, Microsoft YaHei Regular-Regular",
              fontSize: "14",
              fontWeight: 400,
              formatter: (data) => {
                return `${data.name} ${data.value}`;
              },
            },
            data: [],
          },
        ],
      };
      const data = [];
      legend.forEach((item) => {
        const findLegendObj = legendData.find(
          (legend) => legend.key === item.key
        );
        const obj = {
          name: item.value,
          value: 0,
          calFormulaId: item.targetId,
          targetRiskLevel: item.key,
        };
        if (findLegendObj) {
          obj.value = findLegendObj.value;
        }
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
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
