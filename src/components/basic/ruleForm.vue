<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    class="ruleForm"
    :label-position="labelPosition"
  >
    <el-form-item
      v-for="config in formConfig"
      :key="config.prop"
      :label="config.label"
      :label-width="config.labelWidth"
      :prop="config.prop"
      :rules="config.rules"
    >
      <!-- 输入框 -->
      <el-input
        v-if="config.type === 'input'"
        v-model="form[config.prop]"
        :maxlength="config.maxlength"
        show-word-limit
        :placeholder="config.placeholder"
        :size="size"
        :disabled="disabled"
        style="width: 100%;"
      ></el-input>
      <!-- 文本域 -->
      <el-input
        v-else-if="config.type === 'textarea'"
        type="textarea"
        :maxlength="config.maxlength"
        :rows="config.rows"
        show-word-limit
        :placeholder="config.placeholder"
        v-model="form[config.prop]"
        :size="size"
        :disabled="disabled"
        style="width: 100%;"
      ></el-input>
      <!-- 下拉框选择 -->
      <el-select
        v-else-if="config.type === 'select'"
        v-model="form[config.prop]"
        :placeholder="config.placeholder"
        :size="size"
        :disabled="disabled"
        style="width: 100%;"
      >
        <el-option
          v-for="item in config.options"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        ></el-option>
      </el-select>
      <!-- 从后台获取数据的封装SelectMenu组件 -->
      <SelectMenu
        v-else-if="config.type === 'selectmenu'"
        :placeholder="config.placeholder"
        @updateSelectData="selectData => { form[config.prop] = selectData.key }"
        :isSearch="config.isSearch"
        :code="config.code"
      ></SelectMenu>
      <!-- 多选框组 -->
      <el-checkbox-group
        v-else-if="config.type === 'checkbox'"
        v-model="form[config.prop]"
        :size="size"
        :disabled="disabled"
        style="width: 100%;"
      >
        <el-checkbox
          v-for="item in config.options"
          :key="item.key"
          :label="item.value"
          :name="config.prop"
        ></el-checkbox>
      </el-checkbox-group>
      <!-- 单选框组 -->
      <el-radio-group
        v-else-if="config.type === 'radio'"
        v-model="form[config.prop]"
        :size="size"
        :disabled="disabled"
        style="width: 100%;"
      >
        <el-radio
          v-for="item in config.options"
          :key="item.key"
          :label="item.key"
        >
          {{item.value}}
        </el-radio>
      </el-radio-group>
      <!-- 日期 -->
      <el-date-picker
        v-else-if="config.type === 'date'"
        v-model="form[config.prop]"
        type="date"
        :size="size"
        :placeholder="config.placeholder"
        :disabled="disabled"
        value-format="yyyy-MM-dd"
        style="width: 100%;"
      ></el-date-picker>
      <!-- 日期范围 -->
      <el-date-picker
        v-else-if="config.type === 'daterange'"
        v-model="form[config.prop]"
        type="daterange"
        :size="size"
        :disabled="disabled"
        value-format="yyyy-MM-dd"
        style="width: 100%;"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <!-- 日期时间 -->
      <el-date-picker
        v-else-if="config.type === 'datetime'"
        v-model="form[config.prop]"
        type="datetime"
        :size="size"
        :placeholder="config.placeholder"
        :disabled="disabled"
        value-format="yyyy-MM-dd HH:mm:ss"
        style="width: 100%;"
      ></el-date-picker>
      <!-- 日期时间范围 -->
      <el-date-picker
        v-else-if="config.type === 'datetimerange'"
        v-model="form[config.prop]"
        type="datetimerange"
        :size="size"
        :disabled="disabled"
        value-format="yyyy-MM-dd HH:mm:ss"
        style="width: 100%;"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      >
      </el-date-picker>
      <!-- 上传多张图片 -->
      <upload-list
        v-else-if="config.type === 'imgList'"
        ref="uploadListRef"
        :imgList.sync="form[config.prop]"
        :keyName="config.prop"
        :uploadLimit="config.uploadLimit"
        :imgListUploaded.sync="imgListUploaded"
      />
      <!-- 上传单张图片 -->
      <upload-img
        v-else-if="config.type === 'img'"
        ref="uploadImgRef"
        :img.sync="form[config.prop]"
      />
      <!-- 上传文件 -->
      <upload-file
        v-else-if="config.type === 'fileList'"
        ref="uploadFileListRef"
        :fileList.sync="form[config.prop]"
        :keyName="config.prop"
        :uploadLimit="config.uploadLimit"
        :fileListUploaded.sync="fileListUploaded"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import SelectMenu from "./components/select-menu.vue";
import UploadList from "./components/upload-list";
import UploadImg from "./components/upload-img";
import UploadFile from "./components/upload-file";
export default {
  name: "zyy-form",
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
  data() {
    return {
      labelPosition: "right",
      size: "small",
      disabled: false,
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
  methods: {
    /**
     * 初始化Form表单数据
     */
    initFormData() {
      let formData = {};
      this.formConfig.forEach((item) => {
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
.ruleForm {
  padding: 0 5px;
}
</style>