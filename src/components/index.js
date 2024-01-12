import Vue from "vue";
// 添加表单全局组件
import RuleForm from './basic/ruleForm.vue'
import ColForm from './basic/form/col-form.vue'
// 搜索表单全局组件
import Search from './basic/search.vue'
// 表格全局组件
import Table from './basic/table.vue'

// Echart饼图全局组件
import Pie from './chart/pie.vue'
import DatsetBar from './chart/components/dataset-bar.vue'
import DatsetMap from './chart/components/dataset-map.vue'
import DatsetPie from './chart/components/dataset-pie.vue'
import DatsetRank from './chart/components/dataset-rank.vue'
import DatsetSun from './chart/components/dataset-sun.vue'

// 导入数据全局组件
import ImportFile from './import-file/upload-dialog/index.vue'

Vue.component("zyy-form", RuleForm);
Vue.component("zyy-col-form", ColForm);
Vue.component("zyy-search", Search);
Vue.component("zyy-table", Table);
Vue.component("zyy-import-file", ImportFile);
Vue.component("zyy-pie", Pie);
Vue.component("dataset-bar", DatsetBar);
Vue.component("dataset-map", DatsetMap);
Vue.component("dataset-pie", DatsetPie);
Vue.component("dataset-rank", DatsetRank);
Vue.component("dataset-sun", DatsetSun);