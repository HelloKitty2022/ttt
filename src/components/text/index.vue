<template>
  <div class="l-echart-text"
       :style="styleSizeName"
       ref="main"
       @click="handleClick">
    <div ref="box"
         class="l-echart-text__box">
      <a ref="text"
         class="l-echart-text__text"
         :href="linkHref"
         :style="styleName"
         :target="linkTarget">{{dataChart.value}}</a>
    </div>

  </div>
</template>

<script>
import init from "../mixins/common";
export default {
    mixins:[init],
    name: "text",
    data () {
        return {
        check: "",
        date: new Date(),
        left: 0,
        };
    },
    computed: {
        scroll () {
        return this.$vaildData(this.option.scroll, false);
        },
        linkHref () {
        return this.option.linkHref || "#";
        },
        linkTarget () {
        return this.option.linkTarget || "_self";
        },
        step () {
        return this.option.step || 5;
        },
        speed () {
        return this.option.speed || 100;
        },
        lineHeight () {
        return this.option.lineHeight || 40;
        },
        fontSize () {
        return this.option.fontSize || 30;
        },
        split () {
        return this.option.split;
        },
        textWidth () {
        const textLen = (this.dataChart.value || '').length;
        return textLen * this.fontSize;
        },
        styleName () {
        return {
            width: this.scroll ? this.$getPx(this.textWidth) : 'auto',
            transform: "translateX(" + this.left + "px)",
            textAlign: this.option.textAlign,
            letterSpacing: this.$getPx(this.split),
            textIndent: this.$getPx(this.split),
            backgroundColor: this.option.backgroundColor,
            fontWeight: this.option.fontWeight || "normal",
            fontSize: this.fontSize + "px",
            lineHeight: this.lineHeight + "px",
            color: this.option.color || "#333"
        };
        }
    },
    watch: {
        scroll () {
        this.move();
        },
        speed () {
        this.move();
        }
    },
    created () {
        setInterval(() => {
        this.date = new Date();
        }, 1000);
    },
    mounted () {
        this.move();
    },
    methods: {
        handleClick () {
        this.clickFormatter({
            data: this.dataChart
        });
        },
        move () {
        clearInterval(this.check);
        if (this.scroll) {
            this.check = setInterval(() => {
            if (this.left < -this.textWidth) {
                this.left = this.width;
            }
            this.left = this.left - this.step;
            }, this.speed);
        } else {
            this.left = 0;
        }
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


