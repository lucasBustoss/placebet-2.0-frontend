import Vue from 'vue';
import Vuex from 'vuex';

import api from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    betsToImport: [],
    currency: 'brl',
    money: 1,
    defaultVisibility: 0
  },
  getters: {
    moneySymbol(state) {
      return state.currency === "brl"
        ? "R$"
        : state.currency === "eur"
          ? "€"
          : "$";
    },
    decimalType(state) {
      return state.money;
    },
  },
  mutations: {
    setHeaders(state, info) {
      if (info) {
        api.defaults.headers.common['Authorization'] = `${info.token}`;
        api.defaults.headers.common['AppKey'] = `${info.appKey}`;
      } else {
        delete api.defaults.headers.common['Authorization'];
        delete api.defaults.headers.common['AppKey'];
        state.isMenuVisible = false;
      }
    },
    setUser(state, user) {
      state.user = user;

      if (user) {
        state.currency = user.currencyType;
        state.money = user.moneyType;
        state.defaultVisibility = user.visibility;

        api.defaults.headers.common['user_id'] = `${user.id}`;
      } else {
        delete api.defaults.headers.common['user_id'];
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
