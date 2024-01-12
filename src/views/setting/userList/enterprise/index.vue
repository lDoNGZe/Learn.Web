<template>
  <div class="tb-screen">
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
          v-auth="['eprUser.btn.add']"
          type="primary"
          icon="el-icon-plus"
          @click="handleAdd"
        >添加用户稍等</el-button>
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
            v-auth="['eprUser.btn.edit']"
            type="text"
            @click="handleEdit(slotScope.data)"
          >编辑</el-button>
          <el-button
            v-auth="['eprUser.btn.delete']"
            type="text"
            @click="handleDelete(slotScope.data)"
          >删除</el-button>
        </div>
      </template>
    </zyy-table>

    <!-- 添加用户 || 编辑用户 -->
    <el-dialog
      v-if="dialogUserVisible"
      :title="dialogUserTitle"
      :visible.sync="dialogUserVisible"
      width="600px"
    >
      <el-form
        :model="dialogUserForm"
        :rules="
          dialogUserTitle == '添加用户'
            ? dialogUserFormRules1
            : dialogUserFormRules2
        "
        label-width="100px"
        label-position="right"
        class="dialog-form"
        ref="dialogUserForm"
      >
        <div>
          <div class="form-group-title">个人信息</div>
          <div class="base-form">
            <el-form-item
              label="姓名："
              prop="sysuserName"
            >
              <el-input
                v-model="dialogUserForm.sysuserName"
                placeholder="请输入姓名"
                style="width: 100%"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="单位："
              prop="enterpriseId"
            >
              <el-input
                disabled
                v-if="!canEdit"
                v-model="dialogUserForm.eprName"
                style="width: 100%"
              ></el-input>
              <el-select
                v-else
                v-model="dialogUserForm.enterpriseId"
                filterable
                remote
                reserve-keyword
                :remote-method="remoteMethod"
                :loading="loading"
                placeholder="请输入单位名称"
                style="width: 100%"
              >
                <el-option
                  v-for="item in enterpriseList"
                  :key="item.enterpriseId"
                  :label="item.eprName"
                  :value="item.enterpriseId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="角色："
              prop="roleIds"
            >
              <el-select
                multiple
                collapse-tags
                v-model="dialogUserForm.roleIds"
                placeholder="请选择角色"
                style="width: 100%"
              >
                <el-option
                  v-for="role in roleList"
                  :key="role.id"
                  :label="role.name"
                  :value="role.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="邮箱："
              prop="sysuserEmail"
            >
              <el-input
                v-model="dialogUserForm.sysuserEmail"
                placeholder="请输入邮箱"
                style="width: 100%"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="手机号："
              prop="sysuserMP"
            >
              <el-input
                v-model="dialogUserForm.sysuserMP"
                placeholder="请输入手机号"
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="form-group-title">账号信息</div>
          <div class="base-form">
            <el-form-item
              label="账号："
              prop="sysuserID"
            >
              <el-input
                :disabled="dialogUserForm.id ? true : false"
                v-model="dialogUserForm.sysuserID"
                maxlength="14"
                placeholder="由3~14个字母、数字、汉字或下划线字符组成"
                style="width: 100%"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="有效期至："
              prop="sysuserExptime"
            >
              <el-date-picker
                v-model="dialogUserForm.sysuserExptime"
                type="datetime"
                placeholder="请选择账号有效期"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
            <div v-if="dialogUserTitle == '添加用户'">
              <el-form-item
                label="密码："
                prop="sysuserPass"
              >
                <el-input
                  show-password
                  v-model="dialogUserForm.sysuserPass"
                  type="password"
                  placeholder="密码设置为：8-16位，包含数字、字母、符号"
                  style="width: 100%"
                ></el-input>
                <div class="tips">选填，默认密码为：qwer1234@</div>
              </el-form-item>
              <el-form-item
                label="确认密码："
                prop="confirmPassword"
              >
                <el-input
                  v-model="dialogUserForm.confirmPassword"
                  show-password
                  type="password"
                  placeholder="请确认密码"
                  style="width: 100%"
                ></el-input>
                <div class="tips">选填，默认密码为：qwer1234@</div>
              </el-form-item>
            </div>
            <div v-if="dialogUserTitle == '编辑用户'">
              <el-form-item
                label="修改密码："
                prop="isModifyPassword"
              >
                <el-switch v-model="dialogUserForm.isModifyPassword"></el-switch>
              </el-form-item>
              <div v-if="dialogUserForm.isModifyPassword">
                <el-form-item
                  label="密码："
                  prop="newPassword"
                >
                  <el-input
                    show-password
                    v-model="dialogUserForm.newPassword"
                    type="password"
                    placeholder="密码设置为：8-16位，包含数字、字母、符号"
                    style="width: 100%"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="确认密码："
                  prop="confirmNewPassword"
                >
                  <el-input
                    v-model="dialogUserForm.confirmNewPassword"
                    show-password
                    type="password"
                    placeholder="请确认密码"
                    style="width: 100%"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <el-form-item
              label="状态："
              prop="isActive"
            >
              <el-switch
                v-model="dialogUserForm.isActive"
                :inactive-text="dialogUserForm.isActive ? '启用' : '禁用'"
              ></el-switch>
            </el-form-item>
          </div>
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
const dayjs = require("dayjs");
import Went from "@/assets/js/encryption.js";
import { formValidateDiy } from "@/utils/tool";
import { getRoles } from "@/api/setting/permission";
import { ListEnterprises } from "@/api/select";
import {
  createOrEditUser,
  localDeleteUser,
  getPagedUser,
  getUserDetail,
  changeActiveState,
} from "@/api/setting/user";
export default {
  name: "enterprise-user",
  data() {
    const validatePass = (rule, value, callback) => {
      if (!this.dialogUserForm.sysuserPass) {
        callback();
      } else {
        const reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}$/;
        if (!reg.test(this.dialogUserForm.sysuserPass)) {
          callback(new Error("密码格式不正确"));
        } else if (
          this.dialogUserForm.confirmPassword &&
          this.dialogUserForm.confirmPassword !==
            this.dialogUserForm.sysuserPass
        ) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      }
    };
    const validateConfirmPass = (rule, value, callback) => {
      if (
        !this.dialogUserForm.sysuserPass &&
        !this.dialogUserForm.confirmPassword
      ) {
        callback();
      } else {
        if (
          this.dialogUserForm.sysuserPass &&
          this.dialogUserForm.confirmPassword &&
          this.dialogUserForm.confirmPassword !==
            this.dialogUserForm.sysuserPass
        ) {
          callback(new Error("两次输入密码不一致"));
        } else if (!this.dialogUserForm.confirmPassword) {
          callback(new Error("请确认密码"));
        } else {
          callback();
        }
      }
    };
    const validateConfirmNewPass = (rule, value, callback) => {
      if (
        this.dialogUserForm.confirmNewPassword !==
        this.dialogUserForm.newPassword
      ) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    const validateMobile = (rule, value, callback) => {
      if (!this.dialogUserForm.sysuserMP) {
        callback();
      } else {
        const reg = /^1[3-9]\d{9}$/;
        if (!reg.test(this.dialogUserForm.sysuserMP)) {
          callback(new Error("手机号格式不正确"));
        } else {
          callback();
        }
      }
    };
    return {
      // 搜索条件表单配置
      formConfig: [
        {
          label: "状态:",
          prop: "status",
          value: -1,
          type: "select",
          options: [
            {
              value: -1,
              label: "全部",
            },
            {
              value: 1,
              label: "启用",
            },
            {
              value: 0,
              label: "禁用",
            },
          ],
        },
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
              prop: "eprName",
              key: 2,
              value: "单位",
            },
            {
              prop: "sysuserID",
              key: 3,
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
            label: "账号",
            prop: "sysuserId",
          },
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
            label: "手机号",
            prop: "sysuserMP",
          },
          {
            label: "邮箱",
            prop: "sysuserEmail",
          },
          {
            label: "状态",
            prop: "isActive",
            width: "130px",
            type: "slot",
            slotName: "switch",
          },
          {
            label: "在线状态",
            prop: "isOnLine",
          },
          {
            label: "在线平台",
            prop: "onLineSubSystem",
          },
          {
            label: "在线设备",
            prop: "onLineType",
          },
          {
            label: "最后登录时间",
            prop: "lastLoginTime",
            type: "datetime",
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
        hasExportBtn: true,
        hasSelect: true,
        // 表格是否展示loading
        loading: true,
        // 导出数据文件名称
        filename: "企业用户",
        nodeKey: "id",
        btnSlotName: ["add"],
        exportBtnCodeList: ["eprUser.btn.export"],
      },
      validateConfirmPass,
      validatePass,
      validateConfirmNewPass,
      dialogUserVisible: false,
      canEdit: false,
      loading: false,
      dialogUserTitle: "",
      dialogUserForm: {
        sysuserName: "",
        enterpriseId: "",
        roleIds: [],
        sysuserEmail: "",
        sysuserMP: "",
        sysuserID: "",
        sysuserPass: "",
        confirmPassword: "",
        isActive: true,
        isModifyPassword: false,
        newPassword: "",
        confirmNewPassword: "",
        sysuserExptime: "",
      },
      dialogUserFormRules1: {
        sysuserName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        enterpriseId: [
          { required: true, message: "请选择单位", trigger: "change" },
        ],
        roleIds: [{ required: true, message: "请选择角色", trigger: "change" }],
        sysuserID: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            validator: formValidateDiy("validateUserName", "账号名不合法"),
            trigger: "blur",
          },
        ],
        sysuserPass: [
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        confirmPassword: [
          {
            validator: validateConfirmPass,
            trigger: "blur",
          },
        ],
        sysuserMP: [
          {
            validator: validateMobile,
            trigger: "blur",
          },
        ],
      },
      dialogUserFormRules2: {
        sysuserName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        enterpriseId: [
          { required: true, message: "请选择单位", trigger: "change" },
        ],
        sysuserGroupId: [
          { required: true, message: "请选择分组", trigger: "change" },
        ],
        roleIds: [{ required: true, message: "请选择角色", trigger: "change" }],
        sysuserID: [{ required: true, message: "请输入账号", trigger: "blur" }],
        newPassword: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            validator: formValidateDiy("validatePassword", "密码格式不正确！"),
            trigger: "blur",
          },
        ],
        confirmNewPassword: [
          {
            required: true,
            message: "请确认密码",
            trigger: "blur",
          },
          {
            validator: validateConfirmNewPass,
            trigger: "blur",
          },
        ],
        sysuserMP: [
          {
            validator: validateMobile,
            trigger: "blur",
          },
        ],
      },
      roleList: [],
      enterpriseList: [],
    };
  },
  mounted() {
    this.getRoles();
    this.getTableList();
  },
  methods: {
    // 远程获取单位列表
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        this.getEnterpriseByEprType(query);
      } else {
        this.enterpriseList = [];
      }
    },
    // 状态开关
    switchChange(val) {
      this.changeActiveState({ id: val });
    },
    // 添加用户
    handleAdd() {
      this.dialogUserForm = {
        sysuserName: "",
        enterpriseId: "",
        sysuserGroupId: this.currClickId,
        roleIds: [],
        sysuserEmail: "",
        sysuserMP: "",
        sysuserID: "",
        sysuserPass: "",
        confirmPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        isModifyPassword: false,
        isActive: true,
        sysuserExptime: "",
      };
      this.canEdit = true;
      this.dialogUserTitle = "添加用户";
      this.dialogUserVisible = true;
    },
    // 编辑用户
    handleEdit(rowData) {
      this.dialogUserTitle = "编辑用户";
      this.getUserDetail(rowData.id);
    },
    // 确认添加用户
    handleUserConfirm() {
      this.$refs.dialogUserForm.validate((valid) => {
        if (valid) {
          const req = { ...this.dialogUserForm };
          delete req.confirmNewPassword;
          delete req.confirmPassword;
          this.createOrEditUser(req);
        } else {
          console.log("表单信息填写错误");
          return false;
        }
      });
    },
    // 删除
    handleDelete(rowData) {
      this.$confirm("此操作将删除用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { code } = await localDeleteUser({
            userIds: [rowData.id],
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
        userClass: 1,
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
    // 获取用户详情数据
    async getUserDetail(id) {
      const { code, result } = await getUserDetail({ id });
      if (code === 200) {
        this.dialogUserForm = {
          ...result,
          enterpriseId: result.enterpriseId != 0 ? result.enterpriseId : "",
          eprName: result.eprName,
          isModifyPassword: false,
          newPassword: "",
          confirmNewPassword: "",
          sysuserPass: "",
          confirmPassword: "",
          sysuserExptime: result.sysuserExptime
            ? dayjs(result.sysuserExptime).format("YYYY-MM-DD HH:mm:ss")
            : "",
        };
        this.canEdit = result.enterpriseId == 0;
        this.dialogUserVisible = true;
      }
    },
    // 修改用户启用状态
    async changeActiveState(reqParams) {
      const { code, message } = await changeActiveState(reqParams);
      if (code === 200) {
        this.$message.success(message);
      } else {
        this.$message.error(message);
      }
    },
    // 创建用户
    async createOrEditUser(reqParams) {
      let params = {
        ...reqParams,
        sysuserPass: Went.utility.wCoder.wEncode(reqParams.sysuserPass),
        userClass: 1,
      };
      if (this.dialogUserTitle === "编辑用户") {
        const isChange = this.dialogUserForm.isModifyPassword;
        params.isPasswordChange = isChange;
        // 修改了密码
        if (isChange) {
          params.sysuserPass = Went.utility.wCoder.wEncode(
            this.dialogUserForm.newPassword
          );
        } else {
          params.sysuserPass = reqParams.sysuserPass;
        }
      }
      const { code, message } = await createOrEditUser(params);
      if (code === 200) {
        this.dialogUserVisible = false;
        this.$message.success(message);
        this.getTableList();
      }
    },
    // 获取单位列表数据
    async getEnterpriseByEprType(keyword) {
      const { code, result } = await ListEnterprises({ eprName: keyword });
      if (code === 200) {
        this.enterpriseList = result;
        this.loading = false;
      }
    },
    // 获取角色列表数据
    async getRoles() {
      const { code, result } = await getRoles({ roleType: 1 });
      if (code === 200) {
        this.roleList = result.items;
      }
    },
  },
};
</script>