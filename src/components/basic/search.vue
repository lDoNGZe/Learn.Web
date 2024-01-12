<template>
  <div class="top-search-box">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
    >
      <el-form-item
        v-for="config in formConfig"
        :key="config.prop"
        :label="config.type != 'keyword' ? config.label : ''"
        :prop="config.prop"
      >
        <!-- 文本输入 -->
        <el-input
          v-if="config.type === 'input'"
          v-model="form[config.prop]"
          :placeholder="config.placeholder"
        ></el-input>
        <!-- 日期时间 -->
        <el-date-picker
          v-else-if="config.type === 'datetime'"
          v-model="form[config.prop]"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          :placeholder="config.placeholder"
        ></el-date-picker>
        <!-- 日期时间范围 -->
        <el-date-picker
          v-else-if="config.type === 'datetimerange'"
          v-model="form[config.prop]"
          type="datetimerange"
          :placeholder="config.placeholder"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
        <!-- 日期范围 -->
        <el-date-picker
          v-else-if="config.type === 'daterange'"
          v-model="form[config.prop]"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <!-- 日期 -->
        <el-date-picker
          v-else-if="config.type === 'date'"
          v-model="form[config.prop]"
          type="date"
          value-format="yyyy-MM-dd"
          :placeholder="config.placeholder"
        ></el-date-picker>
        <!-- 下拉选择 -->
        <el-select
          v-else-if="config.type === 'select'"
          v-model="form[config.prop]"
          :placeholder="config.placeholder"
        >
          <el-option
            v-for="item in config.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 下拉选择输入（关键字查询） -->
        <el-input
          v-else-if="config.type === 'keyword'"
          placeholder="请输入关键字"
          v-model="form[config.prop]"
          class="input-with-select"
        >
          <el-select
            v-model="config.selectVal"
            slot="prepend"
            placeholder="请选择"
            :style="{'width': config.selectWidth }"
            @change="selectValChange"
          >
            <el-option
              v-for="option in config.options"
              :key="option.key"
              :label="option.value"
              :value="option.key"
            ></el-option>
          </el-select>
        </el-input>
        <!-- 从后台获取数据的封装SelectMenu组件 -->
        <SelectMenu
          v-else-if="config.type === 'selectmenu'"
          :parentKey.sync="form[config.prop]"
          :placeholder="config.placeholder"
          @updateSelectData="selectData => { form[config.prop] = selectData.key }"
          :code="config.code"
        ></SelectMenu>
      </el-form-item>
      <!-- 按钮区域 -->
      <el-form-item v-if="showBtn">
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="search"
        >查询</el-button>
        <el-button
          icon="el-icon-refresh-left"
          @click="reset"
        >重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SelectMenu from "./components/select-menu.vue";
export default {
  name: "zyy-search",
  components: { SelectMenu },
  data() {
    return {
      form: {}, // 表单数据项
      otherKeyword: {},
    };
  },
  props: {
    formConfig: {
      required: true,
      type: Array,
      default: () => [],
    },
    showBtn: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    formConfig: {
      immediate: true, // 第一次进入组件就执行
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.initFormData();
        }
      },
    },
  },
  methods: {
    // 初始化一般搜索条件
    initFormData() {
      const formData = {};
      this.formConfig.forEach((item) => {
        // ? 初始化 form 属性
        if (item.prop) {
          formData[item.prop] = item.value;
        }
      });
      this.form = Object.assign({}, formData);
      this.initKeyword();
    },
    // 初始化动态关键字搜索条件
    initKeyword() {
      const req = {};
      const findConfig = this.formConfig.find(
        (config) => config.type === "keyword"
      );
      if (findConfig) {
        const findOption = findConfig.options.find(
          (option) => option.key === findConfig.selectVal
        );
        findOption && (req[findOption.prop] = this.form[findConfig.prop] || "");
        findOption && delete req[findConfig.prop];
      }
      this.otherKeyword = req;
    },
    // 搜索查询
    search() {
      this.$parent.getTableList();
    },
    // 重置搜索
    reset() {
      const findConfig = this.formConfig.find(
        (config) => config.type === "keyword"
      );
      findConfig && (findConfig.selectVal = 1);
      this.$refs["formRef"].resetFields();
    },
    // 当关键词查询下拉菜单发生改变时
    selectValChange() {
      this.form.keyword = "";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

