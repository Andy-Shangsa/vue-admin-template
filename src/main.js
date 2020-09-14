import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 兼容ES6+
import "core-js/stable";
import "regenerator-runtime/runtime";
// 加载 UI 组件
import MelodyUI from "melody-ui";
import "melody-ui/lib/theme-chalk/index.css";
// 挂载
import Components from "@u/vue-install";

Vue.use(MelodyUI, {
  size: "medium"
}).use(Components);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
