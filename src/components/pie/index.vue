<template>
  <div class="l-echart-pie"
       :style="styleSizeName">
    <div class="l-echart-pie-title"
         v-html="titleFormatter && titleFormatter(dataChart)"></div>
    <div :ref="id"
         :style="styleChartName"></div>
  </div>
</template>

<script>
import init from "../mixins/common";
export default {
    mixins:[init],
  name: "pie",
  computed: {
    labelShow () {
      return this.$vaildData(this.option.labelShow, false);
    },
    x2 () {
      return this.option.gridX2 || 20;
    },
    fontSize () {
      return this.option.fontSize || 14;
    }
  },
  methods: {
    updateChart () {
      const optionData = this.$deepClone(this.dataChart) || [];
      const option = {
        title: this.ishasprop(this.option.titleShow, {
          text: this.option.title,
          subtext: this.option.subtext || '',
          textStyle: {
            color: this.option.titleColor || '#333',
            fontSize: this.option.titleFontSize || 16
          },
          left: this.option.titlePostion || 'auto',
          subtextStyle: {
            color: this.option.subTitleColor || '#aaa',
            fontSize: this.option.subTitleFontSize || 14
          }
        }, {}),
        tooltip: (() => {
          return Object.assign(
            (() => {
              if (this.formatter) {
                return {
                  formatter: name => {
                    return this.formatter(name, this.dataChart);
                  }
                };
              }
              return {};
            })(),
            {
              textStyle: {
                fontSize: this.option.tipFontSize,
                color: this.option.tipColor || "#fff"
              }
            }
          );
        })(),
        grid: {
          left: this.option.gridX || 20,
          top: this.option.gridY || 60,
          right: this.x2,
          bottom: this.option.gridY2 || 60
        },
        legend: {
          show: this.$vaildData(this.option.legend, false),
          orient: this.option.legendOrient || "vertical",
          x: this.option.legendPostion || "left",
          top: 0,
          right: this.x2,
          textStyle: {
            fontSize: this.option.legendFontSize || 12,
          },
          data: (() => {
            return optionData.map((ele, index) => {
              return {
                name: ele.name,
                textStyle: this.ishasprop(!this.switchTheme, {
                  color: this.getColor(index, true)
                }, {})
              }
            });
          })()
        },
        series: (() => {
          const barColor = this.option.barColor || [];
          const list = [
            {
              type: "pie",
              roseType: this.option.roseType ? "radius" : "",
              radius: this.option.radius ? ["40%", "55%"] : "50%",
              center: ["50%", "60%"],
              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function (idx) {
                return Math.random() * 200;
              },
              label: {
                normal: {
                  show: this.labelShow,
                  formatter: '{b}:{c}({d}%)',
                  textStyle: {
                    fontSize: this.fontSize
                  }
                }
              },
              data: (() => {
                let list = optionData;
                if (this.option.notCount) {
                  list = list.filter(ele => {
                    if (ele.value !== 0 && ele.value) {
                      return true;
                    }
                  });
                }
                if (this.option.sort) {
                  list.sort(function (a, b) {
                    return a.value - b.value;
                  });
                }
                return list;
              })(),
              itemStyle: this.ishasprop(!this.switchTheme, {
                color: params => this.getColor(params.dataIndex)
              }, {                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }              }),
            }
          ];
          return list;
        })()
      };
      this.myChart.resize();
      console.log(option,'option');
      this.myChart.setOption(option, true);
    }
  }
};
</script>



