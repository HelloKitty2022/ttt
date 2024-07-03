<!-- 地图配置 -->
<template>
  <div>
    <el-form-item label="开启轮播">
      <el-switch v-model="main.activeOption.banner"></el-switch>
    </el-form-item>
    <template v-if="main.activeOption.banner">
      <el-form-item label="轮播时间">
        <el-input v-model="main.activeOption.bannerTime"></el-input>
      </el-form-item>
    </template>
    <template v-if="main.activeOption.type===0">
      <el-form-item label="地图选择">
        <l-select :options="main.DIC.MAP"
                     v-model="main.activeOption.mapData"
                     placeholder="请选择地图"></l-select>
      </el-form-item>
      <el-form-item label="地图比例">
        <el-slider v-model="main.activeOption.zoom"
                     :max="5"
                     :step="0.1"></el-slider>
      </el-form-item>
      <el-form-item label="字体大小">
        <el-input-number v-model="main.activeOption.fontSize" controls-position="right" :min="12" ></el-input-number>
      </el-form-item>
      <el-form-item label="字体高亮颜色">
        <l-input-color v-model="main.activeOption.empColor"></l-input-color>
      </el-form-item>
      <el-form-item label="字体颜色">
        <l-input-color v-model="main.activeOption.color"></l-input-color>
      </el-form-item>
      <el-form-item label="区域线">
        <el-input-number  v-model="main.activeOption.borderWidth" controls-position="right" ></el-input-number>
      </el-form-item>
      <el-form-item label="区域颜色">
        <l-input-color v-model="main.activeOption.areaColor"></l-input-color>
      </el-form-item>
      <el-form-item label="区域高亮颜色">
        <l-input-color v-model="main.activeOption.empAreaColor"></l-input-color>
      </el-form-item>
      <el-form-item label="边框颜色">
        <l-input-color v-model="main.activeOption.borderColor"></l-input-color>
      </el-form-item>

    </template>
    <template v-if="main.activeOption.type===1">
      <el-form-item label="图片地址">
        <l-input v-model="main.activeOption.img"></l-input>
      </el-form-item>
      <el-form-item label="地图比例">
        <el-slider v-model="main.activeOption.scale"
                     :max="300"></el-slider>
      </el-form-item>
    </template>
  </div>
</template>

<script>
export default {
  inject: ["main"]
}
</script>

<style>
</style>