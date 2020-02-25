<template>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'


export default {
  name: 'OnlineChecker',

  created(){
    setInterval(() => {
      if (window.navigator.onLine) {
        // this.$store.state.isInternetConnected = true
        this.setConnection(true)
      }else{
        // this.$store.state.isInternetConnected = false
        this.setConnection(false)
      }
    }, 500);
  },

  methods: {
    ...mapActions(['setConnection'])
  }

}
</script>

<style>

</style>
