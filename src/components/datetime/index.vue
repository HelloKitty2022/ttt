<template>
  <div class="l-echart-datetime"
       :style="styleSizeName"
       ref="main"
       @click="handleClick">
    <p :style="styleName">{{nowDate}}</p>
  </div>
</template>

<script>
import dayjs from "dayjs";
import init from "../mixins/common";
export default {
    mixins:[init],
    name: "datetime",
    data () {
        return {
        date: new Date()
        };
    },
    computed: {
        nowDate () {
        if (this.option.format === "day") {
            return "星期" + this.$getDayText();
        }
        const format = (this.option.format || "yyyy-MM-dd hh:mm:ss")
            .replace("dd", "DD")
            .replace("yyyy", "YYYY");
        return dayjs(this.date).format(format);
        },
        styleName () {
        return {
            width: "100%",
            height: "100%",
            textAlign: this.option.textAlign,
            letterSpacing: this.$getPx(this.option.split),
            textIndent: this.$getPx(this.option.split),
            backgroundColor: this.option.backgroundColor,
            fontWeight: this.option.fontWeight || "normal",
            fontSize: (this.option.fontSize || 30) + "px",
            color: this.option.color || "#333"
        };
        }
    },
    created () {
        setInterval(() => {
        this.date = new Date();
        }, 1000);
    },
    props: {
        option: {
        type: Object,
        default: () => {
            return {};
        }
        }
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