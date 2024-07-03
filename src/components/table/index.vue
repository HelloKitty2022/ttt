<template>
  <div
    class="l-echart-table"
    :style="[styleSizeName, { overflow: scroll ? 'hidden' : 'inherit' }]"
  >
    <div :style="styleTdName" class="l-echart-table__table">
      <div class="l-echart-table__tr">
        <div
          class="l-echart-table__td"
          :style="[styleThName, { width: $getPx(indexWidth) }]"
          v-if="index"
        >
          {{ indexLabel }}
        </div>
        <template v-for="(item, index) in columnOption">
            <!---->
          <div
            class="l-echart-table__td"
            :style="[styleThName, styleWidth(item)]"
            v-if="item.prop && item.label"
            :key="index"
            @click="handleSortable(item.prop)"
          >
            {{ item.label }}
          </div>
        </template>
      </div>
      <div class="l-echart-table__tr" v-if="totalFlag">
        <div
          class="l-echart-table__td"
          :style="[{ width: $getPx(indexWidth) }]"
          v-if="index"
        >
          合计
        </div>
        <template v-for="(item, index) in columnOption">
          <div
            class="l-echart-table__td"
            :style="[styleWidth(item)]"
            v-if="columnData.includes(item.prop)"
            :key="index"
          >
            {{ totalData[item.prop] }}
          </div>
        </template>
      </div>
      <div class="l-echart-table__body" ref="body" :style="styleSizeName">
        <transition-group
          :enter-active-class="option.enterActiveClass"
          :leave-active-class="option.leaveActiveClass"
          tag="div"
        >
          <div
            v-for="(citem, cindex) in dataTabel"
            @click="rowClick(citem, cindex)"
            :key="dataTabelLen - cindex"
            class="l-echart-table__tr l-echart-table__tr--line"
            :style="[
              styleTrName(cindex),
              { top: $getPx(cindex * lineHeight + top) },
            ]"
          >
            <div
              class="l-echart-table__td"
              :style="[styleWidth(citem)]"
              :key="index"
              v-if="index"
            >
              <div
                :class="[
                  'l-echart-table__index',
                  'l-echart-table__index' + (cindex + 1),
                ]"
              >
                {{ cindex + 1 }}
              </div>
            </div>
            <template v-for="(item, index) in columnOption">
              <div
                class="l-echart-table__td"
                 v-if="item.prop && item.label"
                :style="[styleTdName, styleWidth(item)]"
                :key="index"
              >
                <span v-html="citem[item.prop]"></span>
              </div>
            </template>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import init from "../mixins/common";
