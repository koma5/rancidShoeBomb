<template>
    <div class="tilinggrid">

        <div v-for="item in items" v-bind:key="item._id" v-on:click="toggleEdit(item)">

            <span class="removeButton" v-on:click="deleteItem(item._id)">✖</span>
            <span v-if="currentEdit !== item._id">{{ item.name }}</span>
            <span v-if="item.dumplingCount > 0" class="dumplingCount"> dumpees: {{item.dumplingCount}}</span>

            <form v-if="currentEdit == item._id" v-on:submit.prevent="edit(item)">
                <input type="text" v-model="item.name">
            </form>

            <form v-if="apiResource == 'dumplings' && currentEdit == item._id" v-on:submit.prevent="edit(item)">
                <select v-model:value="item.landfill">
                    <option v-for="selection in landfillsToLink" v-bind:value="selection._id">{{selection.name}}</option>
                </select>
                <button type="submit">save</button>
            </form>


        </div>

        <div>
            <form v-on:submit.prevent="newItem">
                <input type="text" v-model="newItemName">
            </form>
        </div>

    </div>
</template>

<script>
export default {
    name: 'TilingGrid',
    data() {
        return {
            newItemName: '',
            currentEdit: '',
            currentPage: 0,
            perPage: 30,
            items: [],
            landfillsToLink: []
        }
    },

    props: ["apiResource"],

    mounted() {
        this.getItems(this.currentPage);
        this.scroll();
    },
    methods: {

        scroll() {
            window.onscroll = () => {
                let buttomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

                if (buttomOfWindow) {
                    this.currentPage++;
                    this.getItems(this.currentPage);
                }
            }

        },

        getItems(page) {
            if (typeof page === 'undefined') { var page = 0; var perPage = (this.currentPage+1) * this.perPage; }
            else { var perPage = this.perPage, page = this.currentPage; }
            this.axios.get(this.apiUrl + '/' + this.apiResource + '?per_page=' + perPage + '&page=' + page).then(response => (this.items.push(...response.data)));
        },

        getLandfills() {
            this.axios.get(this.apiUrl + '/landfills').then(response => (this.landfillsToLink = response.data));
        },

        newItem() {
            this.axios.post(this.apiUrl + '/' + this.apiResource, {name: this.newItemName}).then(() => {
                this.newItemName = '';
                this.getItems();
            });
        },

        deleteItem(id) {
            this.axios.delete(this.apiUrl + '/' + this.apiResource + '/' + id).then((i) => {
                this.getItems();
            });
        },

        toggleEdit(item) {
            this.currentEdit = item._id;
            this.getLandfills();
        },

        edit(item) {
           this.axios.put(this.apiUrl + '/' + this.apiResource + '/' + item._id , item).then(() => {
            this.currentEdit = "";
            this.getItems();
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tilinggrid {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
}

.tilinggrid div{
    width: 90px;
    height: 90px;
    background-color: lightgray;
    box-shadow: 1px 1px;
    padding: 10px;
}

.tilinggrid div:hover {
    box-shadow: 2px 2px;
}

.tilinggrid div input {
    width: 60px;
}

.dumplingCount {
    font-size:0.7em;
}

.removeButton {
    cursor: default;
}

</style>
