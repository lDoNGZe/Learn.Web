<template>
  <div class="upload-img-box">
    <el-upload
      ref="uploadRef"
      class="avatar-uploader"
      accept=".png, .jpeg, .jpg, .gif"
      action="#"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="onChange"
      :http-request="uploadRequest"
      :file-list="fileList"
    >
      <img
        v-if="previewImgUrl"
        :src="previewImgUrl"
        class="avatar"
      />
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      ></i>
    </el-upload>
  </div>
</template>

<script>
import { isImage } from "@/utils/tool";
import { Upload } from "@/api/upload/index";
export default {
  data() {
    return {
      previewImgUrl: "",
      fileList: [],
      deleteFileIds: "",
    };
  },
  methods: {
    /**
     * 上传图片发生变化时
     */
    onChange(file, fileList) {
      const type = isImage(file.name);
      if (!type) {
        this.$message.error("只允许上传PNG/JPG/GIF格式的图片");
        this.previewImgUrl = "";
        this.$refs.uploadRef.clearFiles();
        return;
      }
      const isLtMB = file.size / 1024 / 1024 < 10;
      if (!isLtMB) {
        this.$message.error("上传的图片大小不能超过10MB");
        this.previewImgUrl = "";
        this.$refs.uploadRef.clearFiles();
        return;
      }

      if (fileList.length > 1) {
        for (let i = 0; i < fileList.length - 1; i++) {
          fileList.splice(i, 1);
        }
      }

      if (type && isLtMB) {
        if (this.fileList && this.fileList.length > 0) {
          this.deleteFileIds = this.fileList[0].id;
        }
        this.previewImgUrl = URL.createObjectURL(file.raw);
      }
    },
    /**
     * 自定义上传文件方法
     */
    async uploadRequest({ file }) {
      const formData = new FormData();
      formData.append("fileCode", 3);
      formData.append("fileType", 1);
      formData.append("files", file);
      formData.append("deleteFileIds", this.deleteFileIds);
      formData.append("itemId", "");
      const { code } = await Upload(formData);
      if (code === 200) {
        this.$emit("update:uploaded", true);
      } else {
        this.$emit("update:uploaded", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixins.scss";

::v-deep .el-upload {
  .el-icon-plus {
    &::before {
      color: #abbccb;
    }
  }
}
.avatar-uploader {
  .el-upload {
    border: 1px dashed $primary-color;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    .avatar-uploader-icon {
      border-color: $primary-color;
    }
  }
  .avatar-uploader-icon {
    border: 1px dashed #fff;
    border-radius: 6px;
    font-size: 28px;
    color: #fff;
    line-height: 240px;
    width: 216px;
    height: 240px;
    text-align: center;
  }
  .avatar {
    border: 1px dashed #fff;
    border-radius: 6px;
    line-height: 240px;
    width: 216px;
    height: 240px;
    display: block;
  }
}
</style>