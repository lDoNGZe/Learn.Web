<template>
  <div class="upload-file-box">
    <el-upload
      ref="uploadRef"
      action="#"
      multiple
      :accept="uploadLimit.type"
      :auto-upload="false"
      :on-remove="onRemove"
      :on-change="onChange"
      :before-remove="beforeRemove"
      :http-request="uploadRequest"
      :file-list="fileList"
    >
      <el-button type="primary">点击上传</el-button>
      <div
        slot="tip"
        class="el-upload__tip"
      >{{uploadLimit.tip}}</div>
    </el-upload>
  </div>
</template>

<script>
import { isFile } from "@/utils/tool";
import { Upload } from "@/api/upload/index";
export default {
  props: {
    keyName: {
      type: String,
      required: true,
    },
    uploadLimit: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      fileList: [],
      uploadItemId: "",
    };
  },
  methods: {
    /**
     * 本地删除图片
     */
    localDelFile(name, fileList) {
      const delIndex = fileList.findIndex((item) => item.name == name);
      if (delIndex != -1) {
        fileList.splice(delIndex, 1);
      }
    },
    /**
     * 本地图片移除成功
     */
    onRemove(_, fileList) {
      this.$emit(`update:${this.keyName}`, fileList);
      this.$parent.validate();
    },
    /**
     * 本地文件移除之前
     */
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`, "提示", {
        type: "warning",
      }).then(() => {
        const ids = [];
        if (file.id) {
          ids.push(file.id);
        }
        this.localDelFile(file.name, this.fileList);
      });
    },
    /**
     * 上传文件发生变化时
     */
    onChange(file, fileList) {
      const type = isFile(file.name);
      if (!type) {
        this.$message.error(`只允许上传${this.uploadLimit.type}格式的文件`);
        this.localDelFile(file.name, fileList);
        return;
      }
      const isLtMB = file.size / 1024 / 1024 < this.uploadLimit.size;
      if (!isLtMB) {
        this.$message.error(`上传的图片大小不能超过${this.uploadLimit.size}MB`);
        this.localDelFile(file.name, fileList);
        return;
      }
      if (type && isLtMB) {
        this.$emit(`update:${this.keyName}`, fileList);
        this.$parent.clearValidate(this.keyName);
      }
    },
    /**
     * 自定义上传文件方法
     */
    async uploadRequest({ file }) {
      const formData = new FormData();
      formData.append("fileCode", this.uploadLimit.fileCode);
      formData.append("fileType", 0);
      formData.append("files", file);
      formData.append("itemId", this.uploadItemId);
      const { code } = await Upload(formData);
      if (code === 200) {
        this.$emit("update:fileListUploaded", true);
      } else {
        this.$emit("update:fileListUploaded", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>