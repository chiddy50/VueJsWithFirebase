export default {
  getIsInternetConnected(state){
    return state.isInternetConnected;
  },
  getUsers(state){
    return state.users;
  },
  getpaginationUsers(state){
    return state.paginationUsers;
  },
  disablePage26_50(state){
    return state.users.length >= 26 ? false : true;
  },
  disablePage51_75(state){
    return state.users.length >= 51 ? false : true;
  },
  disablePage75_100(state){
    return state.users.length >= 76 ? false : true;
  },
};
