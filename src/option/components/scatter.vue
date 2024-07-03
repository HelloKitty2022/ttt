<!-- 散点图配置 -->
<template>
  <div>
    <el-form-item label="字体大小">
      <el-input-number v-model="main.activeOption.fontSize" :min="12" :max="200" controls-position="right" >
      </el-input-number>
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