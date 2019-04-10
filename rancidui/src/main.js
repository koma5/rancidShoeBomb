import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueRouter from 'vue-router'
import { Vue2Dragula } from 'vue2-dragula'
import rancidApp from './rancidApp.vue'
import Landfills from './components/Landfills.vue'
import Dumpees from './components/Dumpees.vue'
import EarthsGarbage from './components/EarthsGarbage.vue'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(Vue2Dragula, {logging: {service: true }});

Vue.api = Vue.prototype.apiUrl = "http://" + location.hostname + '/api'

const routes = [
        { path: '/', component: Landfills},
        { path: '/landfills', component: Landfills},
        { path: '/dumpees', component: Dumpees},
        { path: '/earthsgarbage', component: EarthsGarbage}
];


const router = new VueRouter({routes});

new Vue({
    router,
    render: h => h(rancidApp)
}).$mount('#rancidapp')

