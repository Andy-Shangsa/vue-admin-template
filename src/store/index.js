import Vue from "vue";
import Vuex from "vuex";
import { initProjectPlugin } from "./plugins";
import { layout } from "@/project.config.js";
import Project from "./modules/project";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Project
  },
  plugins: [initProjectPlugin({ layout })]
});
