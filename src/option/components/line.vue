<!--折线图配置 -->
<template>
  <div>
    <el-form-item label="竖展示">
      <el-switch type="textarea"
                   v-model="main.activeOption.category"></el-switch>
    </el-form-item>
    <el-collapse accordion>
      <el-collapse-item title="折线设置">
        <el-form-item label="面积堆积">
          <el-switch v-model="main.activeOption.areaStyle"></el-switch>
        </el-form-item>
        <el-form-item label="线条宽度">
          <el-slider v-model="main.activeOption.lineWidth">
          </el-slider>
        </el-form-item>
        <el-form-item label="点的大小">
          <el-slider v-model="main.activeOption.symbolSize">
          </el-slider>
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