import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {userModule} from '../../user-component/service/user-vuex';


const contentModule = {
  strict: false,
  namespaced: true,
  state: {
    drawer:true
  },
  mutations: {
    toggleDrawer: function(state) {
      state.drawer = state.drawer?false:true;
    }
  },
  actions: {
    toggleDrawer: function(context) {
      context.commit('toggleDrawer');
    }
  },
  getters: {
    drawer: function(state) {
      return state.drawer;
    }
  }
}

export const contentStore = new Vuex.Store({
  modules: {
    content:contentModule,
    user:userModule
  }
});