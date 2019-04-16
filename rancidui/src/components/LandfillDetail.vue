<template>
    <section>
            filly land of {{ $route.params.id }} coming soon!
        <article>
            <h1>{{item.name}}</h1>
            opened: {{item.opened}}
            dumpees: {{item.dumplingCount}}
        </article>
    </section>
</template>

<script>

export default {
    name: 'LandfillDetail',
    data() {
        return {
            item: {}
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


<style>
article {
    width: 300px;
    height: 300px;
    background-color: lightgray;
    box-shadow: 1px 1px;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
}


</style>
