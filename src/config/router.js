import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/home/Home';
import Results from '@/components/results/Results';

Vue.use(VueRouter);

const routes = [{
  name: 'home',
  path: '/',
  component: Home
}, {
  name: 'results',
  path: '/results',
  component: Results
},]

export default new VueRouter({
  mode: 'history',
  routes
});