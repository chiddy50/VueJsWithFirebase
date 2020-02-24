import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export const store = new Vuex.Store({
    state:{
      isInternetConnected: false,
    },
    getters:{
      getIsInternetConnected: state => {
        return state.isInternetConnected;
      },
      getUsers(state){
        return state.users;
      }
    },
    mutations:{},
    actions:{}
});
