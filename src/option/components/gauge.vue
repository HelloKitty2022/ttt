<!-- 刻度盘配置 -->
<template>
  <div>
    <el-form-item label="刻度线粗度(像素)">
      <el-input-number v-model="main.activeOption.lineSize" controls-position="right"></el-input-number>
    </el-form-item>
    <el-form-item label="显示刻度值">
      <el-switch v-model="main.activeOption.axisLabelShow"></el-switch>
    </el-form-item>
    <el-form-item label="刻度字号">
      <el-input-number v-model="main.activeOption.axisLabelFontSize" controls-position="right"></el-input-number>
    </el-form-item>
    <el-form-item label="指标名称字号">
      <el-input-number v-model="main.activeOption.nameFontSize" controls-position="right"></el-input-number>
    </el-form-item>
    <el-form-item label="指标字号">
      <el-input-number v-model="main.activeOption.valueFontSize" controls-position="right"></el-input-number>
    </el-form-item>
  </div>
</template>

<script>
export default {
  inject: ["main"]
}
</script>

<style>
</style>