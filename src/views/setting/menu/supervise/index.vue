<template>
  <div class="tb-screen">
    <div class="content-table-box">
      <div class="btn-group-box">
        <el-button
          icon="el-icon-edit"
          type="primary"
          @click="bindAuth"
        >权限分配</el-button>
        <el-button
          icon="el-icon-plus"
          type="primary"
          @click="addModule"
        >新增模块</el-button>
      </div>
      <div class="table-container">
        <el-table
          v-loading="tableLoading"
          row-key="id"
          :data="tableData"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          stripe
          :header-cell-style="() => ({'background-color' : theme,  'font-size': '16px', 'color': '#fff', 'font-weight': 400})"
          style="width: 100%"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          @select="selectFn"
          @select-all="selectAllFn"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="260px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="sort"
            label="序号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="type"
            label="模块类型"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ menuTypes[scope.row.type].label }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="permissionName"
            label="菜单名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="path"
            label="菜单地址"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="icon"
            label="图标类名"
            align="center"
          ></el-table-column>
          <!-- <el-table-column prop="permissionPlatForm" label="应用类型" align="center">
            <template slot-scope="scope">
              <span>{{portTypes[scope.row.permissionPlatForm].label}}</span>
            </template>
          </el-table-column>-->
          <el-table-column
            label="操作"
            align="center"
            width="300px"
          >
            <template slot-scope="scope">
              <el-button
                @click="addChildMenu(scope.row)"
                type="text"
              >新增子项</el-button>
              <el-button
                @click="editChildMenu(scope.row)"
                type="text"
              >修改模块</el-button>
              <el-button
                @click="deleteChildMenu(scope.row)"
                type="text"
              >删除</el-button>
              <el-button
                @click="moveChildMenu(scope.row, 1)"
                type="text"
              >上移</el-button>
              <el-button
                @click="moveChildMenu(scope.row, 2)"
                type="text"
              >下移</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 添加菜单模块 -->
    <el-dialog
      v-if="dialogFormVisible"
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="700px"
    >
      <el-form
        :model="dialogForm"
        :rules="dialogFormRules"
        label-width="160px"
        label-position="left"
        class="dialog-form"
        ref="dialogForm"
      >
        <el-form-item
          label="模块名称："
          prop="title"
        >
          <el-input
            v-model="dialogForm.title"
            placeholder="请输入模块名称"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="序号："
          prop="sort"
        >
          <el-input
            v-model="dialogForm.sort"
            placeholder="请输入序号"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="图标："
          prop="icon"
        >
          <el-input
            v-model="dialogForm.icon"
            placeholder="请输入图标类名"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="模块类型："
          prop="type"
        >
          <el-select
            v-model="dialogForm.type"
            placeholder="请选择模块类型"
            style="width: 100%"
          >
            <el-option
              v-for="item in menuTypes"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否是一级菜单："
          prop="isFirstLevel"
        >
          <el-select
            v-model="dialogForm.isFirstLevel"
            placeholder="请选择是否是一级菜单"
            style="width: 100%"
          >
            <el-option
              v-for="item in flagOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否是二级菜单："
          prop="isSecondLevel"
        >
          <el-select
            v-model="dialogForm.isSecondLevel"
            placeholder="请选择是否是二级菜单"
            style="width: 100%"
          >
            <el-option
              v-for="item in flagOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否展示面包屑："
          prop="isBreadCrumbs"
        >
          <el-select
            v-model="dialogForm.isBreadCrumbs"
            placeholder="请选择是否展示面包屑"
            style="width: 100%"
          >
            <el-option
              v-for="item in breadCrumbOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="dialogForm.type != 2 && dialogForm.type != 4"
          label="菜单路径："
          prop="path"
        >
          <el-input
            v-model="dialogForm.path"
            placeholder="请输入菜单路径"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="dialogForm.type != 2 && dialogForm.type != 4"
          label="菜单名称："
          prop="permissionName"
        >
          <el-input
            v-model="dialogForm.permissionName"
            placeholder="请输入菜单名称"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="dialogForm.type === 1 || dialogForm.type === 3"
          label="组件路径："
          prop="component"
          :rules="[
            { required: true, message: '请输入组件路径', trigger: 'blur' },
            {
              validator: validateComponentUrl,
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            v-model="dialogForm.component"
            placeholder="请输入组件路径"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="是否隐藏："
          prop="headerMenu"
        >
          <el-select
            v-model="dialogForm.headerMenu"
            placeholder="请选择是否隐藏"
            style="width: 100%"
          >
            <el-option
              v-for="item in flagOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否跳转："
          prop="isRedirect"
        >
          <el-select
            v-model="dialogForm.isRedirect"
            placeholder="请选择是否跳转"
            style="width: 100%"
          >
            <el-option
              v-for="item in flagOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="dialogForm.isRedirect"
          label="跳转路径："
          prop="redirect"
          :rules="[
            { required: true, message: '请输入跳转路径', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="dialogForm.redirect"
            placeholder="请输入跳转路径"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="是否缓存："
          v-if="dialogForm.type === 1"
        >
          <el-select
            v-model="dialogForm.isKeepAlive"
            placeholder="请选择是否缓存"
            style="width: 100%"
          >
            <el-option
              v-for="item in flagOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="备注："
          prop="description"
        >
          <el-input
            type="textarea"
            :rows="3"
            v-model="dialogForm.description"
            placeholder="请输入备注"
            style="width: 100%"
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
    <!-- 权限分配模块 -->
    <el-dialog
      v-if="dialogAuthVisible"
      title="权限分配"
      :visible.sync="dialogAuthVisible"
      width="700px"
    >
      <div class="role-box">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 15px 0"></div>
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <div
            v-for="city in cities"
            :key="city.id"
          >
            <el-checkbox :label="city.id">{{ city.name }}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="handleAuth"
        >确 定</el-button>
        <el-button @click="dialogAuthVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPermissions,
  createOrEditPermission,
  deletePermission,
  changePermissionSort,
} from "@/api/setting/menu.js";
import { getRoles, bulkCreateRolePersmissions } from "@/api/setting/permission";
export default {
  name: "web",
  data() {
    const validateRedirectUrl = (rule, value, callback) => {
      if (this.dialogForm.isRedirect) {
        console.log(rule, "rule");
        if (value === "") {
          callback(new Error("请输入跳转路径"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateComponentUrl = (rule, value, callback) => {
      if (this.dialogForm.type === 1 || this.dialogForm.type === 3) {
        if (value === "") {
          callback(new Error("请输入组件路径"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    const validateMenuPath = (rule, value, callback) => {
      if (this.dialogForm.type != 2 && this.dialogForm.type != 4) {
        if (value === "") {
          callback(new Error("请输入菜单路径"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateMenuName = (rule, value, callback) => {
      if (this.dialogForm.type != 2 && this.dialogForm.type != 4) {
        if (value === "") {
          callback(new Error("请输入菜单名称"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      oneProductIsSelect: [],
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: false,
      dialogAuthVisible: false,
      multipleSelection: [],
      currentIndex: 0,
      tabList: [
        { id: 0, title: "WEB端" },
        { id: 1, title: "APP端" },
        { id: 2, title: "小程序端" },
      ],
      validateComponentUrl,
      menuTypes: [
        {
          key: 0,
          label: "模块",
        },
        {
          key: 1,
          label: "页面",
        },
        {
          key: 2,
          label: "按钮",
        },
        {
          key: 3,
          label: "外部链接",
        },
        {
          key: 4,
          label: "tab标签",
        },
      ],
      // portTypes: [
      //   {
      //     key: 0,
      //     label: 'web页面',
      //   },
      //   {
      //     key: 1,
      //     label: '移动端App',
      //   },
      //   {
      //     key: 2,
      //     label: '微信小程序',
      //   },
      // ],
      permissionTypes: [
        {
          key: 0,
          label: "监管者",
        },
        {
          key: 1,
          label: "检测机构",
        },
        {
          key: 2,
          label: "用人单位",
        },
        {
          key: 3,
          label: "体检机构",
        },
        {
          key: 4,
          label: "劳动者",
        },
        {
          key: 5,
          label: "监测企业",
        },
        {
          key: 6,
          label: "医疗机构",
        },
        {
          key: 7,
          label: "医疗人员",
        },
      ],
      flagOptions: [
        {
          key: 0,
          label: "否",
        },
        {
          key: 1,
          label: "是",
        },
      ],
      breadCrumbOptions: [
        {
          key: 1,
          label: "是",
        },
        {
          key: 0,
          label: "否",
        },
      ],
      dialogTitle: "",
      dialogFormVisible: false,
      dialogForm: {
        title: "",
        type: "",
        icon: "",
        sort: "",
        path: "",
        permissionName: "",
        parentID: "",
        isSecondLevel: "",
        isFirstLevel: "",
        headerMenu: "",
        redirect: "",
        isRedirect: "",
        component: "",
        isBreadCrumbs: "",
        isKeepAlive: 0,
        linkUrl: "",
      },
      dialogFormRules: {
        sort: [{ required: true, message: "请输入序号", trigger: "blur" }],
        // title: [{ required: true, message: '请输入模块名称', trigger: 'blur' }],
        type: [
          { required: true, message: "请选择模块类型", trigger: "change" },
        ],
        // permissionPlatForm: [
        //   { required: true, message: '请选择应用类型', trigger: 'change' },
        // ],
        isFirstLevel: [
          {
            required: true,
            message: "请选择是否是一级菜单",
            trigger: "change",
          },
        ],
        isSecondLevel: [
          {
            required: true,
            message: "请选择是否是二级菜单",
            trigger: "change",
          },
        ],
        isBreadCrumbs: [
          {
            required: true,
            message: "请选择是否展示面包屑",
            trigger: "change",
          },
        ],
        path: [
          // { required: true, message: "请输入菜单路径", trigger: "blur" },
          {
            required: true,
            validator: validateMenuPath,
            trigger: "blur",
          },
        ],
        permissionName: [
          // { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            required: true,
            validator: validateMenuName,
            trigger: "blur",
          },
        ],
        headerMenu: [
          {
            required: true,
            message: "请选择是否显示",
            trigger: "change",
          },
        ],
        isRedirect: [
          {
            required: true,
            message: "请选择是否跳转",
            trigger: "change",
          },
        ],
        redirect: [
          {
            validator: validateRedirectUrl,
            trigger: "blur",
          },
        ],
      },
      tableLoading: false,
      tableData: [],
    };
  },
  computed: {
    theme() {
      return this.$store.state.settings.theme;
    },
  },
  mounted() {
    this.getRoles();
    this.getPermissions();
  },
  methods: {
    selectAllFn(selection) {
      let isAllSelect = this.checkIsAllSelect();
      this.tableData.forEach((item) => {
        item.isSelect = isAllSelect;
        this.$refs.multipleTable.toggleRowSelection(item, !isAllSelect);
        this.selectFn(selection, item);
      });
    },
    selectFn(selection, row) {
      this.setRowIsSelect(row);
    },
    setRowIsSelect(row) {
      //当点击父级点复选框时，当前的状态可能为未知状态，所以当前行状态设为false并选中，即可实现子级点全选效果
      if (row.isSelect === "") {
        row.isSelect = false;
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
      row.isSelect = !row.isSelect;
      let that = this;

      function selectAllChildrens(data) {
        data.forEach((item) => {
          item.isSelect = row.isSelect;
          that.$refs.multipleTable.toggleRowSelection(item, row.isSelect);
          if (item.children && item.children.length) {
            selectAllChildrens(item.children);
          }
        });
      }

      function getSelectStatus(selectStatuaArr, data) {
        data.forEach((childrenItem) => {
          selectStatuaArr.push(childrenItem.isSelect);
          if (childrenItem.children && childrenItem.children.length) {
            getSelectStatus(selectStatuaArr, childrenItem.children);
          }
        });
        return selectStatuaArr;
      }
      function getLevelStatus(row) {
        //如果当前节点的 parentID = 0 并且有子节点，则为1
        //如果当前节点的 parentID != 0 并且子节点没有子节点 则为3
        if (row.parentID == 0) {
          if (row.children && row.children.length) {
            return 1;
          } else {
            return 4;
          }
        } else {
          if (!row.children || !row.children.length) {
            return 3;
          } else {
            return 2;
          }
        }
      }
      let result = {};
      //获取明确的节点
      function getExplicitNode(data, parentId) {
        data.forEach((item) => {
          if (item.id == parentId) {
            result = item;
          }
          if (item.children && item.children.length) {
            getExplicitNode(item.children, parentId);
          }
        });
        return result;
      }
      function operateLastLeve(row) {
        //操作的是子节点  1、获取父节点  2、判断子节点选中个数，如果全部选中则父节点设为选中状态，如果都不选中，则为不选中状态，如果部分选择，则设为不明确状态
        let selectStatuaArr = [];
        let item = getExplicitNode(that.tableData, row.parentId);
        selectStatuaArr = getSelectStatus(selectStatuaArr, item.children);
        if (
          selectStatuaArr.every((selectItem) => {
            return true == selectItem;
          })
        ) {
          item.isSelect = true;
          that.$refs.multipleTable.toggleRowSelection(item, true);
        } else if (
          selectStatuaArr.every((selectItem) => {
            return false == selectItem;
          })
        ) {
          item.isSelect = false;
          that.$refs.multipleTable.toggleRowSelection(item, false);
        } else {
          item.isSelect = "";
        }
        //则还有父级
        if (item.parentId != 0) {
          operateLastLeve(item);
        }
      }
      //判断操作的是子级点复选框还是父级点复选框，如果是父级点，则控制子级点的全选和不全选

      //1、只是父级 2、既是子集，又是父级 3、只是子级
      let levelSataus = getLevelStatus(row);
      if (levelSataus == 1) {
        selectAllChildrens(row.children);
      } else if (levelSataus == 2) {
        selectAllChildrens(row.children);
        operateLastLeve(row);
      } else if (levelSataus == 3) {
        operateLastLeve(row);
      }
    },
    checkIsAllSelect() {
      this.oneProductIsSelect = [];
      this.tableData.forEach((item) => {
        this.oneProductIsSelect.push(item.isSelect);
      });
      //判断一级产品是否是全选.如果一级产品全为true，则设置为取消全选，否则全选
      let isAllSelect = this.oneProductIsSelect.every((selectStatusItem) => {
        return true == selectStatusItem;
      });
      return isAllSelect;
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities.map((ele) => ele.id) : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value, "handleCheckedCitiesChange");
      this.selectRoleIds = value;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    // 选择框change事件
    handleSelectionChange(rows) {
      this.multipleSelection = rows;
    },
    // 分配权限确认框
    handleAuth() {
      if (this.selectRoleIds.length <= 0) {
        this.$message.warning("请至少选择一个角色分配菜单权限");
        return;
      }
      this.createRolePersmissions();
    },
    // 分配权限
    bindAuth() {
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请至少选择一个菜单绑定角色权限");
        return;
      }
      this.checkAll = false;
      this.isIndeterminate = false;
      this.checkedCities = [];
      this.dialogAuthVisible = true;
    },
    // 获取角色数据
    async getRoles() {
      const { code, result } = await getRoles({
        roleType: 0,
      });
      if (code === 200) {
        this.cities = result.items;
      }
    },
    // 绑定权限
    async createRolePersmissions() {
      const rolePersmissions = this.multipleSelection.map((item) => {
        const obj = {
          permissionId: item.id,
          redirect: "",
        };
        // 如果是菜单模块
        if (item.type === 0) {
          // 顶部二级菜单模块
          if (item.isSecondLevel) {
            const firstChild = item.children[0];
            obj.redirect = firstChild.path;
          }
          // 顶部一级菜单模块
          if (item.isFirstLevel) {
            const firstChild = item.children[0];
            // 如果是模块
            if (firstChild.type === 0) {
              obj.redirect = firstChild.path;
            }
            // 如果是页面
            if (firstChild.type === 1) {
              obj.redirect = `${item.path}/${firstChild.path}`;
            }
          }
          const childrens = this.multipleSelection.filter(
            (ele) => ele.parentID === item.id
          );
          // 左侧菜单模块
          const firstChild = childrens[0];
          // 如果第一个子菜单是模块
          if (firstChild && firstChild.type === 0) {
            obj.redirect = firstChild.path;
          }
          // 如果第一个子菜单是页面
          if (firstChild && firstChild.type === 1) {
            obj.redirect = `${item.path}/${firstChild.path}`;
          }
        }
        return obj;
      });
      const { code, message } = await bulkCreateRolePersmissions({
        rolePersmissions,
        platForm: 0,
        roleIds: this.selectRoleIds,
        isCover: false,
      });
      if (code === 200) {
        this.$message.success(message);
        this.dialogAuthVisible = false;
        this.$nextTick(() => {
          this.$refs.multipleTable.clearSelection();
        });
      }
    },
    resetForm() {
      this.dialogForm = {
        title: "",
        type: "",
        icon: "",
        sort: "",
        path: "",
        permissionName: "",
        parentID: "",
        isSecondLevel: "",
        isFirstLevel: "",
        headerMenu: "",
        redirect: "",
        isRedirect: "",
        component: "",
        isBreadCrumbs: "",
        isKeepAlive: 0,
      };
    },
    addModule() {
      this.resetForm();
      this.dialogTitle = "新增模块";
      this.dialogForm.parentID = 0;
      this.dialogFormVisible = true;
    },
    addChildMenu(rowData) {
      this.resetForm();
      console.log(rowData, "damhqojajhgjagj ");
      this.dialogTitle = "新增模块";
      this.dialogForm.parentID = rowData.id;
      this.dialogFormVisible = true;
    },
    editChildMenu(rowData) {
      console.log(rowData, "whgfahghagh");
      this.dialogTitle = "修改模块";
      this.dialogForm = {
        ...rowData,
        permissionType: rowData.permissionType * 1,
        isFirstLevel: rowData.isFirstLevel ? 1 : 0,
        isSecondLevel: rowData.isSecondLevel ? 1 : 0,
        headerMenu: rowData.headerMenu ? 1 : 0,
        isRedirect: rowData.isRedirect ? 1 : 0,
        isBreadCrumbs: rowData.isBreadCrumbs ? 1 : 0,
        isKeepAlive: rowData.isKeepAlive ? 1 : 0,
      };
      this.dialogForm.parentID = rowData.parentID;
      this.dialogFormVisible = true;
    },
    deleteChildMenu(rowData) {
      this.$confirm("此操作将删除该模块, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { code } = await deletePermission({ id: rowData.id });
          if (code === 200) {
            this.$message.success("删除成功");
            this.getPermissions();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async moveChildMenu(rowData, type) {
      const { code } = await changePermissionSort({
        permissionId: rowData.id,
        sort: rowData.sort,
        changeMode: type,
      });
      if (code === 200) {
        this.$message.success("操作成功");
        this.getPermissions();
      }
    },
    handleConfirm() {
      this.$refs["dialogForm"].validate(async (valid) => {
        if (valid) {
          const reqParams = {
            ...this.dialogForm,
            permissionType: 0,
            isFirstLevel: this.dialogForm.isFirstLevel === 1 ? true : false,
            isSecondLevel: this.dialogForm.isSecondLevel === 1 ? true : false,
            headerMenu: this.dialogForm.headerMenu === 1 ? true : false,
            isRedirect: this.dialogForm.isRedirect === 1 ? true : false,
            isBreadCrumbs: this.dialogForm.isBreadCrumbs === 1 ? true : false,
            isKeepAlive: this.dialogForm.isKeepAlive === 1 ? true : false,
            permissionPlatForm: 0,
            userClass: 0,
          };
          console.log(reqParams, "我回个话按个价格");
          const { code } = await createOrEditPermission(reqParams);
          if (code === 200) {
            this.$message.success("操作成功");
            this.dialogFormVisible = false;
            this.getPermissions();
          }
        } else {
          console.log("表单信息填写有误");
          return false;
        }
      });
    },
    handleClose() {
      this.$refs.dialogForm.resetFields();
      this.dialogFormVisible = false;
    },
    async getPermissions() {
      this.tableLoading = true;
      const { code, result } = await getPermissions({
        selectType: 0,
        permissionType: 0,
        platForm: 0,
      });
      if (code === 200) {
        this.tableData = result;
        this.tableLoading = false;
      }
    },
    onSubmit() {
      const pagination = {
        skipCount: (this.pagination.currentPage - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize,
      };
      this.getPagedSystemLog({
        ...formParam,
        ...pagination,
      });
    },
    handleSizeChange(val) {
      this.pagination.currentPage = 1;
      this.pagination.pageSize = val;
      this.onSubmit();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.onSubmit();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
