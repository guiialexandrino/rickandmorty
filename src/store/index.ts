import { createStore } from 'vuex';

export default createStore({
  state: {
    actualPage: 1,
  },
  getters: {},
  mutations: {
    UPDATE_ACTUALPAGE(state, payload) {
      state.actualPage = payload;
    },
  },
  actions: {
    updateActualPage(context, payload) {
      context.commit('UPDATE_ACTUALPAGE', payload);
    },
  },
  modules: {},
});
