<!-- 通用配置-->
<template>
  <div>
    <!-- 折叠公共配置 -->
    <el-collapse accordion>
      <!-- 标题设置 -->
      <template v-if="main.vaildProp('titleList')">
        <el-collapse-item title="标题设置">
          <el-form-item label="标题">
            <el-switch v-model="main.activeOption.titleShow"></el-switch>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="main.activeOption.title"></el-input>
          </el-form-item>
          <el-form-item label="字体颜色">
            <l-input-color v-model="main.activeOption.titleColor"></l-input-color>
          </el-form-item>
          <el-form-item label="字体大小">
            <el-input-number v-model="main.activeOption.titleFontSize"   controls-position="right" :min="12"></el-input-number>
          </el-form-item>
          <el-form-item label="字体位置">
            <l-select v-model="main.activeOption.titlePostion"
                         :options="dicOption.textAlign">
            </l-select>
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="main.activeOption.subtext"></el-input>
          </el-form-item>
          <el-form-item label="字体颜色">
            <l-input-color v-model="main.activeOption.subTitleColor"></l-input-color>
          </el-form-item>
          <el-form-item label="字体大小">
            <el-input-number v-model="main.activeOption.subTitleFontSize" controls-position="right" :min="12">
            </el-input-number>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 轴设置 -->
      <template v-if="main.vaildProp('barList')">
        <el-collapse-item title="X轴设置">
          <el-form-item label="名称">
            <el-input v-model="main.activeOption.xAxisName">
            </el-input>
          </el-form-item>
          <el-form-item label="显示">
            <el-switch v-model="main.activeOption.xAxisShow">
            </el-switch>
          </el-form-item>
          <el-form-item label="显示网格线">
            <el-switch v-model="main.activeOption.xAxisSplitLineShow">
            </el-switch>
          </el-form-item>
          <el-form-item label="标签间距">
            <el-switch v-model="main.activeOption.xAxisinterval">
            </el-switch>
          </el-form-item>
          <el-form-item label="文字角度">
            <el-switch v-model="main.activeOption.xAxisRotate">
            </el-switch>
          </el-form-item>
          <el-form-item label="轴反转">
            <el-switch v-model="main.activeOption.xAxisInverse">
            </el-switch>
          </el-form-item>
          <el-form-item label="字号">
            <el-input-number v-model="main.activeOption.xNameFontSize" controls-position="right" :min="12">
            </el-input-number>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="Y轴设置">
          <el-form-item label="名称">
            <el-input v-model="main.activeOption.yAxisName">
            </el-input>
          </el-form-item>
          <el-form-item label="显示">
            <el-switch v-model="main.activeOption.yAxisShow">
            </el-switch>
          </el-form-item>
          <el-form-item label="轴网格线">
            <el-switch v-model="main.activeOption.yAxisSplitLineShow">
            </el-switch>
          </el-form-item>
          <el-form-item label="反转">
            <el-switch v-model="main.activeOption.yAxisInverse">
            </el-switch>
          </el-form-item>
          <el-form-item label="字号">
            <el-input-number v-model="main.activeOption.yNameFontSize" controls-position="right" :min="12">
            </el-input-number>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 数值设置 -->
      <template v-if="main.vaildProp('labelList')">
        <el-collapse-item title="数值设置">
          <el-form-item label="显示">
            <el-switch v-model="main.activeOption.labelShow">
            </el-switch>
          </el-form-item>
          <el-form-item label="字体大小">
            <el-input-number v-model="main.activeOption.labelShowFontSize" controls-position="right" :min="12">
            </el-input-number>
          </el-form-item>
          <el-form-item label="字体颜色">
            <l-input-color v-model="main.activeOption.labelShowColor">
            </l-input-color>
          </el-form-item>
          <el-form-item label="字体粗细">
            <l-select v-model="main.activeOption.labelShowFontWeight"
                         :options="dicOption.fontWeight">
            </l-select>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 提示语设置  -->
      <template v-if="main.vaildProp('tipList')">
        <el-collapse-item title="提示语设置">
          <el-form-item label="字体大小">
            <el-input-number v-model="main.activeOption.tipFontSize" controls-position="right" :min="12"></el-input-number>
          </el-form-item>
          <el-form-item label="字体颜色">
            <l-input-color v-model="main.activeOption.tipColor"></l-input-color>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 轴距离设置 -->
      <template v-if="main.vaildProp('postionList')">
        <el-collapse-item title="坐标轴边距设置">
          <el-form-item label="左边距(像素)">
            <el-slider v-model="main.activeOption.gridX"
                         :max="400"></el-slider>
          </el-form-item>
          <el-form-item label="顶边距(像素)">
            <el-slider v-model="main.activeOption.gridY"
                         :max="400"></el-slider>
          </el-form-item>
          <el-form-item label="右边距(像素)">
            <el-slider v-model="main.activeOption.gridX2"
                         :max="400"></el-slider>
          </el-form-item>
          <el-form-item label="底边距(像素)">
            <el-slider v-model="main.activeOption.gridY2"
                         :max="400"></el-slider>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 图例设置 -->
      <template v-if="main.vaildProp('legendList')">
        <el-collapse-item title="图例操作">
          <el-form-item label="图例">
            <el-switch v-model="main.activeOption.legend"></el-switch>
          </el-form-item>
          <el-form-item label="位置">
            <l-select v-model="main.activeOption.legendPostion"
                         :options="dicOption.textAlign">
            </l-select>
          </el-form-item>
          <el-form-item label="布局朝向">
            <l-select v-model="main.activeOption.legendOrient"
                         :options="dicOption.orientList">
            </l-select>
          </el-form-item>
          <el-form-item label="字体大小">
            <el-input-number v-model="main.activeOption.legendFontSize" controls-position="right" :min="12">
            </el-input-number>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 颜色设置 -->
      <template v-if="main.vaildProp('colorList')">
        <el-collapse-item title="自定义配色">
          <el-form-item label="文字颜色">
            <l-input-color v-model="main.activeOption.nameColor">
            </l-input-color>
          </el-form-item>
          <el-form-item label="轴线颜色">
            <l-input-color v-model="main.activeOption.lineColor"></l-input-color>
          </el-form-item>
          <div class="l-block" style="min-height:200px;padding:0 16px;margin-bottom:16px;" >
            <l-edit-table 
              :dataSource="main.activeOption.barColor"
              :isShowNum="false" 
              @addRow="handleAdd" 
              @deleteRow="rowDel" >
              <el-table-column
                prop="color1"
                label="颜色"
                width="64">
                <template slot-scope="scope">
                  <el-color-picker size="mini" v-model="scope.row.color1"></el-color-picker>
                </template>
                </el-table-column>
                <el-table-column
                prop="color2"
                label="渐变色"
                width="64">
                <template slot-scope="scope">
                  <el-color-picker size="mini" v-model="scope.row.color2"></el-color-picker>
                </template>
                </el-table-column>
                <el-table-column
                  prop="postion"
                  label="位置"
                  width="100">
                <template slot-scope="scope">
                  <el-input-number size="mini" v-model="scope.row.postion" controls-position="right" >
                  </el-input-number>
                </template>
                </el-table-column>
            </l-edit-table>
          </div>
        </el-collapse-item>
      </template>
    </el-collapse>
  </div>
</template>

<script>
import { dicOption } from '@/option/config'
export default {
  inject: ["main"],
  data () {
    return {
      dicOption: dicOption,
    }
  },
  methods: {
    handleAdd(){
      this.main.activeOption.barColor.push({
        color1:'',
        color2:'',
        postion:50,
      });
    },
    rowDel ({index,row}) {
      console.log(index);
      this.main.activeOption.barColor.splice(index, 1);
    },
  }
}
</script>

<style>
</style>