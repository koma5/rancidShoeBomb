<template>
    <div class="depiction">
        <div v-html="depictionSvg"></div>
        <h1>{{name}}</h1>
    </div>
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
        this.depiction = new CirclesThing({'seed': this.seed, size: 330});
        this.depiction.draw();
        this.depictionSvg = this.depiction.getRawSvg();

    },

    methods: {},

}
</script>

<style>

.depiction {
    width: 330px;
    height: 330px;
}

.depiction h1 {
    font-variant: small-caps;
    font-size: 3.5em;
    word-wrap: break-word;
    margin: 0;
    position: relative;
    top: -330px;
    mix-blend-mode: color;
}

.depiction svg {
    z-index: -1;
    filter: blur(5px); 
    padding: 0;
}

</style>
