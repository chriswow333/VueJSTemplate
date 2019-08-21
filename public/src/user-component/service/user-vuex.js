import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export const userModule = {
  strict: false,
  namespaced: true,
  state: {
    signin:false
  },
  mutations: {
    changeSignin: function(state, payload) {
      state.signin = payload.signin;
    }
  },
  actions: {
    changeSignin: function(context,payload) {
      context.commit('changeSignin',payload);
    }
  },
  getters: {
    signin: function(state) {
      return state.signin;
    }
  }
}
