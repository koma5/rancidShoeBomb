<template>
  <div class="landfill">
    <div class="landfillgrid">

        <div v-for="landfill in landfills" v-bind:key="landfill._id">

            <span v-if="currentEdit !== landfill._id">{{ landfill.name }}</span>
            <form v-if="currentEdit == landfill._id" v-on:submit.prevent="edit(landfill)">
                <input type="text" v-model="landfill.name">
            </form>
            <br />
            <span v-on:click="deleteLandfill(landfill._id)"> x</span>

            <span v-on:click="toggleEdit(landfill)"> e</span>


        </div>

        <div>
            <form v-on:submit.prevent="newLandfill">
                <input type="text" v-model="newLandfillName">
            </form>
        </div>

    </div>
  </div>
</template>

<script>
export default {
    name: 'landfill',
    data() {
        return {
            newLandfillName: '',
            currentEdit: '',
            landfills: []
        }
    },

    mounted() {
        this.getLandfills();
    },
    methods: {

        getLandfills() {
            this.axios.get(this.apiUrl + '/landfills').then(response => (this.landfills = response.data));
        },

        newLandfill() {
            this.axios.post(this.apiUrl + '/landfills', {name: this.newLandfillName}).then(() => {
                this.newLandfillName = '';
                this.getLandfills();
            });
        },

        deleteLandfill(id) {
            this.axios.delete(this.apiUrl + '/landfills/' + id).then((i) => {
                this.getLandfills();
            });
        },

        toggleEdit(landfill) {
            this.currentEdit = landfill._id;
        },

        edit(landfill) {
           this.axios.put(this.apiUrl + '/landfills/' + landfill._id , landfill).then(() => {
            this.currentEdit = "";
            this.getLandfills();
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.landfillgrid {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}

.landfillgrid div{
    width: 100px;
    height: 100px;
    background-color: lightgray;
}

</style>
