 <!-- 象形图配置 -->
<template>
  <div>
    <el-form-item label="图标">
      <img v-if="main.activeOption.symbol"
           :src="main.activeOption.symbol.replace('$BASE_URL',apiUrl)"
           alt=""
           width="100%" />
      <el-input v-model="main.activeOption.symbol">
        <div @click="main.handleOpenImg('activeOption.symbol','datav_img')"
             slot="append">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-input>
    </el-form-item>
    <el-form-item label="图标字号">
      <el-input-number v-model="main.activeOption.symbolSize"  controls-position="right" :min="12" ></el-input-number>
    </el-form-item>
    <el-form-item label="字体颜色">
      <l-input-color v-model="main.activeOption.color"></l-input-color>
    </el-form-item>
    <el-form-item label="轴字体颜色">
      <l-input-color v-model="main.activeOption.nameColor"></l-input-color>
    </el-form-item>
    <el-form-item label="间距">
      <el-slider v-model="main.activeOption.split"></el-slider>
    </el-form-item>
    <el-collapse accordion>
      <el-collapse-item title="X轴设置">
        <el-form-item label="显示">
          <el-switch v-model="main.activeOption.xAxisShow">
          </el-switch>
        </el-form-item>
        <el-form-item label="字号">
          <el-input-number v-model="main.activeOption.xNameFontSize"  controls-position="right" :min="12" ></el-input-number>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="Y轴设置">
        <el-form-item label="显示">
          <el-switch v-model="main.activeOption.yAxisShow">
          </el-switch>
        </el-form-item>
        <el-form-item label="字号">
          <el-input-number v-model="main.activeOption.yNameFontSize"  controls-position="right" :min="12" ></el-input-number>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  inject: ["main"]
}
</script>

<style>
</style>