<template>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'


export default {
  name: 'OnlineChecker',

  created(){
    setInterval(() => {
      if (window.navigator.onLine) {
        this.setConnection(true)
      }else{
        this.setConnection(false)
      }
    }, 1000);
  },

  methods: {
    ...mapActions(['setConnection'])
  }

}
</script>

<style>

</style>
