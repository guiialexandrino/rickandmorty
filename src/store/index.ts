import type { Card } from '@/types/Cards';
import { createStore } from 'vuex';

export default createStore({
  state: {
    loading: false,
    loadingProcess: 0,
    loadingShowProcess: true,
    characters: [] as Card[],
    charactersBackup: [] as Card[],
    actualPage: 1,
    sortValue: false,
    search: false,
    searchCard: [] as Card[],
  },
  getters: {},
  mutations: {
    UPDATE_LOADING(state, payload: boolean) {
      state.loading = payload;
    },
    UPDATE_LOADINGPROCESS(state, payload: number) {
      state.loadingProcess = payload;
    },
    UPDATE_LOADINGSHOW(state, payload: boolean) {
      state.loadingShowProcess = payload;
    },
    UPDATE_CHARS(state, payload: Card[]) {
      state.characters = payload;
    },
    UPDATE_CHARSBACKUP(state, payload: Card[]) {
      state.charactersBackup = payload;
    },
    UPDATE_ACTUALPAGE(state, payload: number) {
      state.actualPage = payload;
    },
    UPDATE_SORTVALUE(state, payload: boolean) {
      state.sortValue = payload;
    },
    UPDATE_SEARCH(state, payload: boolean) {
      state.search = payload;
    },
    UPDATE_SEARCHCARD(state, payload: Card[]) {
      state.searchCard = payload;
    },
  },
  actions: {
    loadingInit(context) {
      context.commit('UPDATE_LOADING', true);
    },

    loadingDone(context) {
      context.commit('UPDATE_LOADING', false);
    },

    updateLoadingProcess(context, payload: number) {
      context.commit('UPDATE_LOADINGPROCESS', payload);
    },

    updateLoadingShowProcess(context, payload: boolean) {
      context.commit('UPDATE_LOADINGSHOW', payload);
    },

    updateChars(context, payload: Card[]) {
      context.commit('UPDATE_CHARS', payload);
    },

    updateCharsBackup(context, payload: Card[]) {
      context.commit('UPDATE_CHARSBACKUP', payload);
    },

    updateSearch(context, payload: boolean) {
      context.commit('UPDATE_SEARCH', payload);
    },

    updateSearchCard(context, payload: Card[]) {
      context.commit('UPDATE_SEARCHCARD', payload);
    },

    updateActualPage(context, payload: number) {
      context.commit('UPDATE_ACTUALPAGE', payload);
    },

    updateSortPage(context, payload: boolean) {
      context.commit('UPDATE_SORTVALUE', payload);
    },
  },
  modules: {},
});
