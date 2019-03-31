<template>
  <div class="landfill">
    <ul>
        <li v-for="landfill in landfills" v-bind:key="landfill._id">{{ landfill.name }}</li>
    <form v-on:submit.prevent="newLandfill">
        <input type="text" name="landfillName" v-model="newLandfillName">
    </form>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'landfill',
    data() {
        return {
            newLandfillName: '',
            landfills: []
        }
    },

    mounted() {
        this.getLandfills();
    },
    methods: {
        getLandfills() {
            this.axios.get('http://127.0.0.1:3000/landfills').then(response => (this.landfills = response.data));
        },
        newLandfill() {
            this.axios.post('http://127.0.0.1:3000/landfills', {name: this.newLandfillName}).then(() => {
                this.newLandfillName = '';
                this.getLandfills();
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
