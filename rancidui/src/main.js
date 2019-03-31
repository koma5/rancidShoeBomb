import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import rancidApp from './rancidApp.vue'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
  render: h => h(rancidApp),
}).$mount('#rancidapp')
