<template>
  <div
    class="content-table-box"
    style="margin-top: 10px;"
  >
    <!-- 按钮组 -->
    <div class="btn-group-box">
      <div class="right-btn">
        <!-- 按钮插槽 -->
        <template v-for="slot in config.btnSlotName">
          <slot :name="slot"></slot>
        </template>
        <!-- 导入按钮 -->
        <el-button
          v-if="config.hasImportBtn"
          :loading="downloadLoading"
          icon="el-icon-download"
          @click="exprotExcel"
        >导入</el-button>
        <!-- 导出按钮 -->
        <el-button
          v-if="config.hasExportBtn"
          v-auth="config.exportBtnCodeList"
          :loading="downloadLoading"
          icon="el-icon-upload2"
          @click="exprotExcel"
        >导出</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table-container">
      <el-table
        ref="tableRef"
        v-loading="tableLoading"
        :data="tableData"
        stripe
        :header-cell-style="() => ({'background-color' : theme,  'font-size': '16px', 'color': '#fff', 'font-weight': 400})"
        :row-key="config.nodeKey"
        @selection-change="handleSelectionChange"
        class="my-table"
        style="width: 100%"
      >
        <!-- 选择框 -->
        <el-table-column
          v-if="config.hasSelect"
          type="selection"
          width="55"
          align="center"
          reserve-selection
        ></el-table-column>
        <!--序号-->
        <el-table-column
          v-if="config.hasIndex"
          :index="indexMethod"
          label="序号"
          align="center"
          type="index"
          width="80px"
        ></el-table-column>
        <!-- （从后台获取数据）动态渲染的表格列 -->
        <template v-for="head in filterThead">
          <el-table-column
            v-if="head.type === 'slot'"
            :key="head.prop"
            :prop="head.prop"
            :label="head.label"
            align="center"
            :width="head.width ? head.width : 'auto'"
          >
            <template slot-scope="scope">
              <slot
                :name="head.slotName"
                :data="scope.row"
              ></slot>
            </template>
          </el-table-column>
          <!-- 格式化日期时间 -->
          <el-table-column
            v-else-if="head.type === 'datetime'"
            :show-overflow-tooltip="true"
            :key="head.prop"
            :prop="head.prop"
            :label="head.label"
            align="center"
            :width="head.width ? head.width : 'auto'"
          >
            <template slot-scope="scope">
              {{scope.row[head.prop] | formatDateTime}}
            </template>
          </el-table-column>
          <!-- 格式化日期 -->
          <el-table-column
            v-else-if="head.type === 'date'"
            :show-overflow-tooltip="true"
            :key="head.prop"
            :prop="head.prop"
            :label="head.label"
            align="center"
            :width="head.width ? head.width : 'auto'"
          >
            <template slot-scope="scope">
              {{scope.row[head.prop] | formatDate}}
            </template>
          </el-table-column>
          <!-- 状态栏 -->
          <el-table-column
            v-else-if="head.type === 'status'"
            :show-overflow-tooltip="true"
            :key="head.prop"
            :prop="head.prop"
            :label="head.label"
            align="center"
            :width="head.width ? head.width : 'auto'"
          >
            <template slot-scope="scope">
              <span
                class="bg-circle"
                :style="{'backgroundColor': $statusColor(scope.row[head.prop])}"
              ></span>
              <span>{{scope.row[head.prop]}}</span>
            </template>
          </el-table-column>
          <!-- 正常显示表格 -->
          <el-table-column
            v-else
            :show-overflow-tooltip="true"
            :key="head.prop"
            :prop="head.prop"
            :label="head.label"
            align="center"
            :width="head.width ? head.width : 'auto'"
          ></el-table-column>
        </template>
      </el-table>
    </div>
    <!-- 分页 -->
    <div
      v-if="totalCount > 0"
      class="pagination-container"
    >
      <el-pagination
        background
        :layout="config.pagination.layout ||  '->, prev, pager, next, sizes, total'"
        :total="totalCount"
        :page-size="pagination.pageSize"
        :page-sizes="[20, 50, 100]"
        :current-page="pagination.currentPage"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import variables from "@/assets/style/variables.scss";
