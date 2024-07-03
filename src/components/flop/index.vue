<template>
  <div class="l-echart-flop"
       :style="styleSizeName">
    <div v-for="(item,index) in listData"
         :key="index"
         :style="styleParentSize">
      <el-tooltip :disabled="!item.formatter"
                  placement="top-start"
                  :style="[styleParentName,{
               backgroundColor: item.backgroundColor || option.backgroundColor,
           }]">
        <div slot="content"
             v-html="item.formatter && item.formatter()"></div>
        <div :class="['l-echart-flop__item',{'l-echart-flop__item--none':(statusDIC.includes(item) || type==='')},{'l-echart-flop__item--whole':isWhole},{'l-echart-flop__item--img':isWhole&&(isImg || isBorder)}]"
             :style="!isWhole?'':styleName"
             @click="handleClick(item,index)">
          <div :style="prefixStyle"
               v-if="getValByArray(item,'prefixText')">{{getValByArray(item,'prefixText')}}</div>
          <l-count-up v-if="isWhole"
                         :decimals="decimals"
                         :end="item.data || item.value"></l-count-up>
          <div class="l-echart-flop__count"
               v-else>
            <div :class="['l-echart-flop__item',{'l-echart-flop__item--none':(statusDIC.includes(item) || type===''),'l-echart-flop__item--img':isImg}]"
                 v-for="(item,index) in (item.data || item.value)+''.split(',')"
                 :key="index"
                 @click="handleClick(item,index)"
                 :style="styleName">
              <div v-if="statusDIC.includes(item)">{{item}}</div>
              <l-count-up :decimals="decimals"
                             v-else
                             :end="item"></l-count-up>
            </div>
          </div>
          <div :style="suffixStyle"
               v-if="getValByArray(item,'suffixText')">{{getValByArray(item,'suffixText')}}</div>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import init from "../mixins/common";
export default {
    mixins:[init],
    name: "flop",
    data () {
        return {
        statusDIC: [".", ","]
        };
    },
    computed: {
        isArray () {
            return Array.isArray(this.dataChart);
        },
        decimals () {
            return this.option.decimals || 0
        },
        listData () {
            //console.log(this.dataChart,'dataChart');
            if (this.isArray) {
                return this.dataChart;
            } else {
                return [this.dataChart];
            }
        },
        isWhole () {
            return this.$vaildData(this.option.whole, false);
        },
        type () {
            return this.option.type;
        },
        isBorder () {
            return this.type === 'border';
        },
        isImg () {
            return this.type === 'img';
        },
        span () {
            return this.option.span || 1;
        },
        prefixStyle () {
            return {
                display: this.option.prefixInline ? 'inline-block' : 'block',
                textAlign: this.option.prefixTextAlign,
                marginBottom: this.$getPx(this.option.prefixSplity),
                marginRight: this.$getPx(this.option.prefixSplitx),
                color: this.option.prefixColor || "#fff",
                fontSize: this.$getPx(this.option.prefixFontSize || 24)
            };
        },
        suffixStyle () {
            return {
                display: this.option.suffixInline ? 'inline-block' : 'block',
                textAlign: this.option.suffixTextAlign,
                marginTop: this.$getPx(this.option.suffixSplity),
                marginLeft: this.$getPx(this.option.suffixSplitx),
                color: this.option.suffixColor || "#fff",
                fontSize: this.$getPx(this.option.suffixFontSize || 24)
            };
        },
        styleParentSize () {
            let obj = {
                boxSizing: 'border-box',
                display: 'inline-block',
                width: (100 / this.span) - 1 + '%'
            }
            if (this.option.splitx) {
                obj.paddingRight = this.$getPx(this.option.splitx)
            }
            if (this.option.splity) {
                obj.paddingBottom = this.$getPx(this.option.splity)
            }
            return obj
        },
        styleParentName () {
            let obj = {};
            if (!this.isImg && !this.isBorder) {
                this.option.backgroundImage = this.option.backgroundImage || '';
                obj = Object.assign(obj, {
                backgroundImage: `url(${this.option.backgroundImage.replace('$BASE_URL',this.apiUrl)})`,
                backgroundColor: this.option.backgroundColor
                });
            }
            if (this.option.padding) {
                obj.padding = this.$getPx(this.option.padding)
            }
            return obj
        },
        styleName () {
            return Object.assign(
                (() => {
                let obj = {}
                if (this.option.splitx) {
                    obj.marginRight = this.$getPx(this.option.splitx)
                }
                if (this.option.splity) {
                    obj.marginBottom = this.$getPx(this.option.splity)
                }
                if (this.option.backgroundImage) {
                    obj = Object.assign(obj, {
                    backgroundImage: `url(${this.option.backgroundImage.replace('$BASE_URL',this.apiUrl)})`,
                    backgroundSize: "100% 100%"
                    })
                }
                return obj;
                })(),
                {
                textAlign: this.option.textAlign,
                backgroundColor: this.option.backgroundColor,
                color: this.option.color || "#fff",
                fontSize: this.$getPx(this.option.fontSize || 64),
                fontWeight: this.option.fontWeight
                },
                (() => {
                if (this.type === "img") {
                    return {
                        borderImageSource: `url(${this.option.backgroundBorder.replace('$BASE_URL',this.apiUrl)})`
                    };
                } else if (this.type === "border") {
                    return {
                    borderColor: this.option.borderColor || "#fff",
                    borderStyle: "solid",
                    borderWidth: this.$getPx(this.option.borderWidth)
                    };
                }
                })()
            );
        }
    },
    props: {
        option: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    created () { },
    methods: {
        handleClick (item, index) {
            this.clickFormatter && this.clickFormatter({
                type: index,
                value: item,
                data: this.dataChart
            });
        },
        getValByArray (item, prop) {
            return this.isArray ? item[prop] : this.option[prop];
        }
    }
};
</script>