const state = {
  PROJECT_LAYOUT: {
    menu: "fixed",
    header: "fixed"
  },
  MENU_TOGGLE: false
};

const getters = {
  projectLayout: state => state.PROJECT_LAYOUT,
  projectLayoutHeader: state => {
    const { header = "fixed" } = state.PROJECT_LAYOUT;
    return header;
  },
  projectLayoutMenu: state => {
    const { menu = "fixed" } = state.PROJECT_LAYOUT;
    return menu;
  },
  menuToggle: state => state.MENU_TOGGLE
};

const actions = {
  updateProjectLayout: ({ commit }, data) => {
    commit("UPDATE_PROJECT_LAYOUT", data);
  },
  changeMenuToggle: ({ commit }, data) => {
    commit("CHANGE_MENU_TOGGLE", data);
  }
};

const mutations = {
  UPDATE_PROJECT_LAYOUT(state, data) {
    state.PROJECT_LAYOUT = { ...state.PROJECT_LAYOUT, ...data };
  },
  CHANGE_MENU_TOGGLE(state, data = !state.MENU_TOGGLE) {
    state.MENU_TOGGLE = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
