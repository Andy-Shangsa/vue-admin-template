import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 处理同一路由下重复点击
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// 异步加载模块
const modulesContext = require.context("./modules", false, /\.js$/);
let ModuleRoutes = [];
modulesContext.keys().forEach(item => {
  ModuleRoutes = [...ModuleRoutes, ...modulesContext(item).default];
});

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "router-layout" */ "@/views/layout/index"),
      children: [
        {
          path: "/table",
          name: "Table",
          component: () =>
          import(/* webpackChunkName: "router-layout" */ "@/views/table-demo")
        }
      ]
  },
  ...ModuleRoutes
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.afterEach(to => {
  console.log(to);
});

export default router;
