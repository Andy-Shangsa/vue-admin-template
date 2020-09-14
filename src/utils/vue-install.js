/**
 * @description vue全局挂载
 */
const componentsContext = require.context("@c/packages", true, /index.js$/);

const install = function(Vue, opts = {}) {
  componentsContext.keys().forEach(item => {
    const instance = componentsContext(item).default;
    Vue.component(instance.name, instance);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default install;
