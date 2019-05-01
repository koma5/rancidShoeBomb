<template>
    <section>
        <article>

            <CirclesDepiction v-if="item._id" :seed="item._id" :name="item.name"/>

            <div class="details">
                <ul>
                    <li>opened: {{item.opened}}</li>
                    <li>dumpees: {{item.dumplingCount}}</li>
                    <li>blahh: {{item.dumplingCount}}</li>
                    <li>more: {{item.dumplingCount}}</li>
                    <li>Area: {{item.dumplingCount}}</li>
                    <li>dumpees: {{item.dumplingCount}}</li>
                    <li v-on:click="showDumplings = !showDumplings">show dumpees below ▶▼</li>
                </ul>
            </div>

            <div v-if="showDumplings" class="dumplings">
                <TilingGrid apiResource="dumplings" />
            </div>
        </article>
    </section>
</template>

<script>
import TilingGrid from './TilingGrid.vue';
import CirclesDepiction from './CirclesDepiction.vue';

export default {
    name: 'LandfillDetail',
    components: { TilingGrid, CirclesDepiction },
    data() {
        return {
            item: {},
            showDumplings: false
        }
    },

    mounted() {
        this.getItemDetails(this.$route.params.id);
    },

    methods: {
        getItemDetails(id) {
            this.axios.get(this.apiUrl + '/landfills/' + id).then(
                response => (this.item = response.data)
            );
        },
    }
}

</script>


<style scoped>

section {
    width: 660px;
    height: 100%;
    margin: auto;
}

article {
    display: grid;
    grid-template-columns: 300px auto;
    grid-template-rows: auto auto;
    grid-gap: 40px;
}

.details ul {
  list-style: none;
}

.details {
    text-align: left;
}

.dumplings {
    grid-column: 1 / span 2;
}

</style>
