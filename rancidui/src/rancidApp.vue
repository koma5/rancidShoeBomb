<template>
  <div id="rancidapp">
    <p>Hello fillers of land</p>
    <nav>
        <router-link to="/dumpees">dumpees</router-link>
        <router-link to="/landfills">landfills</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Landfills from './components/Landfills.vue'
import Dumpees from './components/Dumpees.vue'

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

nav a, nav a:active, nav a:hover, nav a:visited {
    padding: 5px;
    color: #2c3e50;
    text-decoration: none;
    outline: none;
}

nav a.router-link-active {
    padding: 5px;
    text-decoration: underline;
}

</style>
