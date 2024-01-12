<template>
  <div class="lrtb-screen">
    <!-- 左侧管理员角色区域 -->
    <div class="left-tree-box">
      <div class="tree-title">管理员角色</div>
      <div class="tree-content">
        <div
          class="tree-item"
          :class="[tree.id === currClickId ? 'active' : '']"
          v-for="tree in treeList"
          :key="tree.id"
          @click="handleClick(tree, $event)"
        >
          <span class="group-name">{{ tree.name }}</span>
          <el-popover
            v-if="!tree.isStatic"
            popper-class="my-popper"
            title="更多操作"
            placement="bottom-start"
            trigger="click"
          >
            <el-button
              v-auth="['sprPermission.btn.editRole']"
              type="text"
              size="mini"
              @click="editGroup(tree)"
            >编辑</el-button>
            <el-button
              v-auth="['sprPermission.btn.deleteRole']"
              type="text"
              size="mini"
              @click="deleteGroup(tree)"
            >删除</el-button>
            <span
              class="ico el-icon-more"
              slot="reference"
            ></span>
          </el-popover>
        </div>
      </div>
      <div class="bot-btn">
        <el-button
          v-auth="['sprPermission.btn.addRole']"
          type="text"
          icon="el-icon-plus"
          @click="addGroup"
        >新建角色</el-button>
      </div>
    </div>
    <div class="right-content-box">
      <!-- tab标签组 -->
      <div class="tab-container">
        <el-radio-group
          v-model="currentIndex"
          @input="toggleTab"
          size="medium"
        >
          <el-radio-button
            v-for="tab in tabList"
            :key="tab.id"
            :label="tab.id"
          >{{tab.title}}</el-radio-button>
        </el-radio-group>
      </div>
      <DiyTable
        v-if="currentIndex === 1"
        ref="DiyTable"
        :currClickId="currClickId"
        :updateUser="updateUser"
      />
      <DiyMenu
        v-if="currentIndex === 2"
        :currClickId="currClickId"
      />
    </div>
    <!-- 添加角色 -->
    <el-dialog
      v-if="dialogFormVisible"
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form
        :model="dialogForm"
        :rules="dialogFormRules"
        label-width="100px"
        label-position="right"
        class="dialog-form"
        ref="dialogForm"
      >
        <el-form-item
          label="角色名称："
          prop="name"
        >
          <el-input
            v-model="dialogForm.name"
            placeholder="请输入角色名称"
            style="width: 340px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="备注："
          prop="description"
        >
          <el-input
            type="textarea"
            :rows="4"
            v-model="dialogForm.description"
            placeholder="请输入备注"
            style="width: 340px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="handleConfirm"
        >确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 关联用户 -->
    <el-dialog
      v-if="dialogUserVisible"
      title="关联用户"
      :visible.sync="dialogUserVisible"
      width="600px"
    >
      <el-form
        :model="dialogUserForm"
        label-width="100px"
        label-position="right"
        class="dialog-form"
        ref="dialogUserForm"
      >
        <div class="base-form">
          <el-form-item
            label="选择角色："
            prop="roleId"
          >
            <el-select
              v-model="dialogUserForm.roleId"
              placeholder="请选择角色"
              style="width: 400px"
            >
              <el-option
                v-for="role in treeList"
                :key="role.id"
                :label="role.name"
                :value="role.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="选择用户："
            prop="userIds"
          >
            <el-input
              placeholder="请输入关键字过滤"
              v-model="filterText"
              style="width: 400px; margin-bottom: 20px"
            ></el-input>
            <el-tree
              show-checkbox
              class="filter-tree"
              :data="userList"
              :props="defaultProps"
              default-expand-all
              ref="filterTree"
              :filter-node-method="filterNode"
              @check-change="checkChange"
            ></el-tree>
          </el-form-item>
        </div>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="handleUserConfirm"
        >确 定</el-button>
        <el-button @click="dialogUserVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DiyTable from "./components/table.vue";
