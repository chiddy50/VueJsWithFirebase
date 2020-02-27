<template>
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
      <tr v-for="(user, index) in getpaginationUsers" :key="user.user_id">
        <td>{{ user.name }}</td>
        <td>{{ user.age }}</td>
        <td>{{ user.blood_group }}</td>
        <td>
          <button v-if="$store.state.isInternetConnected" :disabled="$store.state.deleteLoading" class="btn btn-danger" @click="deleteUser(user.user_id, index)"> <i class="fas fa-trash"></i></button>
          <button v-else class="btn btn-danger" :disabled="$store.state.deleteLoading" @click="removeFromStorage([user.user_id, index])"> <i class="fas fa-trash"></i></button>
        </td>
        <td>
          <button class="btn btn-primary" @click="editUser(user)"> <i class="fas fa-pencil-alt"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import db from './firebaseInit'
import Swal from 'sweetalert2'

export default {
  name: 'TablePagination',

  computed: {
    ...mapGetters(["getpaginationUsers"])
  },

  methods: {
    ...mapActions(['editUser', 'removeFromStorage']),

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

<style>

</style>
