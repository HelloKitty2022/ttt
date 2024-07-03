<template>
  <div class="l-echart-iframe"
       :style="styleSizeName"
       ref="main"
       @click="handleClick">
    <iframe :src="dataChart.value"
            draggable="false"></iframe>
  </div>
</template>

<script>
import init from "../mixins/common";
export default {
    mixins:[init],
    name: "iframe",
    data () {
        return {};
    },
    computed: {},
    created () { },
    mounted () { },
    methods: {
        handleClick () {
        this.clickFormatter({
            data: this.dataChart
        });
        }
    },
    props: {
        option: {
        type: Object,
        default: () => {
            return {};
        }
        }
    }
};
</script>


