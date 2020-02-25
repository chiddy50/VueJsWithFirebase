<template>
  <div class="container">
    <div class="row mt-4">

      <div v-if="edit" class="col-sm-12 col-md-12 col-lg-12">
        <form>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Edit User</span>
              </div>
              <input type="text" name="name" v-model="$store.state.name" class="form-control" placeholder="Name">
              <input type="number" name="age" v-model="$store.state.age" class="form-control" placeholder="Age">
              <select v-model="$store.state.blood_group" name="cartegory" class="form-control">
                  <option value="" selected>Blood Group</option>
                  <option v-for="(group, index) in blood_groups" :value="group" :key="index">{{ group }}</option>
              </select>
              <div v-if="onlineState" class="input-group-append">
                <button @click.prevent="updateUser" :disabled="getUpdateLoad" class="input-group-text btn btn-success">Edit</button>
              </div>
              <div v-else class="input-group-append">
                <button @click.prevent="updateStorage" :disabled="getUpdateLoad" class="input-group-text btn btn-success">Edit</button>
              </div>
            </div>
        </form>
      </div>
    </div>

    <div v-if="getFetchLoad" class="col-sm-12 col-md-12 col-lg-12 pb-3">
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
                <button v-else class="btn btn-danger" :disabled="getDeleteLoad" @click="removeFromStorage(user.user_id)"> <i class="fas fa-trash"></i></button>
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
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'Users',
  data(){
    return {
      onlineState: false,
      deleteLoading: false
    }
  },
  computed: {
    ...mapState(['isInternetConnected', 'users','edit', 'blood_groups']),
    ...mapGetters(["getIsInternetConnected", "getFetchLoad", "getUpdateLoad", "getDeleteLoad"])
  },

  watch: {
    getIsInternetConnected(){
      this.$store.state.isInternetConnected = this.$store.getters.getIsInternetConnected
    },
    isInternetConnected(result){
      if (!this.$store.state.isInternetConnected) {
        setTimeout(() => {
          Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'You are now offline',
          showConfirmButton: false,
          timer: 1500
        })
        }, 3000);
      }
    }
  },
	created(){
    this.fetchAllUsers()
  },
  mounted(){
    this.onlineState = this.$store.getters.getIsInternetConnected
  },

  methods: {
    ...mapActions(['fetchAllUsers', 'editUser', 'updateUser', 'updateStorage', 'removeFromStorage']),

    deleteUser(id, index){
      this.deleteLoading = true
      if (confirm('Are your sure?')) {
        db.collection('users').where('user_id', '==', id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete()
            this.$store.state.users.splice(index, 1)
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
        .finally(() => this.deleteLoading = false )
      }
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

</style>