import DiyMenu from "./components/menu.vue";
import { getPagedUser } from "@/api/setting/user";
import {
  getRoles,
  createOrEditRole,
  deleteRole,
  bulkCreateUserRoles,
} from "@/api/setting/permission";
export default {
  name: "enterprise-permission",
  components: {
    DiyTable,
    DiyMenu,
  },
  data() {
    return {
      filterText: "",
      userIds: [],
      userList: [],
      defaultProps: {
        children: "children",
        label: "sysuserName",
      },
      currentIndex: 1,
      currClickId: "",
      tabList: [
        { id: 1, title: "关联用户" },
        { id: 2, title: "功能权限" },
      ],
      dialogFormVisible: false,
      dialogUserVisible: false,
      dialogTitle: "",
      dialogForm: {
        name: "",
        description: "",
      },
      dialogFormRules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
      },
      dialogUserForm: {
        roleId: "",
        userIds: [],
      },
      treeList: [],
      roleList: [],
      enterpriseList: [],
    };
  },
  watch: {
    filterText(newVal) {
      this.$nextTick(() => {
        this.$refs.filterTree.filter(newVal);
      });
    },
    treeList: {
      handler(newVal) {
        if (newVal[0]) {
          this.currClickId = newVal[0].id;
        }
      },
      deep: true,
    },
  },
  created() {
    this.getRoles();
  },
  methods: {
    updateUser(childProps) {
      const { userList, filterText, dialogUserVisible } = childProps;
      this.userList = userList;
      this.filterText = filterText;
      this.dialogUserForm.roleId = this.currClickId;
      this.dialogUserVisible = dialogUserVisible;
      this.getUsersWithoutCurrentRole({
        roleId: this.currClickId,
        userClass: 0,
        status: 1,
        skipCount: 0,
        maxResultCount: 2147483647,
        selectType: 2,
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.sysuserName.indexOf(value) !== -1;
    },
    toggleTab(id) {
      this.currentIndex = id;
    },
    handleClick(currTree, event) {
      if (event.target.className.indexOf("ico") !== -1) {
        return;
      }
      this.currClickId = currTree.id;
    },
    addGroup() {
      this.dialogForm = {
        name: "",
        description: "",
      };
      this.dialogTitle = "新建角色";
      this.dialogFormVisible = true;
    },
    editGroup(currGroup) {
      if (currGroup.isStatic) {
        this.$message.warning("此分组不可操作");
        return;
      }
      this.dialogTitle = "编辑角色";
      this.dialogForm = {
        ...currGroup,
      };
      this.dialogFormVisible = true;
    },
    deleteGroup(currGroup) {
      if (currGroup.isStatic) {
        this.$message.warning("此分组不可操作");
        return;
      }
      this.$confirm("此操作将删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRole({ id: currGroup.id });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async createOrEditRole(reqParams) {
      const { code } = await createOrEditRole({
        ...reqParams,
        roleType: 0,
      });
      if (code === 200) {
        this.dialogFormVisible = false;
        this.getRoles();
      }
    },
    async deleteRole(reqParams) {
      const { code } = await deleteRole(reqParams);
      if (code === 200) {
        this.$message.success("操作成功");
        this.getRoles();
      }
    },
    async getRoles() {
      const { code, result } = await getRoles({
        roleType: 0,
      });
      if (code === 200) {
        this.treeList = result.items;
        this.currClickId = result.items[0].id;
      }
    },
    handleConfirm() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.createOrEditRole({ ...this.dialogForm });
        } else {
          console.log("表单信息填写错误");
          return false;
        }
      });
    },
    handleUserConfirm() {
      this.$refs.dialogUserForm.validate((valid) => {
        if (valid) {
          this.createOrEditUser({ ...this.dialogUserForm });
        } else {
          console.log("表单信息填写错误");
          return false;
        }
      });
    },
    handleClose() {
      this.$refs.dialogForm.resetFields();
      this.dialogFormVisible = false;
    },
    checkChange() {
      this.$nextTick(() => {
        const list = this.$refs.filterTree.getCheckedNodes();
        this.userIds = list;
        console.log(
          this.$refs.filterTree.getCheckedNodes(),
          "this.$refs.filterTree.getCheckedNodes()"
        );
      });
    },
    async getUsersWithoutCurrentRole(reqParams) {
      console.log(reqParams, "reqParams");
      const { code, result } = await getPagedUser(reqParams);
      if (code === 200) {
        this.userList = result.items;
      }
    },
    async createOrEditUser(reqParams) {
      this.dialogUserForm.userIds = this.userIds;
      let params = {
        ...reqParams,
        userIds: this.userIds.map((user) => {
          return user.id;
        }),
        sysuserIDs: this.userIds.map((user) => {
          return user.sysuserId;
        }),
      };
      const { code } = await bulkCreateUserRoles(params);
      if (code === 200) {
        this.$message.success("操作成功");
        this.dialogUserVisible = false;
        this.$refs.DiyTable.onSubmit(this.currClickId);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.employer-box {
  display: flex;
  min-height: calc(100vh - 132px);
  .right-content-box {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
