import { getUrlParams } from '@/utils/utils';
import {getDataList} from '@/api/datasource';

const config = {
  name: 'l-echart-',
  homeurl: '${HOME_URL}',
  echart: ['common', 'map', 'pictorialbar', 'wordcloud', 'scatter', 'bar', 'line', 'pie', 'gauge', 'funnel', 'radar']
}

export default (() => {
  return {
    props: {
      click: Function,           // 点击方法
      dataFormatter: Function,   // 数据格式化方法
      titleFormatter: Function,  // 标题格式化方法
      labelFormatter: Function,  // 标签格式化方法
      clickFormatter: Function,  // 点击格式化方法
      formatter: Function,       // 格式化方法
      echartFormatter: Function, // echart格式化方法
      width: {                   // 宽
        type: [Number, String],
        default: 600
      },
      height: {                  // 高
        type: [Number, String],
        default: 600
      },                         // 主题
      theme: {
        type: String
      },
      animation: {               // 动画
        type: Boolean,
        default: true
      },
      child: {                   // 子集
        type: Object,
        default: () => {
          return {};
        }
      },
      time: {                    // 时间
        type: Number,
        default: 0
      },
      url: {                     // url地址
        type: String
      },
      disabled: {                // 禁用
        type: Boolean,
        default: true
      },
      dataType: {                // 数据类型
        type: Number,
        default: 0
      },
      dataQuery: {               // 数据查询
        type: Object,
        default: () => {
          return {};
        }
      },
      homeUrl: {                 // 主页地址
        type: String
      },
      dataAppend: {              // 数据添加
        type: Boolean,
        default: false
      },
      dataMethod: {              // 数据方法
        type: String,
        default: 'get'
      },
      id: {                      // id
        type: String,
        default: 'main_' + new Date().getTime()
      },
      data: {                    // 数据
        type: [Object, String, Array]
      },
      component: {               // 组件
        type: Object,
        default: () => {
          return {};
        }
      },
      dataSourceCode:String,
      option: {                  // 设置信息
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data () {
      return {
        propQuery: {},
        dataCount: 0,
        headerHeight: '',
        checkChart: '',
        myChart: '',
        dataChart: [],
        dataUrl: '',
        key: false,
        isChart: true
      };
    },
    watch: {
      echartFormatter () {
        this.updateChart();
      },
      styleChartName () {
        this.$nextTick(() => {
          this.myChart && this.myChart.resize();
        });
      },
      url: {
        handler (val) {
          this.dataUrl = val || '';
        },
        deep: true,
        immediate: true
      },
      data: {
        handler () {
          this.updateData();
        },
        deep: true,
        immediate: true
      },
      width () {
        this.updateData();
      },
      height () {
        this.updateData();
      },
      theme () {
        // 这三句一句都不能少
        this.myChart.dispose();
        this.init();
        this.updateData();
      },
      option: {
        handler () {
          if (this.myChart && this.isChart) {
            this.updateData();
          }
        },
        deep: true,
        immediate: true
      }
    },
    computed: {
      dataChartLen () {
        return (this.dataChart || []).length;
      },
      switchTheme () {
        return this.$vaildData(this.option.switchTheme, false);
      },
      name () {
        const result = this.$el.className.replace(config.name, '');
        return result;
      },
      minWidth () {
        const val = this.option.minWidth;
        if (val > this.width) return val;

      },
      isApi () {
        return this.dataType === 1 || this.dataType === 2;
      },
      style () {
        return this.component.style || {};
      },
      styleChartName () {
        const obj = {
          width: this.$getPx(this.minWidth || this.width),
          height: this.$getPx(this.height)
        };
        return obj;
      },
      styleSizeName () {
        return Object.assign({
          width: this.$getPx((this.width)),
          height: this.$getPx((this.height))
        }, (() => {
          if (this.minWidth) {
            return {
              overflowX: 'auto',
              overflowY: 'hidden'
            };
          }
          return {};
        })());
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      init () {
        // 判断是否引入echart包
        if (!window.echarts) {
            console.log('力软信息提醒你:缺少 echarts 引入');
            return;
        }
        const main = this.$refs[this.id];
        if (main) {
          // 判断是否图表去初始化
          this.isChart = config.echart.includes(this.name);
          if (this.isChart) this.myChart = window.echarts.init(main, this.theme);
        }
      },
      updateUrl (url) {
        this.dataUrl = url;
        this.updateData();
      },
      // 更新数据核心方法
      updateData (dataQuery) {
        let _dataQuery = this.dataQuery
        if(dataQuery){
          _dataQuery = dataQuery
        }
        this.resetData && this.resetData();
        if (this.key) return;
        this.key = true;
        const callback = () => {
          this.key = false;
          // 动态数据
          if (this.isApi && this.dataUrl || this.dataType === 2) {
           
            
            const detail = (res) => {
              // 处理返回的数据
              const result = (() => {
                if (typeof this.dataFormatter === 'function') {
                  return this.dataFormatter(res.data);
                };
                return res.data || {};
              })();
              // 延迟效果数据逐步增加
              if (this.dataAppend) {
                result.forEach(ele => {
                  this.dataCount++;
                  setTimeout(() => {
                    this.dataChart.unshift(ele);
                  }, this.dataCount * 1500);
                });
              } else {
                this.dataChart = result;
              }
              if (this.isChart && this.myChart) {
                this.updateChart();
                this.bindClick();
              }
            };
            

            if(this.dataType === 2){// 数据源
              let params = {}
              if(_dataQuery){
                params.queryJson = JSON.stringify(_dataQuery)
              }
              getDataList(this.dataSourceCode,params).then((res)=>{
                console.log(res);
                detail(res.data);
              })
            }
            else{// 数据接口
              let dataUrl = this.dataUrl.replace(config.homeurl, this.homeUrl);
              let result = getUrlParams(dataUrl);
              let url = result.url;
              let params = Object.assign(result.params, _dataQuery, this.propQuery);
              
              if (!window.axios) {
                  console.log('力软信息提醒你:缺少 axios 引入');
                  return;
              }
              this.$axios[this.dataMethod](url, (() => {
                if (this.dataMethod === 'get') {
                  return {
                    params: params
                  };
                } else if (this.dataMethod === 'post') {
                  return params;
                }
              })()).then(res => {
                detail(res);
              });
            }

            
          } else {
            // 静态数据
            if (typeof this.dataFormatter === 'function') {
              this.dataChart = this.dataFormatter(this.data);
            } else {
              this.dataChart = this.data;
            }
            if (this.isChart && this.myChart) {
              this.updateChart();
              this.bindClick();
            }
          }
        };
        this.$nextTick(() => {
          callback();
          clearInterval(this.checkChart);
          if (this.time !== 0 && this.disabled) {
            this.checkChart = setInterval(() => {
              callback();
            }, this.time);
          }
        });
      },
      getLabelFormatter (name) {
        if (this.labelFormatter) {
          return this.labelFormatter(name, this.dataChart);
        }
        return name.value;
      },
      // 绑定点击事件
      bindClick () {
        this.myChart.off('click');
        this.myChart.on('click', e => {
          if (e.marker) {
            if (this.clickFormatter) {
              this.clickFormatter({
                type: this.name,
                name: e.name,
                value: e.value[2] || e.value,
                data: this.dataChart
              });
            }
          }
        });
      },
      // 下面俩都是chart的公共的方法,就放这里面共用
      getColor (index, first) {
        const barColor = this.option.barColor || [];
        if (barColor[index]) {
          const color1 = barColor[index].color1;
          const color2 = barColor[index].color2;
          if (first) return color1;
          if (color2) {
            const postion = (barColor[index].postion || 0.9) * 0.01;
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: color1 // 0% 处的颜色
              }, {
                offset: postion,
                color: color2 // 100% 处的颜色
              }],
              global: false // 缺省为 false
            };
          }
          return color1;
        }
      },
      ishasprop (condition, isprop, alwaysObj) {
        return Object.assign((() => {
          return condition ? isprop : {};
        })(), alwaysObj);
      }
    }
  };
})();