import Layout from "./src/main";

Layout.install = function(Vue) {
  Vue.component(Layout.name, Layout);
};

export default Layout;
