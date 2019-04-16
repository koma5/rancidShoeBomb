<template>
    <div class="tilinggrid">

        <div    v-for="item in items"
                v-bind:key="item._id"
                v-on:click="toggleEdit(item)"
                v-bind:draggable="draggable()"
                v-on:dragstart="dragStart(item, $event)"
                v-on:dragend="(event) => { dragEnd(item, event) }"
                v-on:dragenter="dragEnter($event)"
                v-on:dragleave="dragLeave($event)"
                v-on:drop="(event) => { dragDrop(item, event) }"
                @dragover.prevent>

            <span class="removeButton" v-on:click="deleteItem(item)">✖</span>
            <span v-if="currentEdit !== item._id">{{ item.name }}</span>
            <a v-if="apiResource == 'landfills'" :href="'#/landfills/' +item._id">⧖</a>
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
            this.axios.get(this.apiUrl + '/' + this.apiResource + '?per_page=' + perPage + '&page=' + page).then(
                response => (this.items.push(...response.data))
            );
        },

        refreshItem(item) {
            this.axios.get(this.apiUrl + '/' + this.apiResource + '/' + item._id ).then(response => {
                this.$set(this.items, this.items.indexOf(item), response.data);
            });
        },

        getLandfills() {
            this.axios.get(this.apiUrl + '/landfills').then(response => (this.landfillsToLink = response.data));
        },

        newItem() {
            var newItem = {name: this.newItemName}
            this.axios.post(this.apiUrl + '/' + this.apiResource, {name: this.newItemName}).then((response) => {
                this.newItemName = '';
                this.items.push(response.data);
            });
        },

        deleteItem(item) {
            this.axios.delete(this.apiUrl + '/' + this.apiResource + '/' + item._id).then((i) => {
                this.items.splice(this.items.indexOf(item),1);
            });
        },

        toggleEdit(item) {
            this.currentEdit = item._id;
            this.getLandfills();
        },

        edit(item) {
           this.axios.put(this.apiUrl + '/' + this.apiResource + '/' + item._id , item).then((response) => {
            this.currentEdit = "";
            this.items[this.items.indexOf(item)] = response.data;
            });
        },

        linkItemTo(item, link) {
            this.axios.put(this.apiUrl + '/dumplings/' + link, {'landfill': item._id}).then((response) => {
                this.refreshItem(item);
            });
        },

        dragEnter(event) {
            event.originalTarget.classList.add('dragenter');
        },

        dragLeave(event) {
            event.originalTarget.classList.remove('dragenter');
        },

        dragStart(item, event) {
            event.dataTransfer.setData("text", item._id);
        },

        dragEnd(item, event) {
            this.refreshItem(item);
        },

        dragDrop(item, event) {
            event.preventDefault();
            event.originalTarget.classList.remove('dragenter');
            var data = event.dataTransfer.getData("text");
            this.linkItemTo(item, data);
        },

        draggable() {
            if (this.apiResource === "landfills") return false
            return true;
        },

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

.dragenter {
    background-color: black !important;
}

a, a:hover, a:active, a:visited {
    text-decoration: none;
    color: #2c3e50;
}

</style>
