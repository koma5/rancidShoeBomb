
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

<style>
#left {
  float: left;
  width: 65%;
  overflow: hidden;
}

#right {
  overflow: hidden;
}
</style>
