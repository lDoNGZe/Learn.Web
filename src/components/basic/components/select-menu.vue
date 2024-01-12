<template>
  <el-select
    class="select-container"
    v-model="selectedKey"
    :placeholder="placeholder"
    :disabled="disabled"
    style="width: 100%"
  >
    <el-option
      v-for="option in options"
      :key="option.key"
      :label="option.value"
      :value="option.key"
    ></el-option>
  </el-select>
</template>

<script>
import { getDictionaryItems } from "@/api/select";
export default {
  props: {
    parentKey: {
      type: Number | String,
    },
    disabled: {
      type: Boolean,
    },
    placeholder: {
      type: String,
    },
    isSearch: {
      type: Boolean,
      default: true,
    },
    code: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      options: [],
      selectedKey: "",
    };
  },
  watch: {
    parentKey: {
      immediate: true,
      handler(val) {
        this.selectedKey = val;
      },
    },
    selectedKey: {
      immediate: true,
      handler(val) {
        const findObj = this.options.find((item) => item.key == val);
        const findLabel = findObj ? findObj.value : "";
        const selectData = {
          key: val,
          value: findLabel,
        };
        this.$emit("updateSelectData", selectData);
      },
    },
  },
  async created() {
    const { code, result } = await getDictionaryItems({
      dictionaryCode: this.code,
    });
    if (code === 200) {
      if (this.isSearch) {
        this.options = [{ key: -1, value: "全部" }].concat(result);
      } else {
        this.options = result;
      }
    } else {
      this.options = [];
    }
  },
};
</script>