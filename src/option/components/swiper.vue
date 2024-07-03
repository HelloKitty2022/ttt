<!-- 轮播配置 -->
<template>
  <div>
    <el-form-item label="类型">
      <l-radio v-model="main.activeOption.type"
                  :options="dicOption.swiperType"></l-radio>
    </el-form-item>
    <el-form-item label="轮播时间">
      <el-input v-model="main.activeOption.interval"></el-input>
    </el-form-item>
    <!--<el-form-item label="选择器">
      <l-radio v-model="main.activeOption.indicator"
                  :options="dicOption.swiperIndicator">
      </l-radio>
    </el-form-item>-->
    <el-form-item label="图片透明度">
      <el-slider v-model="main.activeOption.opacity"></el-slider>
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