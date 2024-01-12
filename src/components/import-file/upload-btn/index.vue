<template>
  <div class="upload-btn-wrap">
    <el-upload
      ref="UploadBtn"
      class="upload-demo"
      :data="formData"
      :headers="headers"
      :action="uploadUrl"
      :limit="1"
      :show-file-list="false"
      accept=".xls, .xlsx"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
    >
      <el-button type="primary">上传文件</el-button>
    </el-upload>
  </div>
</template>

<script>
import { getBackApiUrl } from "@/utils/tool";
import { getToken } from "@/utils/auth";
export default {
  name: "upload-btn",
  data() {
    return {
      formData: {},
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      uploadUrlList: [],
    };
  },
  created() {
    this.formData = {};
  },
  computed: {
    uploadUrl() {
      let url = "";
      return getBackApiUrl("fileRoot") + url;
    },
  },
  methods: {
    // 文件上传之前
    beforeUpload(file) {
      const extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      const size = file.size / 1024 / 1024;
      const isExtension = extension === "xls" || extension === "xlsx";
      const is10Mb = size <= 10;
      if (!isExtension) {
        this.$refs.UploadBtn.clearFiles();
        this.$message.warning("只能上传excel的文件");
      }
      if (!is10Mb) {
        this.$refs.UploadBtn.clearFiles();
        this.$message.warning("文件大小不得超过10MB");
      }
      return isExtension && is10Mb;
    },
    // 文件上传成功
    handleSuccess(res) {
      if (res.code === 200) {
        this.$refs.UploadBtn.clearFiles();
        this.$emit("updateReload", res);
      } else {
        this.$refs.UploadBtn.clearFiles();
        this.$message.warning(res.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
