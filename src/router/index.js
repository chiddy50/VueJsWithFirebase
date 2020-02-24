import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import Users from '@/components/Users';
import NotFound from '@/components/NotFound';

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/all-users',
      name: 'Users',
      component: Users
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});
