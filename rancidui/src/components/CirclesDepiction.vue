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

    mounted() {
        this.depiction = new CirclesThing();
        this.depiction.draw();
        this.depictionSvg = this.depiction.svgElement._groups[0][0].outerHTML;

    },

    methods: {},

}
</script>