export default {
  mixins: [init],
  name: "table",
  data() {
    return {
      visible: false,
      listVisible: false,
      columnData: [],
      indexWidth: 50,
      top: 0,
      prop: "",
      scrollCheck: "",
      activeIndex: 0,
      query: {},
    };
  },
  watch: {
    scrollCount() {
      this.setTime();
    },
    count() {
      this.setTime();
    },
    scrollTime() {
      this.setTime();
    },
    count() {
      this.setTime();
    },
    scroll: {
      handler(val) {
        this.setTime();
      },
      immediate: true,
    },
  },
  created() {
    this.columnList.forEach((ele) => {
      if (!this.columnShowList.includes(ele.value)) {
        this.columnData.push(ele.value);
      }
    });
  },
  computed: {
    listOption() {
      return Object.assign(
        {
          align: "center",
          headerAlign: "center",
          size: "mini",
          menu: false,
          header: false,
          height: 500,
          sumText: "合计",
          showSummary: true,
          column: this.option.column,
        },
        (() => {
          return {
            sumColumnList: this.totalList.map((column) => {
              return {
                name: column,
                type: "sum",
              };
            }),
          };
        })()
      );
    },
    totalList() {
      return this.option.totalList || [];
    },
    totalFlag() {
      return !this.$validatenull(this.totalList);
    },
    totalData() {
      let obj = {};
      this.totalList.forEach((prop) => {
        this.dataChart.forEach((ele) => {
          obj[prop] = (obj[prop] || 0) + Number(ele[prop]);
          obj[prop] = Number(obj[prop].toFixed(2));
        });
      });
      return obj;
    },
    columnList() {
      let list = this.columnOption.map((ele) => {
        if (!this.columnShowWhite.includes(ele.prop)) {
          return {
            label: ele.label,
            value: ele.prop,
          };
        }
        return false;
      });
      
      return list.filter((ele) => {
        return ele.value;
      });
    },
    columnShow() {
      return this.option.columnShow;
    },
    columnListShow() {
      return this.option.columnListShow;
    },
    columnShowWhite() {
      return this.option.columnShowWhite || [];
    },
    columnShowList() {
      return this.option.columnShowList || [];
    },
    dataTabelLen() {
      return this.dataChart.length;
    },
    dataTabel() {
      let list = this.dataChart;
      if (!this.$validatenull(this.prop)) {
        list = this.sortArrys(list, this.prop);
      }
      return list;
    },
    allHeight() {
      const count = this.count - (this.totalFlag ? 2 : 1);
      const calcState = this.dataChartLen - count;
      return calcState * this.lineHeight;
    },
    count() {
      return (this.option.count || 10) + 1;
    },
    dataChartLen() {
      return (this.dataChart || []).length;
    },
    lineHeight() {
      return parseInt(this.height / this.count);
    },
    index() {
      return this.option.index;
    },
    scroll() {
      return this.option.scroll;
    },
    scrollTime() {
      return this.option.scrollTime || 5000;
    },
    indexLabel() {
      return this.option.indexLabel || "排名";
    },
    fontSize() {
      return this.option.fontSize || 14;
    },
    scrollCount() {
      return this.option.scrollCount || this.count;
    },
    speed() {
      return this.scrollCount * this.lineHeight;
    },
    styleThName() {
      return {
        fontSize: this.$getPx(this.fontSize),
        background: this.option.headerBackground || "rgba(0, 0, 0, 0.01)",
        color: this.option.headerColor || "rgba(154, 168, 212, 1)",
      };
    },
    columnOption() {
      return this.crudOption.column || [];
    },
    styleTdName() {
      return {
        fontSize: this.$getPx(this.fontSize),
        lineHeight: this.$getPx(this.lineHeight),
        color: this.option.bodyColor || "rgba(154, 168, 212, 1)",
        borderColor: this.option.borderColor || "rgba(51, 65, 107, 1)",
      };
    },
    styleMenuName() {
      return {
        color: this.option.headerColor || "rgba(154, 168, 212, 1)",
      };
    },
    sortableProp() {
      return this.option.sortableProp || "order";
    },
    crudOption() {
      return Object.assign(this.option, {
        menu: false,
        align: "center",
        headerAlign: "center",
        header: false,
      });
    },
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    styleWidth(item) {
      return {
        width: this.$getPx(item.width),
        flex: item.width ? "auto" : 1,
      };
    },
    resetData() {
      this.top = 0;
    },
    handleSortable(prop) {
      this.propQuery[this.sortableProp] = prop;
      this.updateData();
    },
    setTime() {
      this.top = 0;
      clearInterval(this.scrollCheck);
      setTimeout(() => {
        if (this.scroll) {
          this.scrollCheck = setInterval(() => {
            if (this.top <= -this.allHeight) {
              this.top = 0;
            } else {
              this.top = this.top - this.speed;
            }
          }, this.scrollTime);
        }
      }, 2000);
    },
    styleTrName(index) {
      let result = {
        lineHeight: this.$getPx(this.lineHeight),
      };
      if (index % 2 === 0) {
        result.background = this.option.othColor;
      } else {
        result.background = this.option.nthColor;
      }
      return result;
    },
    rowClick(item, index) {
      this.clickFormatter({
        type: index,
        value: item,
        data: this.dataChart,
      });
    },
    handleClick(value, index) {
      this.activeIndex = index;
      this.query.type = value;
      this.updateData();
    },
  },
};
</script>


