<template>
  <div class="l-echart-tabs"
       :style="styleSizeName"
       ref="main">
    <div class="l-echart-tabs__list">
      <div class="l-echart-tabs__item"
           :style="[styleName,styleActiveName(item)]"
           v-for="(item,index) in dataChart"
           :key="index"
           @click="handleClick(item.value)">
        <div v-if="item.icon"
             class="l-echart-tabs__icon"
             :style="[styleIconName,styleIconBgName(item),styleIconActiveName(item)]"></div>
        <span>{{item.label}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import init from "../mixins/common";
export default {
    mixins:[init],
    name: "tabs",
    data () {
        return {
        active: ""
        };
    },
    watch: {
        active (val) {
        if (!val) return;
        this.handleClick(val);
        },
        dataChart: {
        handler (val) {
            if (val.length !== 0) {
            this.active = val[0].value;
            }
        },
        immediate: true
        }
    },
    computed: {
        isSelect () {
        return this.type === "select";
        },
        type () {
        return this.option.type;
        },
        paramName () {
        return this.option.paramName;
        },
        iconSize () {
        return this.option.iconSize || 20;
        },
        styleSelectName () {
        return Object.assign(
            {
            fontSize: this.$getPx(this.option.fontSize || 30)
            },
            this.styleSizeName
        );
        },
        styleIconName () {
        return Object.assign({
            marginRight: this.$getPx(this.option.iconSplit),
            width: this.$getPx(this.option.iconSize),
            height: this.$getPx(this.option.iconSize)
        });
        },
        styleName () {
        return Object.assign(
            (() => {
            if (this.option.backgroundImage) {
                return {
                backgroundImage: `url(${this.option.backgroundImage.replace('$BASE_URL',this.apiUrl)})`,
                backgroundSize: "100% 100%"
                };
            }
            return {};
            })(),
            {
            borderColor: this.option.borderColor || "#fff",
            borderStyle: "solid",
            borderWidth: this.$getPx(this.option.borderWidth || 0),
            margin: `0 ${this.$getPx(this.option.split)}`,
            backgroundColor: this.option.backgroundColor,
            fontSize: this.$getPx(this.option.fontSize || 30),
            color: this.option.color
            }
        );
        }
    },
    created () { },
    mounted () { },
    methods: {
        styleIconBgName (item) {
            if (item.icon) {
                return {
                    backgroundImage: `url(${item.icon})`,
                    backgroundSize: "100% 100%"
                };
            }
        },
        styleIconActiveName (item) {
            if (this.active == item.value && item.empIcon) {
                return {
                    backgroundImage: `url(${item.empIcon})`,
                    backgroundSize: "100% 100%"
                };
            }
        },
        styleActiveName (item) {
            if (this.active == item.value) {
                return Object.assign(
                (() => {
                    if (this.option.empBackgroundImage) {
                    return {
                        backgroundImage: `url(${this.option.empBackgroundImage.replace('$BASE_URL',this.apiUrl)})`,
                        backgroundSize: "100% 100%"
                    };
                    }
                    return {};
                })(),
                {
                    borderColor: this.option.empBorderColor || "#fff",
                    borderStyle: "solid",
                    borderWidth: this.$getPx(this.option.empBorderWidth || 0),
                    color: this.option.empColor
                }
                );
            }
        },
        handleClick (val) {
        this.active = val;
        this.click({
            type: this.name,
            child: this.child,
            value: this.active
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


