<template>
  <div class="landfill">
    <ul>
        <li v-for="landfill in landfills" v-bind:key="landfill.id">{{ landfill.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'landfill',
  data() {
    return {
        landfills: [{name: 'one'}, {name: 'two'}]
}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
