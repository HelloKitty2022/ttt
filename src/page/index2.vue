<template>
  <div class="index">
    <div class="header">
      <div class="title">
        <p>
          LEARUN-DATA<br />
          <small>可视化数据大屏</small>
        </p>
      </div>
      <el-menu class="nav"
               mode="horizontal"
               :default-active="activeName"
               background-color="rgba(0,0,0,0)"
               text-color="#fff"
               @select="handleSelect"
               active-text-color="#00baff">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          大屏管理
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-location-information"></i>
          地图管理
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-folder-opened"></i>
          分类管理
        </el-menu-item>
        <el-menu-item index="4"
                      @click="goData">
          在线文档
        </el-menu-item>

      </el-menu>
      <img src="/img/header4.jpg" style="width:100%" >
    </div>
    <el-scrollbar class="main">
      <list v-if="activeName==1"></list>
      <maps v-if="activeName==2"></maps>
      <category v-if="activeName==3"></category>
    </el-scrollbar>
  </div>
</template>
<script>
import list from './list/index'
import maps from './list/map'
import category from './list/category'
export default {
  name: "index",
  components: {
    list,
    maps,
    category
  },
  data () {
    return {
      activeName: '1',
    }
  },
  created () {

  },
  methods: {
    goData () {
      window.open('https://www.kancloud.cn/smallwei/avue-doc')
    },
    handleSelect (key) {
      this.activeName = key;
    },
  }
}
</script>
<style lang="scss">
.index {
  height: 100%;
  .header {
    position: relative;
    padding: 0;
    height: 200px !important;
    .nav {
      margin: 0 20px;
      width: 100%;
      position: absolute;
      bottom: 10px;
      border: none;
      .el-menu-item {
        background-color: rgba(0, 0, 0, 0) !important;
      }
    }
    .title {
      position: absolute;
      top: 30px;
      left: 30px;
      font-size: 34px;
      color: rgb(0, 186, 255);
      font-weight: 500;
    }
    .title small {
      font-size: 18px;
    }
  }
  .main {
    width: 100%;
    height: calc(100% - 220px);
  }
}
</style>