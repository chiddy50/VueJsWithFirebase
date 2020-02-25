<template>
	<div id="app">
		<Navbar/>
    <OnlineChecker/>
		<router-view/>
	</div>
</template>

<script>

import Navbar from "@/components/Navbar.vue"
import OnlineChecker from '@/components/OnlineChecker'
import { mapActions } from 'vuex'

export default {
  name: 'App',
 	components: {
    Navbar,
    OnlineChecker
  },
  mounted(){
    this.fetchAllUsers()
  },

   methods: {
    ...mapActions(['fetchAllUsers'])
   }
}
</script>

<style>
*{
  font-family: 'Roboto';
}
</style>
