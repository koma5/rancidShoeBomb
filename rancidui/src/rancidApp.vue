<template>
  <div id="rancidapp">
    <header>
        <p>Hello fillers of land</p>
        <nav>
            <router-link to="/dumpees">dumpees</router-link>
            <router-link to="/landfills">landfills</router-link>
            <router-link to="/earthsgarbage">ALL THE GARBAGE</router-link>
        </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import Landfills from './components/Landfills.vue'
import Dumpees from './components/Dumpees.vue'
import EarthsGarbage from './components/EarthsGarbage.vue'

export default {
  name: 'rancidapp',
  components: {
        Landfills
    }
}
</script>

<style>
#rancidapp {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
header {
    margin-bottom: 10px;
}

nav a, nav a:active, nav a:hover, nav a:visited {
    padding: 5px;
    color: #2c3e50;
    text-decoration: underline;
    outline: none;
}

nav a.router-link-active {
    padding: 5px;
    text-decoration: none;
}

</style>
