<template>
    <div>
        <div class="jumbotron header text-center rounded-0" style="margin-bottom:0">
            <h1 class="text-white app-title">E-HEALTH DASHBOARD</h1>
            <p></p>
        </div>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark box">
            <a class="navbar-brand" href="#"></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="toggler-icon"><i class="fas fa-bars"></i></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav">
                    <li class="nav-item">
                      <router-link class="nav-link anchor-tags" tag="a" to="/">Home <i class="fa fa-home"></i></router-link>
                    </li>
                    <li class="nav-item">
                      <router-link class="nav-link anchor-tags" tag="a" to="/all-users">Users  <i class="fa fa-user"></i></router-link>
                    </li>
                    <li v-if="$store.state.isInternetConnected" class="nav-item">
                      <a disabled class="nav-link online">Online Mode</a>
                    </li>
                    <li v-else class="nav-item">
                      <a disabled class="offline">Offline Mode</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',

  computed: {
    ...mapGetters(["getIsInternetConnected"])
  },



}
</script>

<style scoped>
.header{
  background: #1abc9c;
}

.disabled{
  font-weight: 400;
}

.online{
  color: #4eff4e !important;
  display: block;
  padding: .5rem 1rem;
}

.offline{
  color: #f50c0c !important;
  display: block;
  padding: .5rem 1rem;
}

@media (min-width: 576px) {
  .online, .offline{
    padding-right: .5rem;
    padding-left: .5rem;
  }

}

.app-title{
  text-shadow: 2px 2px 5px #333;
}

.box{
  box-shadow: 0 4px 8px 0 rgba(29, 28, 28, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
}

.anchor-tags{
	color: #222;
}
</style>
