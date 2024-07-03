<!-- 文字配置 -->
<template>
  <div>
    <el-form-item label="文本内容">
      <el-input v-model="main.activeObj.data.value"></el-input>
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input-number v-model="main.activeOption.fontSize" :min="12" :max="200" controls-position="right" >
      </el-input-number>
    </el-form-item>
    <el-form-item label="字体颜色">
      <l-input-color v-model="main.activeOption.color"></l-input-color>
    </el-form-item>
    <el-form-item label="字体间距">
      <el-slider v-model="main.activeOption.split"></el-slider>
    </el-form-item>
    <el-form-item label="字体行高">
      <el-slider v-model="main.activeOption.lineHeight"></el-slider>
    </el-form-item>
    <el-form-item label="字体背景">
      <l-input-color v-model="main.activeOption.backgroundColor"></l-input-color>
    </el-form-item>
    <el-form-item label="文字粗细">
      <l-select v-model="main.activeOption.fontWeight"
                   :options="dicOption.fontWeight">
      </l-select>
    </el-form-item>
    <el-form-item label="对齐方式">
      <l-select v-model="main.activeOption.textAlign"
                   :options="dicOption.textAlign">
      </l-select>
    </el-form-item>
    <el-collapse accordion>
      <el-collapse-item title="跑马灯设置">
        <el-form-item label="开启">
          <el-switch v-model="main.activeOption.scroll"></el-switch>
        </el-form-item>
        <template v-if="main.activeOption.scroll">
          <el-form-item label="滚动速度">
            <el-input v-model="main.activeOption.speed"></el-input>
          </el-form-item>
        </template>
      </el-collapse-item>
      <el-collapse-item title="超链设置">
        <el-form-item label="开启">
          <el-switch v-model="main.activeOption.link"></el-switch>
        </el-form-item>
        <template v-if="main.activeOption.link">
          <el-form-item label="打开方式">
            <l-radio v-model="main.activeOption.linkTarget"
                        :options="dicOption.target">
            </l-radio>
          </el-form-item>
          <el-form-item label="超链地址">
            <el-input v-model="main.activeOption.linkHref"></el-input>
          </el-form-item>
        </template>
      </el-collapse-item>
    </el-collapse>
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