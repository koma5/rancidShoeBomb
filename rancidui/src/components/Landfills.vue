<template>
    <TilingGrid apiResource="landfills" />
</template>

<script>
import TilingGrid from './TilingGrid.vue';

export default {
    name: 'Landfills',
    components: { TilingGrid }
}
</script>
