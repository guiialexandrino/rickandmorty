import { createStore } from 'vuex';

export default createStore({
  state: {
    exemplo: false,
  },
  getters: {},
  mutations: {
    UPDATE_EXEMPLO(state, payload) {
      state.exemplo = payload;
    },
  },
  actions: {
    exemploChange(context, payload) {
      context.commit('UPDATE_EXEMPLO', payload);
    },
  },
  modules: {},
});
