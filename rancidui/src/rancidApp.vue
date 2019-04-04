<template>
  <div id="rancidapp">
    <p>Hello fillers of land</p>
    <Landfill />
  </div>
</template>

<script>
import Landfill from './components/Landfill.vue'

export default {
  name: 'rancidapp',
  components: {
    Landfill
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
</style>
