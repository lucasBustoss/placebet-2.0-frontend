import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App.vue'

import './config/bootstrap'
import './config/msgs'
import store from './config/store/store'

Vue.config.productionTip = false

import router from './config/router'

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
