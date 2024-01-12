<template>
  <el-form
    :model="form"
    :label-position="labelPosition"
    class="column-form"
    ref="columnFormRef"
  >
    <div
      class="group-box"
      v-for="config in formConfig"
      :key="config.id"
    >
      <div
        v-if="config.title"
        class="group-name"
      >{{config.title}}</div>
      <div :class="[config.title ? 'group-content' : '']">
        <el-row :gutter="10">
          <el-col
            v-for="col in config.columns"
            :key="col.prop"
            :xs="col.xsSpan != undefined ? col.xsSpan : 24"
            :sm="col.smSpan != undefined ? col.smSpan : 24"
            :md="col.mdSpan != undefined ? col.mdSpan : 24"
            :lg="col.lgSpan != undefined ? col.lgSpan : 24"
            :xl="col.xlSpan != undefined ? col.xlSpan : 24"
          >
            <el-form-item
              :label="col.label"
              :prop="col.prop"
              :rules="col.rules"
              :label-width="col.labelWidth"
            >

              <!-- 输入框 -->
              <el-input
                v-if="col.type === 'input'"
                v-model="form[col.prop]"
                :maxlength="col.maxlength"
                show-word-limit
                :placeholder="col.placeholder"
                :disabled="col.disabled"
                style="width: 100%;"
              ></el-input>
              <!-- 文本域 -->
              <el-input
                v-else-if="col.type === 'textarea'"
                type="textarea"
                :maxlength="col.maxlength"
                :rows="col.rows"
                show-word-limit
                :placeholder="col.placeholder"
                v-model="form[col.prop]"
                :disabled="col.disabled"
                style="width: 100%;"
              ></el-input>
              <!-- 下拉框选择 -->
              <el-select
                v-else-if="col.type === 'select'"
                v-model="form[col.prop]"
                :placeholder="col.placeholder"
                :disabled="col.disabled"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in col.options"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
              <!-- 从后台获取数据的封装SelectMenu组件 -->
              <SelectMenu
                v-else-if="col.type === 'selectmenu'"
                :placeholder="col.placeholder"
                @updateSelectData="selectData => { form[col.prop] = selectData.key }"
                :isSearch="col.isSearch"
                :code="col.code"
              ></SelectMenu>
              <!-- 多选框组 -->
              <el-checkbox-group
                v-else-if="col.type === 'checkbox'"
                v-model="form[col.prop]"
                :disabled="col.disabled"
                style="width: 100%;"
              >
                <el-checkbox
                  v-for="item in col.options"
                  :key="item.key"
                  :label="item.value"
                  :name="config.prop"
                ></el-checkbox>
              </el-checkbox-group>
              <!-- 单选框组 -->
              <el-radio-group
                v-else-if="col.type === 'radio'"
                v-model="form[col.prop]"
                :disabled="col.disabled"
                style="width: 100%;"
              >
                <el-radio
                  v-for="item in col.options"
                  :key="item.key"
                  :label="item.key"
                >
                  {{item.value}}
                </el-radio>
              </el-radio-group>
              <!-- 日期 -->
              <el-date-picker
                v-else-if="col.type === 'date'"
                v-model="form[col.prop]"
                type="date"
                :placeholder="col.placeholder"
                value-format="yyyy-MM-dd"
                :disabled="col.disabled"
                style="width: 100%;"
              ></el-date-picker>
              <!-- 日期范围 -->
              <el-date-picker
                v-else-if="col.type === 'daterange'"
                v-model="form[col.prop]"
                type="daterange"
                value-format="yyyy-MM-dd"
                :disabled="col.disabled"
                style="width: 100%;"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
              <!-- 日期时间 -->
              <el-date-picker
                v-else-if="col.type === 'datetime'"
                v-model="form[col.prop]"
                type="datetime"
                :placeholder="col.placeholder"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="col.disabled"
                style="width: 100%;"
              ></el-date-picker>
              <!-- 日期时间范围 -->
              <el-date-picker
                v-else-if="col.type === 'datetimerange'"
                v-model="form[col.prop]"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="col.disabled"
                style="width: 100%;"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              >
              </el-date-picker>
              <!-- 上传多张图片 -->
              <upload-list
                v-else-if="col.type === 'imgList'"
                ref="uploadListRef"
                :imgList.sync="form[col.prop]"
                :keyName="col.prop"
                :uploadLimit="col.uploadLimit"
                :imgListUploaded.sync="imgListUploaded"
              />
              <!-- 上传单张图片 -->
              <upload-img
                v-else-if="col.type === 'img'"
                ref="uploadImgRef"
                :img.sync="form[col.prop]"
              />
              <!-- 上传文件 -->
              <upload-file
                v-else-if="col.type === 'fileList'"
                ref="uploadFileListRef"
                :fileList.sync="form[col.prop]"
                :keyName="col.prop"
                :uploadLimit="col.uploadLimit"
                :fileListUploaded.sync="fileListUploaded"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-form>
</template>

<script>
import SelectMenu from "../components/select-menu.vue";
import UploadList from "../components/upload-list";
import UploadImg from "../components/upload-img";
import UploadFile from "../components/upload-file";
export default {
  name: "zyy-col-form",
  components: {
    UploadList,
    UploadImg,
    UploadFile,
    SelectMenu,
  },
  props: {
    formConfig: {
      required: true,
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isUploaded() {
      return this.imgListUploaded && this.fileListUploaded;
    },
  },
  watch: {
    formConfig: {
      handler(newVal) {
        if (newVal) {
          this.initFormData();
        }
      },
      immediate: true,
      deep: true,
    },
    isUploaded(newVal) {
      if (newVal) {
        this.$parent.$parent.dialogVisible = false;
        this.$parent.$parent.$parent.getTableList &&
          this.$parent.$parent.$parent.getTableList();
        this.$message.success("操作成功");
      }
    },
  },
  data() {
    return {
      labelPosition: "left",
      msgType: {
        textarea: "请输入",
        input: "请输入",
        select: "请选择",
        checkbox: "请选择",
        radio: "请选择",
        imgList: "请上传",
        img: "请上传",
        fileList: "请上传",
        selectmenu: "请选择",
      },
      form: {}, // 表单数据项
      imgListUploaded: false,
      fileListUploaded: false,
    };
  },
  methods: {
    /**
     * 初始化Form表单数据
     */
    initFormData() {
      let formData = {};
      const formItemList = [];
      this.formConfig.forEach((config) => {
        config.columns.forEach((col) => {
          formItemList.push(col);
        });
      });
      formItemList.forEach((item) => {
        // 初始化 form 属性
        if (item.prop && item.value != undefined) {
          formData[item.prop] = item.value;
        }
        // rules 规则
        if (item.required) {
          this.rules(item);
        }
        // 自定义验证规则
        if (item.validator) {
          item.rules = item.validator;
        }
      });
      this.form = formData;
    },
    /**
     * 初始化表单验证规则
     */
    rules(item) {
      // 必填项规则
      const trigger = this.msgType[item.type] === "请输入" ? "blur" : "change";
      const requiredRules = [
        {
          required: true,
          message:
            item.requiredMsg ||
            `${this.msgType[item.type]}${item.label}`.split(":")[0],
          trigger,
        },
      ];
      // 其他的规则
      if (item.rules && item.rules.length > 0) {
        item.rules = requiredRules.concat(item.rules);
      } else {
        item.rules = requiredRules;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.column-form {
  width: 100%;
  .group-box {
    .group-name {
      font-size: 16px;
      font-weight: 700;
      color: #303133;
      padding: 12px 0;
    }
    .group-content {
      padding-left: 16px;
    }
  }
}
</style>