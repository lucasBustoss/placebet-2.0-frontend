import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App.vue'

import './config/bootstrap'
import './config/msgs'

Vue.config.productionTip = false

Vue.filter('formattedDecimalValue',)

import router from './config/router'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
