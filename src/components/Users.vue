<template>
  <div class="container">
    <div class="row mt-4">

      <div v-if="edit" class="col-sm-12 col-md-12 col-lg-12">
        <form>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Edit User</span>
              </div>
              <input type="text" name="name" v-model="name" class="form-control" placeholder="Name">
              <input type="number" name="age" v-model="age" class="form-control" placeholder="Age">
              <select v-model="blood_group" name="cartegory" class="form-control">
                  <option value="" selected>Blood Group</option>
                  <option v-for="(group, index) in blood_groups" :value="group" :key="index">{{ group }}</option>
              </select>
              <div v-if="onlineState" class="input-group-append">
                <button @click.prevent="updateUser" :disabled="updateLoading" class="input-group-text btn btn-success">Edit</button>
              </div>
              <div v-else class="input-group-append">
                <button @click.prevent="updateStorage" :disabled="updateLoading" class="input-group-text btn btn-success">Edit Offline</button>
              </div>
            </div>
        </form>
      </div>
    </div>

    <div v-if="fetchUsersLoading" class="col-sm-12 col-md-12 col-lg-12 pb-3">
      <h5 class="text-center">Loading Users...</h5>
    </div>

    <div class='row'>
      <div class="col-sm-12">
        <table class="table table-dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Blood Group</th>
              <th colspan="2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.user_id">
              <td>{{ user.name }}</td>
              <td>{{ user.age }}</td>
              <td>{{ user.blood_group }}</td>
              <td>
                <button v-if="onlineState" :disabled="deleteLoading" class="btn btn-danger" @click="deleteUser(user.user_id, index)"> <i class="fas fa-trash"></i></button>
                <button v-else class="btn btn-danger" :disabled="deleteLoading" @click="removeFromStorage(user.user_id)">Delete <i class="fas fa-trash"></i></button>
              </td>
              <td>
                <button class="btn btn-primary" @click="editUser(user)"> <i class="fas fa-pencil-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>


        <div class="center-div" id="no-users">
          <h4 class="text-center">No Users</h4>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'

export default {
  name: 'Users',
  data(){
    return {
      id: null,
      user_id: null,
      name: null,
      age: null,
      blood_group: null,
      edit: false,
      editLoading: false,
      deleteLoading: false,
      updateLoading: false,
      fetchUsersLoading: false,
      onlineState: false,
      users: [],
      blood_groups: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    }
  },
  watch: {
    getIsInternetConnected(){
      this.onlineState = this.getIsInternetConnected
    },
    onlineState: function(result){
      if (!this.onlineState) {
        setTimeout(() => {
          Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'You are now offline',
          showConfirmButton: false,
          timer: 1500
        })
        }, 1000);
      }
    }
  },
	created(){
    this.fetchAllUsers()
  },
  mounted(){
    this.onlineState = this.getIsInternetConnected
  },
  computed: {
    ...mapGetters(["getIsInternetConnected"])
  },

  methods: {
    editUser(user){
      this.edit = true
      this.id = user.id
      this.user_id = user.user_id
      this.name = user.name
      this.age = user.age
      this.blood_group = user.blood_group
    },
    fetchAllUsers(){
      if (this.$store.state.isInternetConnected) {
        this.fetchUsersLoading = true
        let self = this;
        db.collection('users').orderBy('blood_group').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
            'id': doc.id,
            'user_id': doc.data().user_id,
            'name': doc.data().name,
            'age': doc.data().age,
            'blood_group': doc.data().blood_group
            }
            self.users.push(data)
          })
          self.updateAllUsersStorage()

        })
        .catch(err => console.error(err))
        .finally(() => {
          this.fetchUsersLoading = false
          // this.checkIfOnline()
          this.checkError()
        })
      }else{
        this.getLocalStorage()
      }
    },
    deleteUser(id, index){
      this.deleteLoading = true
      if (confirm('Are your sure?')) {
        db.collection('users').where('user_id', '==', id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete()
            this.users.splice(index, 1)
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'User has been deleted',
              showConfirmButton: false,
              timer: 1500
            })
          })
        })
        .catch(err => console.error(err) )
        .finally(() => {
          this.deleteLoading = false

        })
      }
    },
    updateUser(){
      this.updateLoading = false
      let self = this;
      db.collection('users').where('user_id', '==', this.user_id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            user_id: this.user_id,
            name: this.name,
            age: this.age,
            blood_group: this.blood_group
          })
          .then(() => {
            self.updateStorage()
          })
          .finally(() => this.updateLoading = true )
        })
      })
    },

    getLocalStorage(){
      this.fetchUsersLoading = true
      if (localStorage.getItem('users') === null) {
        this.users = [];
        // this.$store.state.all_users = [];
        this.fetchUsersLoading = false
      }else{
        this.users = JSON.parse(localStorage.getItem('users'));
        // this.$store.state.all_users = JSON.parse(localStorage.getItem('users'));
        this.fetchUsersLoading = false
      }
      this.fetchUsersLoading = false
    },

    updateStorage(){
      let users = JSON.parse(localStorage.getItem('users'));

      var user = users.find(user => {
          return user.user_id === this.user_id;
      });
      user.id = this.id;
      user.user_id = this.user_id;
      user.name = this.name;
      user.blood_group = this.blood_group;
      localStorage.setItem('users', JSON.stringify(users));
    },

    updateAllUsersStorage(){
      localStorage.setItem('users', JSON.stringify(this.users));
    },

    removeFromStorage(id){
      if (confirm('Are your sure?')) {
        if(this.checkifUserExist(id)){
          this.deleteLoading = true
          var unwantedUser = this.users.find(user => {
            return user.user_id === id
          });
          this.users = this.users.filter(user => user.user_id !== unwantedUser.user_id );
          localStorage.setItem('users', JSON.stringify(this.users));
          this.deleteLoading = false
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User has been removed from storage',
            showConfirmButton: false,
            timer: 2000
          })
        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'This user does not exist',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    },

    checkError(){
      if (this.users.length < 1) {
        let error = document.getElementById('no-users')
        error.style.display = 'block';
      }
    },

    checkifUserExist(id){
      let users = JSON.parse(localStorage.getItem('users'));
      const found = users.some(user => user.user_id === id);
      return found
    }

  }
}
</script>

<style scoped>
body{
  overflow-x: hidden;
}
.center-div{
  display: flex;
  align-items: center;
  justify-content: center;
}

#no-users{
  display: none
}


.red{
  background: #ff3434;
  height: 400px;
}

.blue{
  background: #3434ff;
  height: 400px;
}
</style>
