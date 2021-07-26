import Vue from 'vue';
import Vuex from 'vuex';

import api from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    betsToImport: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;

      if (user) {
        api.defaults.headers.common['Authorization'] = `${user.token}`;
        api.defaults.headers.common['AppKey'] = `${user.appKey}`;
        api.defaults.headers.common['user_id'] = `${user.user_id}`;
      } else {
        delete api.defaults.headers.common['Authorization'];
        delete api.defaults.headers.common['AppKey'];
        delete api.defaults.headers.common['user_id'];
        state.isMenuVisible = false;
      }
    },
    setBetsToImport(state, bets) {
      state.betsToImport = bets;
    },
  },
  actions: {
    async setUser({ commit }, payload) {
      commit('setUser', payload)
    }
  }
});
