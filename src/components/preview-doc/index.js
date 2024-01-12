import Vue from "vue";
import PreviewDoc from './index.vue';

export let index = 1000;

export const cache = new Set();

export function openDialog (component) {
  const div = document.createElement("div");
  const el = document.createElement("div");

  const id = 'dialog-' + Math.random();

  div.appendChild(el);
  document.body.appendChild(div);

  const ComponentConstructor = Vue.extend(component);
  return (propsData = {}, parent = undefined) => {
    let instance = new ComponentConstructor({
      propsData,
      parent,
    }).$mount(el);

    const destroyDialog = () => {
      if (cache.has(id)) return;
      if (instance && div.parentNode) {
        cache.add(id);
        instance.visible = false;
        // 延时是为了在关闭动画执行完毕后卸载组件
        setTimeout(() => {
          cache.delete(id);
          instance.$destroy();
          // @ts-ignore
          instance = null;
          div.parentNode && div.parentNode.removeChild(div);
        }, 1000);
      }
    };

    // visible控制
    if (instance.visible !== undefined) {
      // 支持sync/v-model
      instance.$watch("visible", (val) => {
        !val && destroyDialog();
      });
      Vue.nextTick(() => (instance.visible = true));
    }

    return new Promise((resolve, reject) => {
      // emit 一个 done 事件关闭
      instance.$once("done", (data) => {
        destroyDialog();
        resolve(data);
      });
      // emit 一个 cancel 事件取消
      instance.$once("cancel", (data) => {
        destroyDialog();
        reject(data);
      });
    });
  };
}

export function previewDialog (fileParams) {
  return openDialog(PreviewDoc)({ fileParams });
}
