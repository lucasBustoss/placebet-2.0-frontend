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
        api.defaults.headers.common['user_id'] = `${user.user_id}`;

      } else {
        delete api.defaults.headers.common['Authorization'];
        delete api.defaults.headers.common['user_id'];
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
