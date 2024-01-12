<template>
  <div class="tb-screen hastab">
    <zyy-search
      ref="searchRef"
      :formConfig="formConfig"
    />
    <zyy-table
      ref="tableRef"
      :tableConfig="tableConfig"
    />
  </div>
</template>

<script>
import { PagedSystemLog } from "@/api/setting/log.js";
export default {
  name: "operation",
  data() {
    return {
      // 搜索条件表单配置
      formConfig: [
        {
          label: "日期时间:",
          prop: "dateArr",
          value: ["", ""],
          type: "daterange",
        },
        {
          prop: "keyword",
          selectVal: 1,
          type: "keyword",
          selectWidth: "120px",
          options: [
            {
              prop: "sysuserID",
              key: 1,
              value: "账号名",
            },
            {
              prop: "sysuserName",
              key: 2,
              value: "姓名",
            },
          ],
        },
      ],
      // 表格配置
      tableConfig: {
        // 表格列配置
        thead: [
          {
            label: "操作时间",
            prop: "creationTime",
            type: "datetime",
          },
          {
            label: "账号名",
            prop: "sysuserID",
          },
          {
            label: "姓名",
            prop: "sysuserName",
          },
          {
            label: "IP地址",
            prop: "ip",
          },
          {
            label: "模块",
            prop: "module",
          },
          {
            label: "操作",
            prop: "operation",
          },
          {
            label: "详情",
            prop: "logContent",
          },
        ],
        // 是否展示导出
        hasExportBtn: true,
        // 表格是否展示loading
        loading: true,
        // 导出数据文件名称
        filename: "操作日志",
      },
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    // 获取列表数据
    async getTableList() {
      const searchRef = this.$refs.searchRef;
      const tableRef = this.$refs.tableRef;
      tableRef.tableLoading = true;
      const searchParam = searchRef.form;
      const otherKeyword = searchRef.otherKeyword;
      const pagination = tableRef.pagination;
      const paginationParam = {
        skipCount: (pagination.currentPage - 1) * pagination.pageSize,
        maxResultCount: pagination.pageSize,
      };
      const req = {
        ...searchParam,
        ...otherKeyword,
        ...paginationParam,
        beginTime: searchParam.dateArr[0],
        endTime: searchParam.dateArr[1],
        logType: 0,
      };
      delete req.dateArr;
      const { code, result } = await PagedSystemLog(req);
      if (code === 200) {
        tableRef.tableData = result.items;
        tableRef.totalCount = result.totalCount;
        tableRef.tableLoading = false;
      } else {
        tableRef.tableLoading = false;
      }
    },
  },
};
</script>