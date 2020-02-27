<template>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'


export default {
  name: 'OnlineChecker',

  beforeCreate(){
    setInterval(() => {
      if (!window.navigator.onLine || window.navigator.connection.effectiveType === "slow-2g") {
        this.setConnection(false)
      }else{
        this.setConnection(true)
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
