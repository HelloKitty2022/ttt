<template>
  <div @mousedown="handleMouseDown" class="container" :style="canvasStyle"
        id="container"
        ref="container">
    <div class="grade"
          v-if="gradeFlag || contain.config.gradeShow"
          :style="gradeLenStyle"></div>
    <unit ref="unit"
        :nav="list"></unit>
  </div>
</template>

<script>
import unit from './unit'
import common from '@/config'
import { config } from '@/option/config'
export default {
  name: 'contents',
  inject: ["contain"],
  props: {
    props: {
      type: Object,
      default: () => {
        return {}
      }
    },
    scale:Number,
    menuFlag:{
      type:Boolean,
      default:false
    }
  },
  provide () {
    return {
      container: this
    };
  },
  components: {
    unit
  },
  data () {
    return {
      selectCount: {},
      gradeFlag: false,
    }
  },
  computed: {
    // 画布大小,一定要是computer里面,否则缩放页面会失效
    canvasStyle () {
      return Object.assign({
        transform: `scale(${this.scale}, ${this.scale})`,
        width: this.$getPx(this.contain.config.width),
        height: this.$getPx(this.contain.config.height),
        backgroundColor: this.contain.config.backgroundColor
      }, (() => {
        if (this.contain.config.backgroundImage) {
          return {
            background: `url(${this.contain.config.backgroundImage.replace('$BASE_URL',this.apiUrl)}) 0% 0% / 100% 100% rgb(3, 12, 59)`,
          }
        }
        return
      })())
    },
    gradeLenStyle () {
      return {
        backgroundSize: `${this.$getPx(this.contain.config.gradeLen)} ${this.$getPx(this.contain.config.gradeLen)},${this.$getPx(this.contain.config.gradeLen)} ${this.$getPx(this.contain.config.gradeLen)}`
      }
    },
    list () {
      let result = [];
      //循环处理数据
      const detail = (item) => {
        if (item.children) {
          //console.log('item.children');
          item.children.forEach(ele => {
            detail(ele);
          })
        } else {
          result.push(item)
        }
      }
      this.contain.nav.forEach(ele => {
        detail(ele);
      })
      const len = result.length - 1;
      result.forEach((ele, index) => {
        ele.zIndex = len - index;
      })
      return result
    },
  },
  mounted () {
    this.initFun();
  },
  methods: {
    initFun () {
      ['handleRefresh'].forEach(ele => {//'handleGetObj'
        this[ele] = this.$refs.unit[ele]
      });
    },
    handlePostionSelect (postion) {
      this.handleCalcPostionSelect();
      const x1 = this.selectCount.maxx1;
      const x2 = this.selectCount.maxx2;
      const y1 = this.selectCount.maxy1;
      const y2 = this.selectCount.maxy2;
      if (postion === 'left') {
        this.handleMoveSelectList(x1, undefined, true, postion);
      } else if (postion === 'center') {
        this.handleMoveSelectList(x1 + (x2 - x1) / 2, undefined, true, postion);
      } else if (postion === 'right') {
        this.handleMoveSelectList(x2, undefined, true, postion);
      } else if (postion === 'top') {
        this.handleMoveSelectList(undefined, y1, true, postion);
      } else if (postion === 'middle') {
        this.handleMoveSelectList(undefined, y1 + (y2 - y1) / 2, true, postion);
      } else if (postion === 'bottom') {
        this.handleMoveSelectList(undefined, y2, true, postion);
      }
    },
    handleMoveSelectList (left, top, type, postion) {
      this.active.forEach(ele => {
        ele = this.findlist(ele)
        const ele_component = ele.component;
        //水平情况
        if (left) {
          let baseLeft = Number(type ? left : (ele.left + left).toFixed(2));
          if (postion === 'right') {
            baseLeft = baseLeft - ele_component.width
          }
          else if (postion === 'center') {
            const obj_center = ele.left + ele_component.width / 2;
            baseLeft = ele.left + (left - obj_center)
          }
          this.$set(ele, 'left', baseLeft);
          this.$refs.unit.$refs[common.DEAFNAME + ele.index][0].setLeft(baseLeft)
        }
        //垂直情况
        if (top) {
          let baseTop = Number(type ? top : (ele.top + top).toFixed(2));
          if (postion === 'bottom') {
            baseTop = baseTop - ele_component.height
          }
          else if (postion === 'middle') {
            const obj_middle = ele.top + ele_component.height / 2;
            baseTop = ele.top + (top - obj_middle)
          }
          this.$set(ele, 'top', baseTop)
          this.$refs.unit.$ref[common.DEAFNAME + ele.index][0].setTop(baseTop)
        }
      })
    },
    //计算多选状态下的最大边界值
    handleCalcPostionSelect () {
      this.selectCount.maxx1 = 99999;
      this.selectCount.maxy1 = 99999;
      this.active.forEach(ele => {
        ele = this.findlist(ele)
        const left = ele.left;
        const top = ele.top;
        const width = ele.component.width;
        const height = ele.component.height;
        if (this.selectCount.maxx1 > left) {
          this.selectCount.maxx1 = left;
        }
        if (this.selectCount.maxx2 < left + width) {
          this.selectCount.maxx2 = left + width;
        }
        if (this.selectCount.maxy1 > top) {
          this.selectCount.maxy1 = top;
        }
        if (this.selectCount.maxy2 < top + height) {
          this.selectCount.maxy2 = top + height;
        }
      })
    },

    handleMouseDown () {
        this.contain.handleInitActive();
    }
  }
}
</script>