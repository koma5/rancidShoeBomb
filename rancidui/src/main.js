import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueRouter from 'vue-router'
import rancidApp from './rancidApp.vue'
import Landfills from './components/Landfills.vue'
import Dumpees from './components/Dumpees.vue'
import EarthsGarbage from './components/EarthsGarbage.vue'
import LandfillDetail from './components/LandfillDetail.vue'
import PageNotFound from './components/PageNotFound.vue'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueRouter)

Vue.api = Vue.prototype.apiUrl = "http://" + location.hostname + '/api'

const routes = [
        { path: '/', component: Landfills },
        { path: '/landfills', component: Landfills },
        { path: '/dumpees', component: Dumpees },
        { path: '/earthsgarbage', component: EarthsGarbage },
        { path: '/landfills/:id', component: LandfillDetail },
        { path: "*", component: PageNotFound }
];


const router = new VueRouter({mode: 'history', routes});

new Vue({
    router,
    render: h => h(rancidApp)
}).$mount('#rancidapp')

