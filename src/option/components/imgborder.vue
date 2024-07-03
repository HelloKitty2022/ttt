<!-- 图片框配置 -->
<template>
  <div>
    <el-form-item label="背景色">
      <l-input-color v-model="main.activeOption.backgroundColor"></l-input-color>
    </el-form-item>
    <el-form-item label="图片透明度">
      <el-slider v-model="main.activeOption.opacity"></el-slider>
    </el-form-item>
    <el-form-item label="图片地址">
      <img v-if="main.activeObj.data"
           :src="main.activeObj.data"
           alt=""
           width="100%" />
      <el-input v-model="main.activeObj.data">
        <div @click="main.handleOpenImg('activeObj.data','datav_imgk')"
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