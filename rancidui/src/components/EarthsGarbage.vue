
<template>
    <main>
        <section id="left"><TilingGrid apiResource="dumplings" /></section>
        <section id="right"><TilingGrid apiResource="landfills" /></section>
    </main>
</template>

<script>
import TilingGrid from './TilingGrid.vue';

export default {
    name: 'EarthsGarbage',
    components: { TilingGrid }
}
</script>

<style scoped>

main {
    display: grid;
    grid-template-columns: 65% auto;
}

#right {
    border-left: 3px solid;
    padding-left: 10px;
}
</style>
