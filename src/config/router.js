import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/home/Home';
import Auth from '@/components/auth/Auth';
import Results from '@/components/results/Results';
import Import from '@/components/import/Import';
import Methods from '@/components/methods/Methods';
import Leagues from '@/components/leagues/Leagues';
import ReportMonthly from '@/components/reports/Monthly/Monthly';
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
    name: 'leagues',
    path: '/leagues',
    component: Leagues
  },
  {
    name: 'reportMonthly',
    path: '/reports/monthly',
    component: ReportMonthly
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
  {
    name: 'statements',
    path: '/',
    component: Home
    //Fazer!!!
  },
]

export default new VueRouter({
  mode: 'history',
  routes
});