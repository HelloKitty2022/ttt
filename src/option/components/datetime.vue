<!-- 实时时间配置 -->
<template>
  <div>
    <el-form-item label="时间格式">
      <l-select v-model="main.activeOption.format"
                   :options="dicOption.format">
      </l-select>
    </el-form-item>
    <el-form-item label="自定义格式">
      <el-input v-model="main.activeOption.format">
      </el-input>
    </el-form-item>
    <el-form-item label="字体间距">
      <el-input-number v-model="main.activeOption.split" controls-position="right" >
      </el-input-number>
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input-number v-model="main.activeOption.fontSize" :min="12" :max="200" controls-position="right" >
      </el-input-number>
    </el-form-item>
    <el-form-item label="字体背景">
      <l-input-color v-model="main.activeOption.backgroundColor"></l-input-color>
    </el-form-item>
    <el-form-item label="对其方式">
      <l-select v-model="main.activeOption.textAlign"
                   :options="dicOption.textAlign">
      </l-select>
    </el-form-item>
    <el-form-item label="文字粗细">
      <l-select v-model="main.activeOption.fontWeight"
                   :options="dicOption.fontWeight">
      </l-select>
    </el-form-item>
    <el-form-item label="字体颜色">
      <l-input-color v-model="main.activeOption.color"></l-input-color>
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