<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col
        :xl="8"
        :lg="8"
      >
        <div class="item">
          <span class="h3-title">行业分布</span>
          <dataset-pie
            :chartData="industryData"
            chartRef="organization"
          />
        </div>
      </el-col>
      <el-col
        :xl="8"
        :lg="8"
      >
        <div class="item">
          <span class="h3-title">风险等级</span>
          <dataset-bar
            :chartData="riskData"
            chartRef="riskLevel"
          />
        </div>
      </el-col>
      <el-col
        :xl="8"
        :lg="8"
      >
        <div class="item">
          <span class="h3-title">冷却塔规模</span>
          <dataset-pie
            :chartData="towerScaleLegend"
            chartRef="scale"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col
        :xl="8"
        :lg="8"
      >
        <div class="item">
          <span class="h3-title">综合风险指数</span>
          <dataset-rank
            :chartData="riskRank"
            chartRef="composite"
            title="综合风险指数"
          />
        </div>
      </el-col>
      <el-col
        :xl="8"
        :lg="8"
      >
        <div class="item">
          <span class="h3-title">风险等级</span>
          <dataset-bar
            :chartData="riskData"
            chartRef="riskLevel1"
          />
        </div>
      </el-col>
      <el-col
        :xl="8"
        :lg="8"
      >
        <div class="item">
          <span class="h3-title">冷却塔规模</span>
          <dataset-pie
            :chartData="towerScaleLegend"
            chartRef="scale2"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col
        :xl="8"
        :lg="8"
      >
        <div class="item">
          <span class="h3-title">综合风险指数</span>
          <dataset-rank
            :chartData="riskRank"
            chartRef="composite1"
            title="综合风险指数"
          />
        </div>
      </el-col>
      <el-col
        :xl="8"
        :lg="8"
      >
        <div class="item">
          <span class="h3-title">风险等级</span>
          <dataset-bar
            :chartData="riskData"
            chartRef="riskLevel2"
          />
        </div>
      </el-col>
      <el-col
        :xl="8"
        :lg="8"
      >
        <div class="item">
          <span class="h3-title">冷却塔规模</span>
          <dataset-pie
            :chartData="towerScaleLegend"
            chartRef="scale3"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dayjs from "dayjs";
const quarterOfYear = require("dayjs/plugin/quarterOfYear");
dayjs.extend(quarterOfYear);
import { GetCockpitStatistics } from "@/api/cockpit";
import { GetOHEnterpriseConditions } from "@/api/supervision";

