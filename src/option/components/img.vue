<!-- 图片配置 -->
<template>
  <div>
    <el-form-item label="开启旋转">
      <el-switch v-model="main.activeOption.rotate"></el-switch>
    </el-form-item>
    <el-form-item label="透明度">
      <el-slider v-model="main.activeOption.opacity"
                 :max="1"
                 :step="0.1"></el-slider>
    </el-form-item>
    <template v-if="main.activeOption.rotate">
      <el-form-item label="旋转时间">
        <el-input-number v-model="main.activeOption.duration" controls-position="right" >
        </el-input-number>
      </el-form-item>
    </template>
    <el-form-item label="图片地址">
      <img v-if="main.activeObj.data.value"
           :src="main.activeObj.data.value"
           alt=""
           width="100%" />
      <el-input v-model="main.activeObj.data.value">
        <div @click="main.handleOpenImg('activeObj.data.value','datav_img')"
             slot="append">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-input>
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