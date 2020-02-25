import { uuid } from 'vue-uuid';
import Swal from 'sweetalert2';
import db from '../components/firebaseInit';

export default{
  fetchAllUsers(state){
    var self = this;
    if (state.isInternetConnected) {
      state.fetchUsersLoading = true;
      db.collection('users').orderBy('blood_group').get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = {
          'id': doc.id,
          'user_id': doc.data().user_id,
          'name': doc.data().name,
          'age': doc.data().age,
          'blood_group': doc.data().blood_group
          };
          state.users.push(data);
        });
        // this.updateAllUsersStorage();

        //Check if no  users
        self.commit('checkError');
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        state.fetchUsersLoading = false;
      });

    }else{
      self.commit('getLocalStorage');
    }
  },

  saveUser(state){
    let self = this;
    if (state.name === null || state.age === null) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please Fill all fields',
        showConfirmButton: false,
        timer: 1500
      });
    }else{
      let user = {
        user_id: uuid.v1(),
        name: state.name,
        age: state.age,
        blood_group: state.blood_group
      };
      if (state.isInternetConnected) {
        let self = this;
        state.createLoading = true;
        db.collection('users').add(user)
        .then(docRef => {
          self.commit('addToStorage', user);

          let obj = {
            id: docRef.id,
            user_id: user.user_id
          };
          self.commit('updateOneUserInStorage', obj);
          //Reset the form
          self.commit('resetForm');
        })
        .catch(err => console.error(err))
        .finally(() => self.createLoading = false );
      }else{
        self.commit('addToStorage', user);
      }
    }

  },

  updateUser(state){
    state.updateLoading = false;
    let self = this;
    db.collection('users').where('user_id', '==', state.user_id).get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.update({
          user_id: state.user_id,
          name: state.name,
          age: state.age,
          blood_group: state.blood_group
        })
        .then(() => {
          self.commit('updateStorage');
        })
        .finally(() => {
          state.updateLoading = true;
          self.commit('resetForm');
        });
      });
    });

  },

  getLocalStorage(state){
    if (localStorage.getItem('users') === null) {
      state.users = [];
    }else{
      state.users = JSON.parse(localStorage.getItem('users'));
    }
  },

  updateStorage(state){
    let users = JSON.parse(localStorage.getItem('users'));

    var user = users.find(user => {
        return user.user_id === state.user_id;
    });
    user.id = state.id;
    user.user_id = state.user_id;
    user.name = state.name;
    user.age = state.age;
    user.blood_group = state.blood_group;
    localStorage.setItem('users', JSON.stringify(users));
    this.commit('resetForm');
    this.commit('getLocalStorage');
  },

  updateAllUsersStorage(state){
    localStorage.setItem('users', JSON.stringify(state.users));
  },

  updateOneUserInStorage(state, payload){
    var user = state.users.find(user => {
      return user.user_id === payload.user_id;
    });
    user.id = payload.id;
    localStorage.setItem('users', JSON.stringify(state.users));
  },

  addToStorage(state, payload){
    state.users.push(payload);
    localStorage.setItem('users', JSON.stringify(state.users));
    this.commit('resetForm');
  },

  editUser(state, payload){
    state.edit = true;
    state.id = payload.id;
    state.user_id = payload.user_id;
    state.name = payload.name;
    state.age = payload.age;
    state.blood_group = payload.blood_group;
  },

  removeFromStorage(state, payload){
    if (confirm('Are your sure?')) {
      let users = JSON.parse(localStorage.getItem('users'));
      const userExists = users.some(user => user.user_id === payload);
        state.deleteLoading = true;
        var unwantedUser = state.users.find(user => {
          return user.user_id === payload;
        });
        state.users = state.users.filter(user => user.user_id !== unwantedUser.user_id );
        localStorage.setItem('users', JSON.stringify(state.users));
        state.deleteLoading = false;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User has been removed',
          showConfirmButton: false,
          timer: 1500
        });
    }
  },

  resetForm(state){
    state.edit = false;
    state.id = null;
    state.user_id = null;
    state.name = null;
    state.age = null;
    state.blood_group = null;
  },

  checkError(state){
    if (state.users.length < 1) {
      let error = document.getElementById('no-users');
      error.style.display = 'block';
    }
  },

  setConnection(state, payload){
    state.isInternetConnected = payload;
  }
};
