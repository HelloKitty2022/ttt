<!-- 翻牌器配置 -->
<template>
  <div>
    <el-form-item label="整体" v-if="main.activeObj.title != '颜色块'">
      <el-switch v-model="main.activeOption.whole">
      </el-switch>
    </el-form-item>
    <el-form-item label="精度">
      <el-input-number v-model="main.activeOption.decimals" controls-position="right" >
      </el-input-number>
    </el-form-item>
    <el-form-item label="行数" v-if="main.activeObj.title == '颜色块'" >
      <el-input-number v-model="main.activeOption.span" controls-position="right" >
      </el-input-number>
    </el-form-item>
    <el-collapse accordion>
      <el-collapse-item title="边框设置">
        <el-form-item label="X间距">
          <el-slider v-model="main.activeOption.splitx"></el-slider>
        </el-form-item>
        <el-form-item label="Y间距">
          <el-slider v-model="main.activeOption.splity"></el-slider>
        </el-form-item>
        <!--<el-form-item label="边框宽度" v-if="main.activeObj.title == '颜色块'">
          <el-input-number v-model="main.activeOption.width" :max="1000" controls-position="right" >
          </el-input-number>
        </el-form-item>
        <el-form-item label="边框高度" v-if="main.activeObj.title == '颜色块'">
          <el-input-number v-model="main.activeOption.height" :max="1000" controls-position="right" >
          </el-input-number>
        </el-form-item>-->
        <el-form-item label="边框" v-if="main.activeObj.title != '颜色块'">
          <l-radio v-model="main.activeOption.type"
                      :options="dicOption.border">
          </l-radio>
        </el-form-item>
        <template v-if="main.activeOption.type==='border'" >
          <el-form-item label="边框颜色">
            <l-input-color v-model="main.activeOption.borderColor"></l-input-color>
          </el-form-item>
          <el-form-item label="边框宽度">
            <el-input-number v-model="main.activeOption.borderWidth" :max="10" controls-position="right" >
            </el-input-number>
          </el-form-item>
        </template>
        <template v-if="main.activeOption.type==='img'" >
          <el-form-item label="图片地址">
            <img v-if="main.activeOption.backgroundBorder"
                 :src="main.activeOption.backgroundBorder.replace('$BASE_URL',this.apiUrl)"
                 alt=""
                 width="100%" />
            <el-input v-model="main.activeOption.backgroundBorder">
              <div @click="main.handleOpenImg('activeOption.backgroundBorder','datav_imgk')"
                   slot="append">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-input>
          </el-form-item>
        </template>
        <el-form-item label="背景颜色" v-if="main.activeObj.title != '颜色块'">
          <l-input-color v-model="main.activeOption.backgroundColor"></l-input-color>
        </el-form-item>
        <el-form-item label="背景图片" v-if="main.activeObj.title != '颜色块'">
          <img v-if="main.activeOption.backgroundImage"
               :src="main.activeOption.backgroundImage.replace('$BASE_URL',this.apiUrl)"
               alt=""
               width="100%" />
          <el-input v-model="main.activeOption.backgroundImage">
            <div @click="main.handleOpenImg('activeOption.backgroundImage','datav_img')"
                 slot="append">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="内部设置">
        <el-form-item label="字体大小">
          <el-input-number v-model="main.activeOption.fontSize" :max="200" controls-position="right" >
          </el-input-number>
        </el-form-item>
        <el-form-item label="字体颜色">
          <l-input-color v-model="main.activeOption.color"></l-input-color>
        </el-form-item>
        <el-form-item label="文字粗细">
          <l-select v-model="main.activeOption.fontWeight"
                       :options="dicOption.fontWeight">
          </l-select>
        </el-form-item>
        <el-form-item label="对其方式">
          <l-select v-model="main.activeOption.textAlign"
                       :options="dicOption.textAlign">
          </l-select>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="前缀设置">
        <template v-if="!main.activeOption.whole">
          <el-form-item label="前缀内容">
            <el-input v-model="main.activeOption.prefixText"></el-input>
          </el-form-item>
        </template>
        <template v-if="!main.activeOption.row">
          <el-form-item label="对其方式">
            <l-select v-model="main.activeOption.prefixTextAlign"
                         :options="dicOption.textAlign">
            </l-select>
          </el-form-item>
        </template>
        <el-form-item label="X间距">
          <el-slider v-model="main.activeOption.prefixSplitx"></el-slider>
        </el-form-item>
        <el-form-item label="Y间距">
          <el-slider v-model="main.activeOption.prefixSplity"></el-slider>
        </el-form-item>
        <el-form-item label="颜色">
          <l-input-color v-model="main.activeOption.prefixColor"></l-input-color>
        </el-form-item>
        <el-form-item label="字体大小">
          <el-input-number v-model="main.activeOption.prefixFontSize"
                             :max="200" controls-position="right">
          </el-input-number>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="后缀设置">
        <template v-if="!main.activeOption.whole">
          <el-form-item label="后缀内容">
            <el-input v-model="main.activeOption.suffixText"></el-input>
          </el-form-item>
        </template>
        <template v-if="!main.activeOption.row">
          <el-form-item label="对其方式">
            <l-select v-model="main.activeOption.suffixTextAlign"
                         :options="dicOption.textAlign">
            </l-select>
          </el-form-item>
        </template>
        <el-form-item label="X间距">
          <el-slider v-model="main.activeOption.suffixSplitx"></el-slider>
        </el-form-item>
        <el-form-item label="Y间距">
          <el-slider v-model="main.activeOption.suffixSplity"></el-slider>
        </el-form-item>
        <el-form-item label="颜色">
          <l-input-color v-model="main.activeOption.suffixColor"></l-input-color>
        </el-form-item>
        <el-form-item label="字体大小">
          <el-input-number v-model="main.activeOption.suffixFontSize" controls-position="right"
                             :max="200">
          </el-input-number>
        </el-form-item>
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