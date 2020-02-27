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
              <div v-if="$store.state.isInternetConnected" class="input-group-append">
                <button @click.prevent="updateUser" :disabled="$store.state.updateLoading" class="input-group-text btn btn-success">Edit</button>
              </div>
              <div v-else class="input-group-append">
                <button @click.prevent="updateStorage" :disabled="$store.state.updateLoading" class="input-group-text btn btn-success">Edit</button>
              </div>
            </div>
        </form>
      </div>
    </div>

    <div v-if="$store.state.fetchUsersLoading" class="col-sm-12 col-md-12 col-lg-12 pb-3">
      <h5 class="text-center">Loading Users...</h5>
    </div>

    <div class="btn-group mb-3">
      <button class="btn btn-success" @click="page1_25">Users 1-25</button>
      <button v-if="!$store.getters.disablePage26_50" class="btn btn-danger" @click="page26_50">Users 26-50</button>
      <button v-if="!$store.getters.disablePage51_75" class="btn btn-warning" @click="page51_75">Users 51-75</button>
      <button v-if="!$store.getters.disablePage75_100" class="btn btn-primary" @click="page76_100">Users 76-100</button>
    </div>

    <div class='row'>
      <div class="col-sm-12">
        <TablePagination/>

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
import TablePagination from './TablePagination.vue'

export default {
  name: 'Users',
  data(){
    return {
      deleteLoading: false
    }
  },
  components: {
    TablePagination
  },
  computed: {
    ...mapState(['isInternetConnected', 'users','edit', 'blood_groups']),
    ...mapGetters(["getIsInternetConnected", "disablePage26_50"])
  },

  watch: {

    isInternetConnected(result){
      if (!this.$store.state.isInternetConnected && this.network === 'slow-2g') {
        setTimeout(() => {
          Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'You are now offline',
          showConfirmButton: false,
          timer: 1500
        })
        }, 10000);
      }
    }
  },
	mounted(){
    this.fetchAllUsers()
    this.page1_25()
  },

  methods: {
    ...mapActions(['fetchAllUsers', 'updateUser', 'updateStorage', 'page1_25', 'page26_50', 'page51_75', 'page76_100']),

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
