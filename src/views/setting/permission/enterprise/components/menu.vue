<template>
  <div class="tree-wrap">
    <div
      v-loading="loading"
      class="tree-box"
    >
      <el-tree
        :data="permissionRoutes"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="MenuTree"
        :props="menuProps"
        @check="checkChange"
      ></el-tree>
    </div>
    <div class="btn-box">
      <el-button
        v-auth="['eprPermission.btn.saveMenu']"
        style="width: 80px;"
        type="primary"
        @click="saveMenu"
      >保存</el-button>
    </div>
  </div>
</template>

<script>
import { deleteNode, doConfigRedirectUrl } from "@/utils/tool";
import {
  getPermissionsOfRole,
  bulkCreateRolePersmissions,
} from "@/api/setting/permission";
import { getPermissionRoutes } from "@/api/user";
export default {
  name: "diy-menu",
  props: ["currClickId"],
  data() {
    return {
      loading: false,
      permissionRoutes: [],
      menuProps: {
        children: "children",
        label: "description",
      },
    };
  },
  watch: {
    currClickId: {
      handler(newVal) {
        if (newVal) {
          this.getPermissionRoutes();
        }
      },
      immediate: true,
    },
  },
  methods: {
    checkChange(data) {
      // 目前只是在按钮所在页面勾选权限时询问是否分配当前页面下所有按钮权限
      const node = this.$refs.MenuTree.getNode(data.id);
      if (
        node.checked &&
        node.data.children &&
        node.data.children.length > 0 &&
        node.data.children.findIndex((item) => item.type == 2) != -1
      ) {
        this.$confirm("此操作是否分配当前页面下所有按钮权限?", "询问提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {
            // 将所有子节点都取消选中
            this.setChildenNode(node);
          });
      } else if (!node.checked) {
        // 将所有子节点都取消选中
        this.setChildenNode(node);
      }
    },
    setChildenNode(node) {
      let len = node.childNodes.length;
      for (let i = 0; i < len; i++) {
        node.childNodes[i].checked = false;
        this.setChildenNode(node.childNodes[i]);
      }
    },
    saveMenu() {
      this.$nextTick(() => {
        const selectIds = this.$refs.MenuTree.getCheckedNodes(false, true);
        const rolePersmissions = doConfigRedirectUrl(
          selectIds,
          this.currClickId
        );
        const arr = rolePersmissions.map((role) => {
          role.platForm = this.currentIndex;
          return role;
        });
        this.bulkCreateRolePersmissions(arr);
      });
    },
    async bulkCreateRolePersmissions(rolePersmissions) {
      const { code } = await bulkCreateRolePersmissions({
        rolePersmissions,
        platForm: this.currentIndex,
        roleIds: [this.currClickId],
        isCover: true,
      });
      if (code === 200) {
        this.$message.success("保存成功了！");
        this.getPermissionsOfRole(this.currClickId);
      }
    },
    async getPermissionRoutes() {
      this.loading = true;
      const { code, result } = await getPermissionRoutes({
        selectType: 0,
        permissionType: 1,
        platForm: this.currentIndex,
      });
      if (code === 200) {
        this.permissionRoutes = deleteNode(result);
        this.getPermissionsOfRole(this.currClickId);
      }
    },
    async getPermissionsOfRole(currClickId) {
      const { code, result } = await getPermissionsOfRole({
        roleId: currClickId,
      });
      if (code === 200) {
        const checkedMenus = result.items.map((item) => item.permissionId);
        console.log("已经选中的菜单", checkedMenus);
        checkedMenus.forEach((element) => {
          const node = this.$refs.MenuTree.getNode(element);
          if (node && node.isLeaf) {
            this.$refs.MenuTree.setChecked(node, true);
          }
        });
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-wrap {
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  .tree-box {
    flex: 1;
  }
  .btn-box {
    text-align: center;
  }
}
</style>
