<!-- 进度条配置 -->
<template>
  <div>
    <el-form-item label="间距">
      <el-input-number v-model="main.activeOption.split" controls-position="right"
                         :max="200"></el-input-number>
    </el-form-item>
    <el-form-item label="边框颜色">
      <l-input-color v-model="main.activeOption.borderColor"></l-input-color>
    </el-form-item>
    <el-form-item label="边框大小">
      <el-input-number v-model="main.activeOption.strokeWidth" controls-position="right"
                         :max="50"></el-input-number>
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input-number v-model="main.activeOption.fontSize" controls-position="right"
                         :max="200"></el-input-number>
    </el-form-item>
    <el-form-item label="字体颜色">
      <l-input-color v-model="main.activeOption.color"></l-input-color>
    </el-form-item>
    <el-form-item label="文字粗细">
      <l-select v-model="main.activeOption.FontWeight"
                   :options="dicOption.fontWeight">
      </l-select>
    </el-form-item>
    <el-form-item label="前缀字体大小">
      <el-input-number v-model="main.activeOption.suffixFontSize" controls-position="right"
                         :max="200"></el-input-number>
    </el-form-item>
    <el-form-item label="前缀字体颜色">
      <l-input-color v-model="main.activeOption.suffixColor"></l-input-color>
    </el-form-item>
    <el-form-item label="前缀文字粗细">
      <l-select v-model="main.activeOption.suffixFontWeight"
                   :options="dicOption.fontWeight">
      </l-select>
    </el-form-item>
  </div>
</template>

<script>
import { dicOption } from '@/option/config'
export default {
  data () {
    return {
      dicOption: dicOption
    }
  },
  inject: ["main"]
}
</script>

<style>
</style>