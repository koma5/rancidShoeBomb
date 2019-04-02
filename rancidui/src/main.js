import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import rancidApp from './rancidApp.vue'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

Vue.api = Vue.prototype.apiUrl = "http://127.0.0.1:3000" 

new Vue({
  render: h => h(rancidApp),
}).$mount('#rancidapp')

