export default {
  getIsInternetConnected: state => {
    return state.isInternetConnected;
  },
  getUsers(state){
    return state.users;
  },
  getFetchLoad(state){
    return state.fetchUsersLoading;
  },
  getCreateLoad(state){
    return state.createLoading;
  },
  getUpdateLoad(state){
    return state.updateLoading;
  },
  getDeleteLoad(state){
    return state.deleteLoading;
  },
};
