<template>
    <div class="container">
        <div class="row mt-4">

            <div class="col-sm-12 col-md-12 col-lg-12">
                <form>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Add User</span>
                        </div>
                        <input type="text" name="name" v-model="$store.state.name" class="form-control" placeholder="Name">
                        <input type="number" name="age" v-model="$store.state.age" class="form-control" placeholder="Age">
                        <select v-model="$store.state.blood_group" class="form-control">
                            <option disabled selected>Choose Blood Group</option>
                            <option v-for="(group, index) in blood_groups" :value="group" :key="index">{{ group }}</option>
                        </select>
                        <div v-if="getIsInternetConnected" class="input-group-append">
                          <button :disabled="$store.state.createLoading" @click.prevent="saveUser" class="input-group-text btn btn-info">{{ btnText }}</button>
                        </div>
                        <div v-else class="input-group-append">
                          <button :disabled="$store.state.createLoading" @click.prevent="saveUser" class="input-group-text btn btn-info">Add</button>
                        </div>
                    </div>
                </form>
            </div>

            <div v-if="$store.state.createLoading" class="col-sm-12 col-md-12 col-lg-12 mb-3">
              <div class="box py-3">
                <div class="head p-3">
                  <div class="spinner-border text-danger"></div>
                </div>
              </div>
            </div>

            <div v-if="$store.state.fetchUsersLoading" class="col-sm-12 col-md-12 col-lg-12 mb-3">
              <div class="box py-3">
                <div class="head">
                  <h5 class="text-center p-2">Please wait...</h5>
                </div>
              </div>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-6 mb-3">
                <div class="box">
                    <BloodGroupChart v-if="$store.state.users.length"/>
                </div>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-6 mb-3">
                <div class="box">
                    <AgeChart v-if="$store.state.users.length"/>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

import Swal from 'sweetalert2'
import { mapGetters, mapActions, mapState } from 'vuex'
import BloodGroupChart from './BloodGroupChart'
import AgeChart from './AgeChart'

export default{
  name: 'home',
  components: {
    BloodGroupChart,
    AgeChart
  },
	computed: {
    ...mapState(['isInternetConnected', 'users', 'edit', 'blood_groups']),
    ...mapGetters(["getIsInternetConnected"]),
    btnText(){
      if (this.$store.state.createLoading) {
        return "Creating";
      }else{
        return "Add"
      }
    }
	},
	mounted(){
    this.fetchAllUsers()
  },

  // watch: {

  //   isInternetConnected: function(result){
  //     if (!this.isInternetConnected) {
  //       setTimeout(() => {
  //         Swal.fire({
  //         position: 'top-end',
  //         icon: 'error',
  //         title: 'You are now offline',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       }, 10000);
  //     }
  //   }
  // },

  methods: {
    ...mapActions(['fetchAllUsers', 'saveUser'])
  }
}
</script>

<style scoped>
  .head{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box{
    box-shadow: 0 4px 8px 0 rgba(29, 28, 28, 0.2), 0 6px 10px 0 rgba(68, 66, 66, 0.19);
  }

</style>
