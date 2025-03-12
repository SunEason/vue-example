import * as Vue from "vue";

// 注册 v-loading 指令
const loadingDirective: Vue.Directive = {
  // 当绑定元素插入到 DOM 中时调用
  mounted(el, binding) {
    // 创建一个遮罩层
    const mask = document.createElement("div");
    mask.className = "v-loading-mask";
    mask.style.position = "absolute";
    mask.style.top = "0";
    mask.style.left = "0";
    mask.style.width = "100%";
    mask.style.height = "100%";
    mask.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    mask.style.display = "flex";
    mask.style.alignItems = "center";
    mask.style.justifyContent = "center";
    mask.style.zIndex = "9999";

    // 创建加载动画
    const spinner = document.createElement("div");
    spinner.className = "v-loading-spinner";
    spinner.style.border = "4px solid #f3f3f3";
    spinner.style.borderTop = "4px solid #3498db";
    spinner.style.borderRadius = "50%";
    spinner.style.width = "40px";
    spinner.style.height = "40px";
    spinner.style.animation = "spin 1s linear infinite";

    // 将加载动画添加到遮罩层
    mask.appendChild(spinner);

    // 将遮罩层保存到元素的自定义属性中
    el.loadingMask = mask;

    // 根据初始值设置加载状态
    if (binding.value) {
      el.appendChild(mask);
    }
  },

  // 当绑定值更新时调用
  updated(el, binding) {
    if (binding.value) {
      // 如果值为 true，显示遮罩层
      if (!el.contains(el.loadingMask)) {
        el.appendChild(el.loadingMask);
      }
    } else {
      // 如果值为 false，移除遮罩层
      if (el.contains(el.loadingMask)) {
        el.removeChild(el.loadingMask);
      }
    }
  },

  // 当绑定元素从 DOM 中移除时调用
  beforeUnmount(el) {
    if (el.contains(el.loadingMask)) {
      el.removeChild(el.loadingMask);
    }
  },
};

function install(app: Vue.App, _options?: any) {
  // 定义动画样式
  const style = document.createElement("style");
  style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
  document.head.appendChild(style);

  app.directive("loading", loadingDirective);
}

export default {
  install,
};
