import { createStore } from 'vuex';

export default createStore({
  state: {
    loading: false,
    loadingProcess: 0,
    loadingShowProcess: true,
    actualPage: 1,
  },
  getters: {},
  mutations: {
    UPDATE_LOADING(state, payload) {
      state.loading = payload;
    },
    UPDATE_LOADINGPROCESS(state, payload) {
      state.loadingProcess = payload;
    },
    UPDATE_LOADINGSHOW(state, payload) {
      state.loadingShowProcess = payload;
    },
    UPDATE_ACTUALPAGE(state, payload) {
      state.actualPage = payload;
    },
  },
  actions: {
    loadingInit(context) {
      context.commit('UPDATE_LOADING', true);
    },

    updateLoadingProcess(context, payload) {
      context.commit('UPDATE_LOADINGPROCESS', payload);
    },

    loadingDone(context) {
      context.commit('UPDATE_LOADING', false);
    },

    updateLoadingShowProcess(context, payload) {
      context.commit('UPDATE_LOADINGSHOW', payload);
    },

    updateActualPage(context, payload) {
      context.commit('UPDATE_ACTUALPAGE', payload);
    },
  },
  modules: {},
});
