<template>
  <div class="l-echart-img"
       :style="styleSizeName"
       @click="handleClick">
    <img v-if="dataChart.value"  :style="[styleImgName,styleSizeName]"
         :src="dataChart.value.replace('$BASE_URL',this.apiUrl)"
         class="l-echart-img--rotate"
         draggable="false" />
  </div>
</template>

<script>
import init from "../mixins/common";
export default {
    mixins:[init],
    name: "img",
    computed: {
        styleImgName () {
            return Object.assign(
                (() => {
                if (this.rotate) {
                    return {
                    animationDuration: this.duration / 1000 + "s"
                    };
                }
                return {};
                })(),
                {
                opacity: this.option.opacity || 1
                }
            );
        },
        duration () {
            return this.option.duration || 3000;
        },
        rotate () {
            return this.option.rotate;
        },
    },
    methods: {
        handleClick () {
            this.clickFormatter({
                data: this.dataChart
            });
        }
    }
};
</script>

