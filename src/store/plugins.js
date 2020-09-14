export const initProjectPlugin = ({ layout }) => {
  return function(store) {
    store.dispatch("updateProjectLayout", layout);
  };
};
