<template>
    <div class="container">
        <div class="row mt-4">

            <div class="col-sm-12 col-md-12 col-lg-12">
                <form>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Add User</span>
                        </div>
                        <input type="text" name="name" v-model="name" class="form-control" placeholder="Name">
                        <input type="number" name="age" v-model="age" class="form-control" placeholder="Age">
                        <select v-model="blood_group" class="form-control">
                            <option value="0" disabled selected>Blood Group</option>
                            <option v-for="(group, index) in blood_groups" :value="group" :key="index">{{ group }}</option>
                        </select>
                        <div v-if="onlineState" class="input-group-append">
                          <button v-if="!createLoading" @click.prevent="saveUser" class="input-group-text btn btn-info">Add</button>
                          <button v-else :disabled="createLoading" class="input-group-text btn btn-info">Creating</button>
                        </div>
                        <div v-else class="input-group-append">
                          <button :disabled="createLoading" @click.prevent="saveUser" class="input-group-text btn btn-info">Add Offline</button>
                        </div>
                    </div>
                </form>
            </div>

            <div v-if="fetchUsersLoading" class="col-sm-12 col-md-12 col-lg-12 mb-3">
              <div class="box">
                <div class="head pb-3">
                  <h5 class="text-center">Please wait...</h5>
                </div>
              </div>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-12 mb-3">
                <div class="box">
                    <BloodGroupChart :allusers="users"/>
                </div>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-12 mb-3">
                <div class="box">
                    <AgeChart :allusers="users"/>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
import { uuid } from 'vue-uuid'
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'
import BloodGroupChart from './BloodGroupChart'
import AgeChart from './AgeChart'

export default{
  name: 'home',
	data(){
		return {
      createLoading: false,
      fetchUsersLoading: false,
      user_id: null,
      name: null,
      age: null,
      blood_group: null,
      users: [],
      storage: [],
			blood_groups: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      onlineState: false
		}
  },
  components: {
    BloodGroupChart,
    AgeChart
  },
	computed: {
    ...mapGetters(["getIsInternetConnected"]),

    countUsers(){
      return this.users.length
    },
    allUsers(){
      return this.users
    }
	},
	created(){
    this.fetchAllUsers()
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
        }, 3000);
      }
    }
  },

  methods: {
    saveUser(){
      if (this.name === null || this.age === null) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Please Fill all fields',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        let user = {
          user_id: uuid.v1(),
          name: this.name,
          age: this.age,
          blood_group: this.blood_group
        }
        if (this.$store.state.isInternetConnected) {
          this.createLoading = true
          db.collection('users').add(user)
          .then(docRef => {
            this.addToStorage(user)
            this.updateOneUserInStorage(docRef.id, user.user_id)
          })
          .catch(err => console.error(err))
          .finally(() => this.createLoading = false )
        }else{
          this.addToStorage(user)
        }
      }

    },

    fetchAllUsers(){
      if (this.$store.state.isInternetConnected) {
        this.fetchUsersLoading = true
        let self = this
        db.collection('users').orderBy('blood_group').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let data = {
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
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          console.log(4);
          this.fetchUsersLoading = false
        })

      }else{
        this.getLocalStorage()
      }
    },

    // Offline mode methods

    getLocalStorage(){
      if (localStorage.getItem('users') === null) {
        this.users = [];
      }else{
        this.users = JSON.parse(localStorage.getItem('users'));
      }
    },

    addToStorage(user){
      this.users.push(user)
      localStorage.setItem('users', JSON.stringify(this.users));
      this.$router.push('/users')
    },

    updateOneUserInStorage(id, user_id){
      var user = this.users.find(user => {
          return user.user_id === user_id;
      });
      user.id = id;
      localStorage.setItem('users', JSON.stringify(this.users));
    },

    updateAllUsersStorage(){
      localStorage.setItem('users', JSON.stringify(this.users));
    }

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

  .btn-color{
    background-color: rgb(161, 121, 214);
    color: #fff;
  }

  .flex{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-class{
    font-size: 15px;
    padding: 10px;
  }

  .spinner-size{
    font-size: 40px;
  }


</style>