export default {
  name: "Cockpit",
  data() {
    return {
      countStatisticsTotal: 0,
      currentIndex: 3,
      towerScaleLegend: {
        legend: [],
        legendData: [],
      },
      overviewData: {
        legend: [],
        legendData: [],
      },
      riskData: {
        legend: [],
        legendData: [],
      },
      riskRank: [],
      countStatistics: [],
      yearList: [
        { key: 1, value: "2021年" },
        { key: 2, value: "2022年" },
        { key: 3, value: "2023年" },
      ],
      currentYear: dayjs(new Date()).format("YYYY"),
      yearOptions: [],
      basicData: {},
      eprConditions: [],
      registData: {
        approvalStatus: [],
        countOfRegisterApprovalStatus: [],
      },
      totalData: {
        tCount1: 0,
        tCount2: 0,
        tCount3: 0,
        tCount4: 0,
      },
      industryData: {
        legendData: [],
        legend: [],
      },
      testResultData: {
        legendData: [],
        legend: [],
      },
    };
  },
  created() {
    for (let i = 0; i < 3; i++) {
      this.yearOptions.push({
        key: i + 1,
        value: dayjs().subtract(i, "year").format("YYYY") + "年",
      });
    }
    this.getChartData();
    this.getOHEnterpriseConditions();
  },
  methods: {
    async getChartData() {
      const { code, result } = await GetCockpitStatistics({});
      if (code === 200) {
        const { overviewData } = result;
        // 数据总览
        const t1 = overviewData.find((item) => item.status == 2);
        const t2 = overviewData.find((item) => item.status == 4);
        const t3 = overviewData.find((item) => item.status == 3);
        const t4 = overviewData.find((item) => item.status == 1);
        this.basicData = {
          eprCount: t1 ? t1.eprCount : 0,
          workerCount: t2 ? t2.eprCount : 0,
          testOrgCount: t3 ? t3.eprCount : 0,
          tjOrgCount: t4 ? t4.eprCount : 0,
        };
        const d1 = result.countStatistics.find((item) => item.key == "高风险");
        const d2 = result.countStatistics.find((item) => item.key == "中风险");
        const d3 = result.countStatistics.find((item) => item.key == "低风险");
        const d4 = result.countStatistics.find((item) => item.key == "未分级");
        // 统计数据
        this.totalData = {
          tCount1: d1 ? d1.value : 0,
          tCount2: d2 ? d2.value : 0,
          tCount3: d3 ? d3.value : 0,
          tCount4: d4 ? d4.value : 0,
        };
        this.countStatistics = result.countStatistics;
        // 风险等级
        this.riskData = {
          legend: result.riskLevelLegend,
          legendData: result.riskLevel,
        };
        // 综合风险指数
        this.riskRank = result.riskRank;
        // 评估状态分布
        this.overviewData = {
          legendData: result.overviewData.map((item) => {
            const obj = {
              ...item,
              key: item.status,
              value: item.eprCount,
            };
            return obj;
          }),
          legend: result.overviewDataLegend,
        };
        // 冷却塔规模分布
        this.towerScaleLegend = {
          legend: result.towerScaleLegend,
          legendData: result.countOfTowerScales,
        };
        // 机构等级分布
        this.industryData = {
          legend: result.industryLegend,
          legendData: result.countOfIndustry,
        };
        // 检测结果
        this.testResultData = {
          legend: result.testResultLegend,
          legendData: result.testResult,
        };
        this.countStatisticsTotal =
          result.countStatistics.find((item) => item.key === "单位总数")
            .value || 0;
      }
    },
    toggleTab(tab) {
      this.currentIndex = tab.key;
      this.currentYear = tab.value.split("年")[0];
      this.eprConditions = [];
      this.getOHEnterpriseConditions();
    },
    // 切换tab选择时间
    changeTabList(id) {
      this.warnData.datas = [];
      this.warnData.warningType = [];
      let reqParams = null;
      this.alarmId = id;
      let month = {
        beginTime: dayjs()
          .subtract(1, "month")
          .startOf("month")
          .format("YYYY-MM-DD HH:mm:ss"),
        endTime: dayjs()
          .subtract(1, "month")
          .endOf("month")
          .format("YYYY-MM-DD HH:mm:ss"),
      };
      let quarter = {
        beginTime: dayjs()
          .subtract(1, "quarter")
          .startOf("quarter")
          .format("YYYY-MM-DD HH:mm:ss"),
        endTime: dayjs()
          .subtract(1, "quarter")
          .endOf("quarter")
          .format("YYYY-MM-DD HH:mm:ss"),
      };
      let year = {
        beginTime: dayjs()
          .subtract(1, "year")
          .startOf("year")
          .format("YYYY-MM-DD HH:mm:ss"),
        endTime: dayjs()
          .subtract(1, "year")
          .endOf("year")
          .format("YYYY-MM-DD HH:mm:ss"),
      };
      if (id === 1) {
        reqParams = month;
      } else if (id === 2) {
        reqParams = quarter;
      } else {
        reqParams = year;
      }
      this.getWarningTrend(reqParams);
    },
    // 获取单位概况统计
    async getOHEnterpriseConditions() {
      const { code, result } = await GetOHEnterpriseConditions({
        year: this.currentYear,
      });
      if (code === 200) {
        this.eprConditions = result;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixins.scss";

.container {
  min-height: calc(100vh - 300px);
  .item {
    padding: 10px;
    margin-bottom: 10px;
    @include border-background-shadow;
  }
}
</style>
