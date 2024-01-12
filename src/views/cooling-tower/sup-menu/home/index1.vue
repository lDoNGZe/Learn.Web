<template>
  <div class="jsc-container">
    <div class="top-wrap">
      <el-row :gutter="10">
        <el-col :xl="7">
          <div class="grid-content">
            <div class="top">
              <div class="title-wrap">
                <span class="title">数据总览</span>
              </div>
              <div class="base-list">
                <div class="first-row">
                  <div class="item">
                    <div class="left-img">
                      <img src="@/assets/img/dw01.png" />
                    </div>
                    <div class="right-con">
                      <span class="desc">待审核</span>
                      <span class="num">{{ basicData.eprCount }}</span>
                    </div>
                  </div>
                  <div class="item">
                    <div class="left-img">
                      <img src="@/assets/img/dw03.png" />
                    </div>
                    <div class="right-con">
                      <span class="desc">已通过</span>
                      <span class="num">{{ basicData.workerCount }}</span>
                    </div>
                  </div>
                </div>
                <div class="first-row">
                  <div class="item">
                    <div class="left-img">
                      <img src="@/assets/img/dw04.png" />
                    </div>
                    <div class="right-con">
                      <span class="desc">已驳回</span>
                      <span class="num">{{ basicData.testOrgCount }}</span>
                    </div>
                  </div>
                  <div class="item">
                    <div class="left-img">
                      <img src="@/assets/img/dw05.png" />
                    </div>
                    <div class="right-con">
                      <span class="desc">待上报</span>
                      <span class="num">{{ basicData.tjOrgCount }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bot">
              <div class="title-wrap">
                <span class="title">嗜肺军团菌检测</span>
              </div>
              <dataset-sun
                :chartData="testResultData"
                chartRef="legionella"
              />
            </div>
          </div>
        </el-col>
        <el-col :xl="10">
          <div class="grid-content">
            <div class="flex2">
              <div class="title-wrap">
                <span class="title">地图总览</span>
              </div>
              <div class="map-wrap">
                <div class="t-con">
                  <div class="circle-wrap">
                    <div class="item">
                      <div class="desc">单位总数</div>
                      <div class="t">
                        <span>{{ countStatisticsTotal }}</span>
                      </div>
                    </div>
                    <div class="item">
                      <div class="desc">高风险</div>
                      <div class="t">
                        <span>{{ totalData.tCount1 }}</span>
                      </div>
                    </div>
                    <div class="item">
                      <div class="desc">中风险</div>
                      <div class="t">
                        <span>{{ totalData.tCount2 }}</span>
                      </div>
                    </div>
                    <div class="item">
                      <div class="desc">低风险</div>
                      <div class="t">
                        <span>{{ totalData.tCount3 }}</span>
                      </div>
                    </div>
                    <div class="item">
                      <div class="desc">未分级</div>
                      <div class="t">
                        <span>{{ totalData.tCount4 }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <dataset-map :mapData="eprConditions" />
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xl="7">
          <div class="grid-content">
            <div
              class="top"
              style="height: 570px;"
            >
              <div class="title-wrap">
                <span class="title">风险等级</span>
              </div>
              <dataset-bar
                :chartData="riskData"
                chartRef="riskLevel"
                height="540px"
              />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="center-wrap">
      <el-row :gutter="10">
        <el-col :xl="7">
          <div class="grid-content">
            <div class="bot">
              <div class="title-wrap">
                <span class="title">行业分布</span>
              </div>
              <dataset-pie
                :chartData="industryData"
                chartRef="organization"
              />
            </div>
          </div>
        </el-col>
        <el-col :xl="10">
          <div class="grid-content">
            <div class="bot">
              <div class="title-wrap">
                <span class="title">综合风险指数TOP10
                </span>
              </div>
              <dataset-rank
                :chartData="riskRank"
                chartRef="composite"
                title="综合风险指数"
              />
            </div>
          </div>
        </el-col>
        <el-col :xl="7">
          <div class="grid-content">
            <div class="bot">
              <div class="title-wrap">
                <span class="title">冷却塔规模分布
                </span>
              </div>
              <dataset-pie
                :chartData="towerScaleLegend"
                chartRef="scale"
              />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
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

.jsc-container {
  min-height: calc(100vh - 300px);
  overflow: hidden;
}

.top-wrap,
.center-wrap {
  margin-bottom: 10px;
}

.center-wrap {
  .grid-content {
    .bot {
      height: 360px;
    }
  }
}

.grid-content {
  .bot,
  .top {
    padding: 15px 12px 0;
    height: 280px;
    position: relative;
    @include border-background-shadow;
  }
  .flex2 {
    padding: 15px 12px 0;
    height: 570px;
    @include border-background-shadow;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  .top {
    margin-bottom: 10px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-icon-d-arrow-right {
      padding-left: 10px;
      color: $primary-color;
      cursor: pointer;
    }
    .title {
      position: relative;
      font-size: 18px;
      font-weight: 400;
      padding-left: 12px;
      color: #4b4b4b;
      &::after {
        width: 6px;
        height: 17px;
        background: $primary-color;
        border-radius: 3px;
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .base-list {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    .first-row {
      width: 100%;
      display: flex;
      margin: 10px 0;
      .item {
        flex: 1;
        padding: 10px;
        height: 80px;
        background-color: #ebeef5;
        border-radius: 4px;
        margin-right: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:last-child {
          margin-right: 0;
        }
        .left-img {
          width: 38px;
          height: 40px;
        }
        .right-con {
          display: flex;
          flex-direction: column;
          .desc {
            font-size: 14px;
            font-family: Microsoft YaHei Light, Microsoft YaHei Light-Light;
            font-weight: 300;
          }
          .num {
            padding-top: 10px;
            font-size: 20px;
            font-family: Microsoft YaHei Bold, Microsoft YaHei Bold-Bold;
            font-weight: 700;
            text-align: right;
          }
        }
      }
    }
  }
  .map-wrap {
    padding: 10px 0px;
    .t-con {
      width: 100%;
    }
    .circle-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #ebeef5;
        margin-right: 16px;
        padding: 5px;
        &:last-child {
          margin-right: 0;
        }
        .t {
          width: 30px;
          height: 18px;
          position: relative;
          span {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-family: Microsoft YaHei;
            font-weight: 300;
            font-size: 16px;
          }
        }
        .desc {
          height: 40px;
          padding-top: 6px;
          text-align: center;
          font-size: 16px;
          font-family: Microsoft YaHei Swis721 Cn BT;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
