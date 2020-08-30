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
// 公共样式
import "@/assets/styles/index.scss";
import Components from "@/components";
Vue.config.productionTip = false;
Vue.use(MelodyUI, {
  size: "medium"
}).use(Components);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
