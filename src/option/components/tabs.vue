<!-- 选项卡配置 -->
<template>
  <div>
    <el-form-item label="字体大小">
      <el-input-number v-model="main.activeOption.fontSize" controls-position="right"
                         :max="200"></el-input-number>
    </el-form-item>
    <el-form-item label="字体颜色">
      <l-input-color v-model="main.activeOption.color"></l-input-color>
    </el-form-item>
    <!--<el-form-item label="类型">
      <l-radio v-model="main.activeOption.type"
                  :options="dicOption.tabsTypeList"></l-radio>
    </el-form-item>-->
    <template v-if="main.activeOption.type==='tabs'">
      <el-form-item label="字体间距">
        <el-input-number v-model="main.activeOption.split" controls-position="right"></el-input-number>
      </el-form-item>
      <el-collapse accordion>
        <el-collapse-item title="边框设置">
          <el-form-item label="背景颜色">
            <l-input-color v-model="main.activeOption.backgroundColor"></l-input-color>
          </el-form-item>
          <el-form-item label="图标间距">
            <el-input-number v-model="main.activeOption.iconSplit" controls-position="right"></el-input-number>
          </el-form-item>
          <el-form-item label="图标大小">
            <el-input-number v-model="main.activeOption.iconSize" controls-position="right" ></el-input-number>
          </el-form-item>
          <el-form-item label="图片地址">
            <img v-if="main.activeOption.backgroundImage"
                 :src="main.activeOption.backgroundImage.replace('$BASE_URL',this.apiUrl)"
                 alt=""
                 width="100%" />
            <el-input v-model="main.activeOption.backgroundImage">
              <div @click="main.handleOpenImg('activeOption.backgroundImage','datav_imgk')"
                   slot="append">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-input>
          </el-form-item>
          <el-form-item label="边框颜色">
            <l-input-color v-model="main.activeOption.borderColor"></l-input-color>
          </el-form-item>
          <el-form-item label="边框宽度">
            <el-input-number v-model="main.activeOption.borderWidth" controls-position="right"
                               :max="10">
            </el-input-number>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="高亮设置">
          <el-form-item label="字体高亮颜色">
            <l-input-color v-model="main.activeOption.empColor"></l-input-color>
          </el-form-item>
          <el-form-item label="背景图片">
            <img v-if="main.activeOption.empBackgroundImage"
                 :src="main.activeOption.empBackgroundImage.replace('$BASE_URL',this.apiUrl)"
                 alt=""
                 width="100%" />
            <el-input v-model="main.activeOption.empBackgroundImage">
              <div @click="main.handleOpenImg('activeOption.empBackgroundImage','datav_imgk')"
                   slot="append">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-input>
          </el-form-item>
          <el-form-item label="边框颜色">
            <l-input-color v-model="main.activeOption.empBorderColor"></l-input-color>
          </el-form-item>
          <el-form-item label="边框宽度">
            <el-input-number v-model="main.activeOption.empBorderWidth" controls-position="right"
                               :max="10">
            </el-input-number>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </template>
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