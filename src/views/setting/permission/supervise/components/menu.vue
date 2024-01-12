<template>
  <div class="tree-wrap">
    <div
      class="tree-box"
      v-loading="loading"
    >
      <el-tree
        :data="permissionRoutes"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="MenuTree"
        :props="menuProps"
      ></el-tree>
    </div>
    <div class="btn-box">
      <el-button
        v-auth="['sprPermission.btn.saveMenu']"
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
    saveMenu() {
      this.$nextTick(() => {
        const selectIds = this.$refs.MenuTree.getCheckedNodes(false, true);
        console.log(selectIds);
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
        permissionType: 0,
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
        this.$nextTick(() => {
          checkedMenus.forEach((element) => {
            const node = this.$refs.MenuTree.getNode(element);
            if (node && node.isLeaf) {
              this.$refs.MenuTree.setChecked(node, true);
            }
          });
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
