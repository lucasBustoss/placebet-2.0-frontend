import Vue from 'vue';
import Vuex from 'vuex';

import api from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;

      if (user) {
        api.defaults.headers.common['Authorization'] = `${user.token}`;
        0
      } else {
        delete api.defaults.headers.common['Authorization'];
        state.isMenuVisible = false;
      }
    },
  },
  actions: {
    async setUser({ commit }, payload) {
      // commit('results/loadFavoriteMatches', response.data.favorites, { root: true })
      commit('setUser', payload)
    }
  }
});
