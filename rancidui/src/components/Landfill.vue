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
            landfills: []
        }
    },
    mounted() {
        this.axios.get('http://127.0.0.1:3000/landfills').then(response => (this.landfills = response.data));
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
