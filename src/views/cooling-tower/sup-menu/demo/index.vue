<template>
  <div class="container">
    <el-button
      type="primary"
      @click="handleOpen"
    >打开</el-button>
    <el-dialog
      title="添加表单"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
    >
      <zyy-col-form
        :formConfig="formConfig"
        ref="dFormRef"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formValidateDiy } from "@/utils/tool";
import { ReplySystemConsult } from "@/api/supervised/consult";
export default {
  data() {
    return {
      dialogVisible: false,
      formConfig: [
        {
          id: 1,
          title: "测试信息",
          columns: [
            {
              label: "咨询标题:",
              labelWidth: "120px",
              prop: "consultTitle",
              value: "",
              required: true,
              type: "input",
              placeholder: "请输入咨询标题",
              xlSpan: 12,
            },
            {
              label: "咨询类型:",
              labelWidth: "120px",
              prop: "consultType",
              value: "",
              required: true,
              type: "selectmenu",
              placeholder: "请选择咨询类型",
              isSearch: false,
              code: 11,
              xlSpan: 12,
            },
            {
              label: "咨询内容:",
              labelWidth: "120px",
              prop: "consultContent",
              value: "",
              required: true,
              type: "textarea",
              rows: 4,
              maxlength: 300,
              placeholder: "请输入咨询内容",
              xlSpan: 24,
            },
            {
              label: "联系方式:",
              labelWidth: "120px",
              prop: "linkphone",
              value: "",
              type: "input",
              placeholder: "请输入联系方式",
              validator: [
                { required: true, message: "请输入联系方式", trigger: "blur" },
                {
                  validator: formValidateDiy(
                    "validateMobileNumber",
                    "手机号格式不正确"
                  ),
                  trigger: "blur",
                },
              ],
              xlSpan: 24,
            },
            {
              label: "相关图片:",
              labelWidth: "120px",
              prop: "imgList",
              value: [],
              type: "imgList",
              uploadLimit: {
                tip: "图片大小不能超过5M，支持jpg、png、jpeg格式。",
                size: 5,
                type: ".jpg, .png, .jpeg",
                fileCode: 2,
              },
            },
            {
              label: "相关文件:",
              labelWidth: "120px",
              prop: "fileList",
              value: [],
              type: "fileList",
              uploadLimit: {
                tip: "只能上传doc/docx文件，且不超过10MB",
                size: 10,
                type: ".doc, .docx",
                fileCode: 2,
              },
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen() {
      this.dialogVisible = true;
    },
    dialogConfirm() {
      const dFormRef = this.$refs.dFormRef;
      const ruleFormRef = dFormRef.$refs.columnFormRef;
      const uploadListRef = dFormRef.$refs.uploadListRef;
      const uploadFileListRef = dFormRef.$refs.uploadFileListRef;
      ruleFormRef.validate(async (valid) => {
        if (valid) {
          const formParam = dFormRef.form;
          const req = {
            ...formParam,
          };
          delete req.imgList;
          delete req.fileList;

          const { code, result } = await ReplySystemConsult(req);
          if (code === 200) {
            const needUploadImgList =
              formParam.imgList &&
              formParam.imgList.length > 0 &&
              formParam.imgList.some((item) => item.status === "ready");
            const needUploadFileList =
              formParam.fileList &&
              formParam.fileList.length > 0 &&
              formParam.fileList.some((item) => item.status === "ready");
            if (needUploadImgList) {
              uploadListRef[0].uploadItemId = result;
              uploadListRef[0].$refs.uploadRef.submit();
            } else {
              dFormRef.imgListUploaded = true;
            }
            if (needUploadFileList) {
              uploadFileListRef[0].uploadItemId = result;
              uploadFileListRef[0].$refs.uploadRef.submit();
            } else {
              dFormRef.fileListUploaded = true;
            }
          }
        } else {
          console.log("表单信息填写错误");
        }
      });
    },
    getTableList() {
      console.log("getTableList");
    },
  },
};
</script>


<style lang="scss" scoped>
.container {
}
</style>