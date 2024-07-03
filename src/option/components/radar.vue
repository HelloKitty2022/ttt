<!-- 雷达图配置 -->
<template>
  <div>
    <el-form-item label="字体大小">
      <el-input-number v-model="main.activeOption.radarNameSize" :min="12" :max="200" controls-position="right" >
      </el-input-number>
    </el-form-item>
    <el-form-item label="字体颜色">
      <l-input-color v-model="main.activeOption.radarNameColor"
                  >
      </l-input-color>
    </el-form-item>
    <el-form-item label="区域透明度">
      <el-slider v-model="main.activeOption.areaOpacity"
                   :max="1"
                   :step="0.1">
      </el-slider>
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