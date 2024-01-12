import Vue from "vue";
import store from "@/store";

/**
 * 注册全局校验权限按钮的指令
 * v-auth="['pageName.btn.btnName']"
 * pageName 页面名称 btnName 按钮名称
 */
Vue.directive("auth", {
  bind(el, binding) {
    const { value } = binding
    const currentPageButtons = (store.getters && store.getters.buttons) || []
    if (value instanceof Array && value.length) {
      const hasPermission = value.every((item) =>
        currentPageButtons.includes(item)
      )
      if (!hasPermission) {
        el.style.display = "none";
      }
    } else {
      if (!currentPageButtons.includes(value)) {
        el.style.display = "none";
      }
    }
  }
});

/**
 * 注册全局输入整数和小数的指令
 * v-input-number
 */
Vue.directive('inputNumber', {
  bind(el) {
    el.oninput = () => {
      el.children[0].value = el.children[0].value.replace(/[^\d.]/g, '')
    }
  }
})