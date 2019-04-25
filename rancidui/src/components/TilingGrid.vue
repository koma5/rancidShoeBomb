<template>
    <div class="tilinggrid">

        <div class="search">
            <form v-on:submit.prevent="getItems(currentPage, true)">
                <input type="text" v-model="searchTerm">
            </form>
        </div>

        <div    class="item"
                v-for="item in items"
                v-bind:key="item._id"
                v-on:click="toggleEdit(item)"
                v-bind:draggable="draggable()"
                v-on:dragstart="dragStart(item, $event)"
                v-on:dragend="(event) => { dragEnd(item, event) }"
                v-on:dragenter="dragEnter($event)"
                v-on:dragleave="dragLeave($event)"
                v-on:drop="(event) => { dragDrop(item, event) }"
                @dragover.prevent>

            <div class="controls">
                <a v-if="apiResource == 'landfills'" :href="'#/landfills/' +item._id">⧖</a>
                <span class="removeButton" v-on:click="deleteItem(item)">✖</span>
            </div>
            <span v-if="currentEdit !== item._id">{{ item.name }}</span>

            <form v-if="currentEdit == item._id" v-on:submit.prevent="edit(item)">
                <input type="text" v-model="item.name">
            </form>

            <p v-if="item.dumplingCount > 0" class="dumplingCount"> dumpees: {{item.dumplingCount}}</p>

            <form v-if="apiResource == 'dumplings' && currentEdit == item._id" v-on:submit.prevent="edit(item)">
                <select v-model:value="item.landfill">
                    <option v-for="selection in landfillsToLink" v-bind:value="selection._id">{{selection.name}}</option>
                </select>
                <button type="submit">save</button>
            </form>


        </div>

        <div class="item">
            <form v-on:submit.prevent="newItem">
                <input placeholder="new" type="text" v-model="newItemName">
            </form>
        </div>

        <div class="newItem"></div>

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
            searchTerm: '',
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

        getItems(page, replace) {
            if (typeof page === 'undefined') { var page = 0; var perPage = (this.currentPage+1) * this.perPage; }
            else { var perPage = this.perPage, page = this.currentPage; }
            var searchUrlParameters = (this.searchTerm !== '') ? '&name=' + this.searchTerm : '';
            this.axios.get(this.apiUrl + '/' + this.apiResource + '?per_page=' + perPage + '&page=' + page + searchUrlParameters).then(
                    (response) => {
                        if (typeof replace !== 'undefined') {
                            this.items = [];
                        }
                        this.items.push(...response.data);
                    }
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

.item{
    width: 90px;
    height: 75px;
    background-color: lightgray;
    box-shadow: 1px 1px;
    padding: 25px 10px 10px 10px;
    position: relative;
}

.newItem {
    width: 90px;
    height: 90px;
    padding: 10px;
    font-size: 100px;
}

.newItem:after {
    content:"+";
    top: 5px;
    vertical-align: middle;
}

.item:hover {
    box-shadow: 2px 2px;
}

.item input {
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    border-bottom: 1px solid;
    color: #2c3e50;

}

.dumplingCount {
    margin: 0;
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

.controls {
    position: absolute;
    top: 8px;
    right: 8px;
}

</style>
