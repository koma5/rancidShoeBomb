import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueRouter from 'vue-router'
import rancidApp from './rancidApp.vue'
import Landfills from './components/Landfills.vue'
import Dumpees from './components/Dumpees.vue'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueRouter)

Vue.api = Vue.prototype.apiUrl = "http://" + location.hostname + '/api'

const routes = [
        { path: '/', component: Landfills},
        { path: '/landfills', component: Landfills},
        { path: '/dumpees', component: Dumpees}

];


const router = new VueRouter({routes});

new Vue({
    router,
    render: h => h(rancidApp)
}).$mount('#rancidapp')

