// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('../assets/css/bootstrap.min.css');
require('../assets/css/all.css');
let jQuery = require('../assets/js/jquery-3.4.0.min');

window.jQuery = window.$ = jQuery;
require('../assets/js/bootstrap.bundle');

import Vue from 'vue';
import App from './App';
import { store } from './store/store';
import router from './router';
import UUID from 'vue-uuid';

Vue.use(UUID);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
});