import dayjs from "dayjs";
export default {
  name: "zyy-table",
  data() {
    return {
      // 表格开启 loading
      tableLoading: false,
      // 导出 excel 表格的 loading
      downloadLoading: false,
      // 选中的表格数据
      multipleSelection: [],
      // 表格数据总数量
      totalCount: 0,
      // table 表格列表数据
      tableData: [],
      // 分页器配置
      pagination: {
        currentPage: 1,
        pageSize: 20,
      },
      // 表格配置
      config: {
        leftTitle: "", // 表格左侧标题
        nodeKey: "id", // 翻页选中的key
        thead: [], // 列数据配置
        hasIndex: false, // 是否显示编号
        hasSelect: false, // 是否显示选择框
        hasImportBtn: false, // 是否展示导入按钮
        hasExportBtn: false, // 是否展示导出按钮
        exportBtnCodeList: [], // 导出按钮权限代码
        tableListUrl: "", // 列表请求地址
        pagination: {
          layout: "", // 分页器布局
        },
        size: "small", // 表格的尺寸大小
        filename: "未知文件名称",
        btnSlotName: [],
      },
    };
  },
  props: {
    // 表格的配置
    tableConfig: {
      required: true,
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.initConfig();
  },
  computed: {
    // 处理查看详情的时候不展示操作按钮
    filterThead() {
      return this.config.thead;
    },
    variables() {
      return variables;
    },
    theme() {
      return this.$store.state.settings.theme;
    },
  },
  methods: {
    // 初始化 table 配置
    initConfig() {
      for (let key in this.tableConfig) {
        if (Object.keys(this.config).includes(key)) {
          this.config[key] = this.tableConfig[key];
        }
      }
    },
    // 自定义表格序号
    indexMethod(index) {
      if (this.currentPage) {
        return index + (this.currentPage - 1) * 10 + 1;
      } else {
        return index + 1;
      }
    },
    // 当页码发生改变时
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.$parent.getTableList();
    },
    // 当条数发生改变时
    handleSizeChange(val) {
      this.pagination.currentPage = 1;
      this.pagination.pageSize = val;
      this.$parent.getTableList();
    },
    // 选择框选择某一项时
    handleSelectionChange(rowsVal) {
      this.multipleSelection = rowsVal;
    },
    // 导出 excel(全部/选中导出)
    exprotExcel() {
      this.downloadLoading = true;
      // 导出选中的表格数据
      if (this.multipleSelection.length) {
        import("@/utils/excel").then((excel) => {
          const tHeader = this.config.thead
            .map((item) => {
              if (item.label !== "操作") return item.label;
            })
            .filter((item) => item !== undefined);
          const filterVal = this.config.thead
            .map((item) => {
              if (item.prop !== "operation") return item.prop;
            })
            .filter((item) => item !== undefined);
          console.log("点击了导出Excel", tHeader, filterVal);
          const list = this.multipleSelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.config.filename,
          });
          this.$refs.tableRef.clearSelection();
          this.downloadLoading = false;
        });
      } else {
        if (!this.tableData.length) {
          this.downloadLoading = false;
          this.$message.warning("表格暂无数据不支持导出，请您先添加数据");
          return;
        }
        // 导出表格全部数据
        import("@/utils/excel").then((excel) => {
          const tHeader = this.config.thead
            .map((item) => {
              if (item.label !== "操作") return item.label;
            })
            .filter((item) => item !== undefined);
          const filterVal = this.config.thead
            .map((item) => {
              if (item.prop !== "operation") return item.prop;
            })
            .filter((item) => item !== undefined);
          console.log("点击了导出Excel", tHeader, filterVal);
          const list = this.tableData;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.config.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType,
          });
          this.downloadLoading = false;
        });
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          const finThead = this.config.thead.find((item) => item.prop == j);
          if (finThead) {
            if (finThead.type == "datetime") {
              return v[j] ? dayjs(v[j]).format("YYYY-MM-DD HH:mm:ss") : "";
            } else if (finThead.type == "date") {
              return v[j] ? dayjs(v[j]).format("YYYY-MM-DD") : "";
            } else {
              return v[j];
            }
          } else {
            return v[j];
          }
        })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixins.scss";

.pagination-container {
  padding-top: 10px;
}
.btn-group-box {
  .left-title {
    position: relative;
    font-size: 18px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    padding-left: 12px;
    margin-bottom: 16px;
    &::before {
      content: "";
      display: inline-block;
      width: 6px;
      height: 17px;
      background: $primary-color;
      border-radius: 3px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>