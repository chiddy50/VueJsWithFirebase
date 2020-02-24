export default{
  fetchAllUsers: function(context){
    context.commit('fetchAllUsers');
  },
  getLocalStorage: function(context){
    context.commit('getLocalStorage');
  },
  saveUser: function(context){
    context.commit('saveUser');
  },
  updateAllUsersStorage: function(context){
    context.commit('updateAllUsersStorage');
  },
  updateOneUserInStorage: function(context, payload){
    context.commit('updateOneUserInStorage', payload);
  },
  addToStorage: function(context, payload){
    context.commit('addToStorage', payload);
  },
  editUser: function(context, payload){
    context.commit('editUser', payload);
  },
  checkError: function(context, payload){
    context.commit('checkError', payload);
  },
  updateUser: function(context, payload){
    context.commit('updateUser', payload);
  },
  updateStorage: function(context, payload){
    context.commit('updateStorage', payload);
  },
  removeFromStorage: function(context, payload){
    context.commit('removeFromStorage', payload);
  },

  resetForm: function(context){
    context.commit('resetForm');
  }
};
