<template>
  <div>
    <div v-for="item in nav"
         :key="item.index"
         @contextmenu.prevent="handleContextMenu($event,item)">
        <l-draggable v-if="!item.children"
                    v-bind="item"

                    :scale="1/container.scale"
                    :step="1/container.scale"

                    :disabled="!container.menuFlag"
                    :width="item.component.width"
                    :height="item.component.height"
                    :ref="common.DEAFNAME+item.index"
                    :id="common.DEAFNAME+item.index"
                    :active-flag="contain.active.includes(item.index)"
                    v-show="!item.display"
                    @over="handleOver"
                    @focus="handleFocus"
                    @blur="handleBlur">
          <component :ref="common.NAME+item.index"
                   :id="common.NAME+item.index"
                   :is="common.COMPNAME+item.component.name"
                   v-bind="item"

                   :data-formatter="getFunction(item.dataFormatter)"
                   :click-formatter="getFunction(item.clickFormatter)"
                   :echart-formatter="getFunction(item.echartFormatter)"
                   :label-formatter="getFunction(item.labelFormatter)"
                   :formatter="getFunction(item.formatter)"
                   :width="item.component.width"
                   :data-query="getJson(item.dataQuery)"
                   :height="item.component.height"
                   :animation="!contain.menuFlag"
                   :theme="(item.option || {}).theme"
                   :disabled="!contain.menuFlag"
                   :scale="container.stepScale"
                   :option="item.option"
                   :home-url="contain.config.url"
                   :dataSourceCode="item.dataSourceCode"

                   title=""


                   :click="handleClick" />
        </l-draggable>
      <subgroup :nav="item.children"></subgroup>
    </div>
  </div>
</template>

<script>
import { addUrlParam } from '@/utils/utils'
import common from '@/config'
export default {
  name: 'unit',
  inject: ["contain", 'container'],
  props: {
    nav: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      common: common,
    }
  },
  methods: {
    getFunction (fun) {
      if (!this.$validatenull(fun)) {
        try {
          return eval(fun);
        } catch {
          return function () { }
        }
      }
    },
    getJson (str) {
      if (this.$validatenull(str)) return {};
      if (typeof str == "string") {
        try {
          return JSON.parse(str);
        } catch {
          return {}
        }
      }
      return str;
    },
    //点击事件交互
    handleClick ({ type, child, value }) {
      console.log(type, child, value,'click')
      if (type === 'tabs') {
        if(!child.index){
          return;
        }
        let indexList =[]
        if(typeof child.index == "string"){
          indexList = child.index.split(',');
        }

        console.log(indexList,'indexList')
        
        indexList.forEach((index) => {
          const paramName = child.paramName;
          const item = this.nav.find(t=>t.index == index)
          if (!item.url && item.dataType != 2) return
          let params = {};
          if (item.dataQuery) {
            params = this.getJson(item.dataQuery)
          } else {
            params = {}
          }
          params[paramName] = value;
          item.dataQuery = JSON.stringify(params);
          console.log(item.dataQuery,'dataQuery')
          this.$refs[this.common.NAME + index].forEach(ele => {
            ele.updateData(params);
          })
        })
      }
    },
    //刷新数据
    handleRefresh (tip = true) {
      this.$refs[this.common.NAME + this.contain.activeObj.index][0].updateData();
      if (tip) {
        this.$message.success('刷新成功')
      }
    },
    //获取对象
    handleGetObj (val) {
      return this.$refs[`${this.common.DEAFNAME}${val}`];
    },
    handleOver ({ index }) {
      this.contain.overactive = index;
    },
    handleFocus ({ index }) {
      this.container.gradeFlag = true;
      if (this.contain.keys.ctrl) {
        if (!Array.isArray(this.contain.active)) {
          this.contain.handleInitActive();
        }
        if (!this.contain.active.includes(index)) {
          this.contain.active.push(index);
        }       
      } else if (!this.contain.active.includes(index)) {
        this.contain.active = [index];
      }
    },
    handleBlur ({ left, top, width, height }) {
      if (Array.isArray(this.contain.activeObj)) return
      this.container.gradeFlag = false;
      this.$set(this.contain.activeObj.component, 'width', width)
      this.$set(this.contain.activeObj.component, 'height', height)
      this.$set(this.contain.activeObj, 'left', left)
      this.$set(this.contain.activeObj, 'top', top)
    },
    handleContextMenu($event,item){
      this.contain && this.contain.handleContextMenu && this.contain.handleContextMenu($event,item);
    }
  }
}
</script>
