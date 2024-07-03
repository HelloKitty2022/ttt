<template>
  <div class="l-echart-imgborder"
       :style="styleSizeName">
    <div :style="styleImgName"></div>
  </div>
</template>

<script>
import init from "../mixins/common";
export default {
    mixins:[init],
    name: "imgborder",
    computed: {
        styleImgName () {
        return Object.assign({
            width: "100%",
            height: "100%",
            backgroundColor:
            this.option.backgroundColor || "rgba(180, 181, 198, 0.1)",
            backgroundClip: "padding-box",
            opacity: this.option.opacity || 1,
            filter: "blur(0px)"
        }, (() => {
            if (!this.$validatenull(this.dataChart)) {
            return {
                borderImageSource: "url(" + this.dataChart.replace('$BASE_URL',this.apiUrl) + ")",
                borderImageSlice: "10 16 15 10 fill",
                borderWidth: "10px 16px 15px 10px",
                borderStyle: "solid",
                boxSizing: "border-box",
            }
            }
            return {}
        })())
        }
    },
    methods: {}
};
</script>

