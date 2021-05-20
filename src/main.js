import Vue from 'vue'
import App from './App.vue'

import './config/bootstrap'
import './config/msgs'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
