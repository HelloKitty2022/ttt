<template>
  <div class="l-echart-common"
       :style="styleSizeName">
    <div :ref="id"
         :style="styleChartName"></div>
  </div>
</template>

<script>
import init from "../mixins/common";
export default {
    mixins:[init],
    name: "common",
    methods: {
        updateChart () {
            const optionData = this.$deepClone(this.dataChart) || [];
            const option = this.echartFormatter(optionData);
            this.myChart.resize();
            this.myChart.setOption(option, true);
        }
    }
}
</script>