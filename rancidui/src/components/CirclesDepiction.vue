<template>
    <div v-html="depictionSvg"></div>
</template>

<script>
import * as d3 from 'd3';
import CirclesThing from '../CirclesThing.js';

export default {
    name: 'CirclesDepiction',
    data() {
        return {
            depictionSvg: ''
        }
    },

    props: ['seed', 'name'],

    mounted() {
        this.depiction = new CirclesThing({'seed': this.seed});
        this.depiction.draw();
        this.depictionSvg = this.depiction.getRawSvg();

    },

    methods: {},

}
</script>
