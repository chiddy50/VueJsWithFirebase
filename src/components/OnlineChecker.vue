<template>

</template>

<script>
export default {
  name: 'OnlineChecker',

  created(){
    setInterval(() => {
      if (window.navigator.onLine) {
        this.$store.state.isInternetConnected = true
      }else{
        this.$store.state.isInternetConnected = false
      }
    }, 3000);
  }
}
</script>

<style>

</style>
