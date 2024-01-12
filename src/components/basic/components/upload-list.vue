<template>
  <div class="upload-list-box">
    <el-upload
      ref="uploadRef"
      class="list-uploader"
      :accept="uploadLimit.type"
      action="#"
      :auto-upload="false"
      list-type="picture-card"
      :limit="limit"
      :on-preview="preview"
      :on-remove="onRemove"
      :before-remove="beforeRemove"
      :on-change="onChange"
      :http-request="uploadRequest"
      :file-list="fileList"
    >
      <i class="el-icon-plus"></i>
      <div
        class="el-upload__tip"
        slot="tip"
      >{{uploadLimit.tip}}</div>
    </el-upload>
    <el-dialog
      title="大图预览"
      append-to-body
      :visible.sync="previewVisible"
    >
      <div class="preview-box">
        <img :src="previewImgUrl" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { isImage } from "@/utils/tool";
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
      limit: 4,
      previewVisible: false,
      previewImgUrl: "",
      fileList: [],
      uploadItemId: "",
    };
  },
  methods: {
    /**
     * 大图预览
     */
    preview(file) {
      this.previewImgUrl = file.url;
      this.previewVisible = true;
    },
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
      console.log(fileList, "onRemove");
      this.$emit(`update:${this.keyName}`, fileList);
      this.$parent.validate();
    },
    /**
     * 本地图片移除之前
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
     * 上传图片发生变化时
     */
    onChange(file, fileList) {
      const type = isImage(file.name);
      if (!type) {
        this.$message.error(`只允许上传${this.uploadLimit.type}格式的图片`);
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
      formData.append("fileType", 1);
      formData.append("files", file);
      formData.append("itemId", this.uploadItemId);
      const { code } = await Upload(formData);
      if (code === 200) {
        this.$emit("update:imgListUploaded", true);
      } else {
        this.$emit("update:imgListUploaded", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.preview-box {
  width: 100%;
  height: auto;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>