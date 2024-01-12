<template>
  <el-dialog
    :visible.sync="visible"
    title="文档预览"
    width="80%"
    custom-class="preview-dialog"
  >
    <div
      :class="[showLoading ? 'default-height': 'auto-height']"
      v-loading="showLoading"
    >
      <!-- 预览Excel表格 -->
      <vue-office-excel
        v-show="previewFileType == 0 && !showLoading"
        :src="excelUrl"
        style="width: 100%; height: 100%"
        @rendered="rendered"
        @error="error"
      />
      <!-- 预览PDF文档 -->
      <vue-office-pdf
        v-show="previewFileType == 1 && !showLoading"
        :src="pdfUrl"
        style="width: 100%; height: 100%"
        @rendered="rendered"
        @error="error"
      />
    </div>
  </el-dialog>
</template>

<script>
//引入VueOfficePdf组件
import VueOfficePdf from "@vue-office/pdf";
//引入VueOfficeExcel组件
import VueOfficeExcel from "@vue-office/excel";
//引入相关样式
import "@vue-office/excel/lib/index.css";

import { getBackApiUrl } from "@/utils/tool";
import { GetFileToPdfRelativePath } from "@/api/upload";
export default {
  name: "preview-doc",
  components: {
    VueOfficeExcel,
    VueOfficePdf,
  },

  props: {
    fileParams: {
      required: true,
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      visible: false,
      showLoading: false,
      pdfUrl: "",
      excelUrl: "",
    };
  },

  computed: {
    /**
     * previewFileType 预览文件的类型
     * type: 0 excel  type: 1 pdf
     */
    previewFileType() {
      const { url } = this.fileParams;
      const isXlsx = url.indexOf(".xlsx") !== -1;
      const isXls = url.indexOf(".xls") !== -1;
      let type = 0;
      if (isXlsx || isXls) {
        type = 0;
      } else {
        type = 1;
      }
      return type;
    },
  },

  mounted() {
    this.showLoading = true;
    if (this.previewFileType == 0) {
      this.excelView();
    } else if (this.previewFileType == 1) {
      this.getFileStreamByRelativePath();
    }
  },

  methods: {
    /**
     * 渲染完成
     */
    rendered() {
      this.showLoading = false;
    },
    /**
     * 渲染失败
     */
    error(errorInfo) {
      console.log(errorInfo, "errorInfo");
      this.showLoading = false;
    },
    /**
     * 关闭弹窗
     */
    cancel() {
      this.$emit("cancel");
    },
    /**
     * 获取文件流数据
     */
    async getFileStreamByRelativePath() {
      const { code, result } = await GetFileToPdfRelativePath({
        relativePath: this.fileParams.relativePath,
      });
      if (code === 200) {
        this.pdfUrl = getBackApiUrl("fileRoot") + result;
      }
    },
    /**
     * 预览Excel表格
     */
    excelView() {
      this.excelUrl = this.fileParams.url;
    },
  },
};
</script>

<style lang="scss" scoped>
.default-height {
  height: 460px;
}
.auto-height {
  height: auto;
}
::v-deep .preview-dialog {
  &.el-dialog {
    .el-dialog__body {
      max-height: 80vh !important;
    }
  }
}
::v-deep .x-spreadsheet-sheet {
  width: 100% !important;
  .x-spreadsheet-overlayer,
  .x-spreadsheet-table {
    width: 100% !important;
  }
  .x-spreadsheet-scrollbar {
    &.horizontal {
      width: 100% !important;
    }
    &.vertical {
      height: 460px !important;
    }
  }
  .x-spreadsheet-table,
  .x-spreadsheet-overlayer {
    height: 460px !important;
  }
}
</style>
