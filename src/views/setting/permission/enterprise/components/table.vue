<template>
  <div class="user-table">
    <zyy-search
      ref="searchRef"
      :formConfig="formConfig"
    />
    <zyy-table
      ref="tableRef"
      :tableConfig="tableConfig"
    >
      <!-- 添加按钮插槽 -->
      <template v-slot:add>
        <el-button
          v-auth="['eprPermission.btn.bindUser']"
          icon="el-icon-edit"
          type="primary"
          @click="addUser"
        >关联用户</el-button>
      </template>
      <template v-slot:del>
        <el-button
          v-auth="['eprPermission.btn.batchUnBindUser']"
          icon="el-icon-delete"
          type="danger"
          @click="deleteSelect"
        >移除</el-button>
      </template>
      <!-- 表格状态开关插槽 -->
      <template v-slot:switch="slotScope">
        <el-switch
          v-model="slotScope.data.isActive"
          :inactive-text="slotScope.data.isActive ? '启用' : '禁用'"
          @change="switchChange(slotScope.data.id)"
        ></el-switch>
      </template>
      <!-- 表格操作按钮插槽 -->
      <template v-slot:operation="slotScope">
        <div class="btn-container">
          <el-button
            v-auth="['eprPermission.btn.unBindUser']"
            type="text"
            @click="handleDelete(slotScope.data)"
          >移除</el-button>
        </div>
      </template>
    </zyy-table>
  </div>
</template>

<script>
import { getPagedUser } from "@/api/setting/user";
import { bulkDeleteUserRoles } from "@/api/setting/permission";
export default {
  name: "diy-table",
  props: ["currClickId", "updateUser"],
  data() {
    return {
      // 搜索条件表单配置
      formConfig: [
        {
          prop: "keyword",
          selectVal: 1,
          type: "keyword",
          selectWidth: "120px",
          options: [
            {
              prop: "sysuserName",
              key: 1,
              value: "姓名",
            },
            {
              prop: "sysuserID",
              key: 2,
              value: "账号",
            },
          ],
        },
      ],
      // 表格配置
      tableConfig: {
        // 表格列配置
        thead: [
          {
            label: "姓名",
            prop: "sysuserName",
          },
          {
            label: "单位",
            prop: "eprName",
          },
          {
            label: "角色",
            prop: "roleName",
          },
          {
            label: "账号",
            prop: "sysuserId",
          },
          {
            label: "操作",
            prop: "operation",
            width: "100px",
            type: "slot",
            slotName: "operation",
          },
        ],
        // 是否展示导出
        hasSelect: true,
        // 表格是否展示loading
        loading: true,
        nodeKey: "id",
        btnSlotName: ["add", "del"],
      },
    };
  },
  watch: {
    currClickId: {
      handler(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            this.getTableList();
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    addUser() {
      this.updateUser({
        userList: [],
        filterText: "",
        dialogUserVisible: true,
      });
    },
    handleDelete(rowData) {
      // 删除
      this.$confirm("此操作将移除该关联用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { code } = await bulkDeleteUserRoles({
            userIds: [rowData.id],
            roleId: this.currClickId,
          });
          if (code === 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getTableList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    deleteSelect() {
      const tableRef = this.$refs.tableRef;
      const multipleSelection = tableRef.multipleSelection;
      if (!multipleSelection.length) {
        this.$message.warning("请选择要删除的数据");
        return;
      }
      // 批量删除
      this.$confirm("此操作将批量移除关联用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let userIds = [];
          let sysuserIDs = [];
          multipleSelection.forEach((item) => {
            userIds.push(item.id);
            sysuserIDs.push(item.sysuserId);
          });
          const { code } = await bulkDeleteUserRoles({
            userIds,
            sysuserIDs,
            roleId: this.currClickId,
          });
          if (code === 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getTableList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
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
        roleId: this.currClickId,
        userClass: 1,
        selectType: 1,
        status: 1,
      };
      const { code, result } = await getPagedUser(req);
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

<style lang="scss" scoped>
.user-table {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
