import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/home/Home';
import Auth from '@/components/auth/Auth';
import Results from '@/components/results/Results';
import Import from '@/components/import/Import';
import Methods from '@/components/methods/Methods';
import ReportDaily from '@/components/reports/Daily/Daily';
import ReportBankroll from '@/components/reports/Bankroll/Bankroll';
import ReportMethods from '@/components/reports/Methods/Methods';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'auth',
    path: '/auth',
    component: Auth
  },
  {
    name: 'results',
    path: '/results',
    component: Results
  },
  {
    name: 'import',
    path: '/import',
    component: Import
  },
  {
    name: 'methods',
    path: '/methods',
    component: Methods
  },
  {
    name: 'reportDaily',
    path: '/reports/daily',
    component: ReportDaily
  },
  {
    name: 'reportBankroll',
    path: '/reports/bankroll',
    component: ReportBankroll
  },
  {
    name: 'reportMethods',
    path: '/reports/methods',
    component: ReportMethods
  },
]

export default new VueRouter({
  mode: 'history',
  routes
});