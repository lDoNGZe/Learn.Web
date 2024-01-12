<template>
  <div class="map-chart-box">
    <div
      id="map-chart"
      v-if="mapData.length > 0"
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
const geoJson = require("@/assets/js/geo.json");

export default {
  mixins: [resize],
  props: {
    mapData: {
      type: Array,
      required: true,
      default: () => [],
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "446px",
    },
  },
  computed: {
    chartTheme() {
      return this.$store.state.settings.chartTheme;
    },
  },
  watch: {
    mapData: {
      handler(newVal) {
        if (newVal.length > 0) {
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

  data() {
    return {
      chart: null,
    };
  },

  created() {
    this.$nextTick(() => {
      if (this.mapData.length > 0) {
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
    // 初始化地图数据
    initChart() {
      const chartDom = document.getElementById("map-chart");
      this.chart = echarts.init(chartDom, this.chartTheme);
      const option = {
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            const data = params.data;
            return `${data.name}<br/>单位总数：${data.value} 家<br/>${data.eprDatas[0].key}: ${data.eprDatas[0].value} 家<br/>${data.eprDatas[1].key}: ${data.eprDatas[1].value} 家<br/>${data.eprDatas[2].key}: ${data.eprDatas[2].value} 家<br/>${data.eprDatas[3].key}: ${data.eprDatas[3].value} 家`;
          },
          extraCssText: "z-index: 2",
        },
        visualMap: {
          show: false,
          min: 0,
          max: 100,
          text: [">100", "无"],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["#E4E7ED", "#E6A23C", "#F56C6C"],
          },
        },
        geo: [
          {
            name: "北京市",
            type: "map",
            map: "FeatureCollection",
            zlevel: -1,
            aspectScale: -1.1, //长宽比
            top: "0%",
            itemStyle: {
              areaColor: "#E4E7ED",
              shadowColor: "#555",
              shadowOffsetY: 10,
              shadowOffsetX: 0,
            },
            data: [],
          },
        ],
        series: [
          {
            name: "北京市",
            type: "map",
            map: "FeatureCollection",
            aspectScale: -1.1, //长宽比
            top: "0%",
            label: {
              show: true,
              textStyle: {
                fontSize: "13px",
                fontFamily: "Microsoft YaHei",
                fontWeight: 400,
                color: "#555",
              },
            },
            data: [],
          },
        ],
      };
      this.mapData.forEach((item) => {
        const obj = {
          name: item.districtName,
          value: item.eprCount,
          eprDatas: item.eprDatas,
        };
        option.series[0].data.push(obj);
      });
      echarts.registerMap("FeatureCollection", geoJson);

      option && this.chart.setOption(option, true);
    },
  },
};
</script>

<style lang="scss" scoped>
.map-chart-box {
  .empty-wrap {
    color: #fff;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>