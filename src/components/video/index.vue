<template>
  <div class="l-echart-video"
       :style="styleSizeName"
       ref="main"
       @click="handleClick">
    <video controls=""
           autoplay=""
           loop=""
           :width="width"
           :height="height"
           style="object-fit: fill">
      <source :src="dataChart.value" />
    </video>
  </div>
</template>

<script>
import init from "../mixins/common";
export default {
    mixins:[init],
    name: "video",
    data () {
        return {};
    },
    computed: {},
    created () { },
    mounted () { },
    methods: {
        handleClick () {
        this.clickFormatter({
            type: index,
            value: item,
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


