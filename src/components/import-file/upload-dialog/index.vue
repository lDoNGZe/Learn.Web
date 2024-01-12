<template>
  <el-dialog
    v-if="importDialogVisible"
    title="导入数据"
    :append-to-body="true"
    :visible.sync="importDialogVisible"
    :before-close="beforeClose"
  >
    <div class="step-container">
      <div class="step-item">
        <div class="left-step">
          <span class="title">第一步：</span>
          <span class="desc">下载空的模板表格，录入信息后上传以批量新增信息</span>
        </div>
        <div class="right-btn">
          <el-button @click="downloadTemplate">下载模板</el-button>
        </div>
      </div>
      <div class="step-item">
        <div class="left-step">
          <span class="title">第二步：</span>
          <span class="desc">按模板调整格式后，点击“上传文件”完成录入</span>
        </div>
        <div class="right-btn">
          <upload-btn />
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import UploadBtn from "../upload-btn/index.vue";
import { GetSystemFileTemplate } from "@/api/upload";
import { downLocalFile, getBackApiUrl } from "@/utils/tool";
export default {
  props: {
    importDialogVisible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  components: {
    UploadBtn,
  },

  data() {
    return {
      downLoading: false,
    };
  },

  methods: {
    // 下载模板
    downloadTemplate() {
      this.getSystemFileTemplate();
    },
    // 获取文件模板接口
    async getSystemFileTemplate() {
      const { code, result } = await GetSystemFileTemplate({
        systemFileTempCode: "",
        itemId: "",
      });
      if (code === 200) {
        const { fileName, relativePath } = result;
        const url = getBackApiUrl("fileRoot") + relativePath;
        downLocalFile(url, fileName);
      }
    },
    // 弹窗关闭之前回调
    beforeClose() {
      this.$emit("update:importDialogVisible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.step-container {
  .step-item {
    .left-step {
      font-size: 15px;
    }
    .right-btn {
      padding: 20px 0;
    }
  }
}
</style>
