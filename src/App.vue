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
export default {
  name: 'App',
 	components: {
    Navbar,
    OnlineChecker
  }
}
</script>

<style>
*{
  font-family: 'Roboto';
}
</style>
