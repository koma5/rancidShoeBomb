import Vue from 'vue'
import rancidApp from './rancidApp.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(rancidApp),
}).$mount('#rancidapp')
