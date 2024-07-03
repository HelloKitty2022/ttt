<template>
  <div class="build">
    <imglist ref="imglist" @change="handleSetimg"></imglist>
    <top ref="top"></top>
    <div :class="['app', { view: !menuFlag }]">
      <div class="menu" v-show="menuFlag" @click.self="handleMouseDown">
        <p class="title">图层</p>
        <div class="l-datav-layer">
          <layer ref="layer" :nav="nav"></layer>
        </div>
      </div>
      <!-- 中间区域 -->
      <div ref="wrapper" class="l-wrapper">
        <div class="refer-line-img" @click="imgClick">
          <img :src="isShowReferLine ? imgOpenData : imgClose" />
        </div>
        <sketch-rule
          :thick="thick"
          :scale="scale"
          :width="width"
          :height="height"
          :startX="startX"
          :startY="startY"
          :isShowReferLine="isShowReferLine"
          :palette="palette"
          :shadow="shadow"
          :horLineArr="lines.h"
          :verLineArr="lines.v"
        ></sketch-rule>
        <div
          ref="screensRef"
          id="screens"
          :class="dragSlide ? 'dragghanle' : ''"
          @mousedown.stop="dragMousedown"
          @mouseup="dragMouseup"
          @mousemove="dragMousemove"
          @wheel="handleWheel"
          @scroll="handleScroll"
        >
          <div
            ref="containerRef"
            class="screen-container"
            :style="`background: url(${rootUrl}img/datav-bg.png) repeat;`"
          >
            <div class="canvas" ref="canvas">
              <container
                ref="container"
                :scale="scale"
                :menuFlag="menuFlag"
              ></container>
            </div>
          </div>
        </div>
      </div>

      <div class="params" v-show="menuFlag">
        <div class="l-auto-window">
          <el-tabs class="tabs" stretch v-model="tabsActive">
            <el-tab-pane name="0">
              <el-tooltip
                slot="label"
                effect="dark"
                content="配置"
                placement="top"
              >
                <div><i class="el-icon-setting"></i></div>
              </el-tooltip>
              <el-form label-width="100px" label-position="left" size="mini">
                <!-- 组件配置 -->
                <template v-if="!vaildProp('', [undefined])">
                  <div class="ctitle">{{ activeObj.title }}</div>
                  <el-form-item label="图层名称" style="margin-top: 8px">
                    <el-input v-model="activeObj.name"></el-input>
                  </el-form-item>
                  <el-form-item label="隐藏">
                    <el-switch v-model="activeObj.display"></el-switch>
                  </el-form-item>
                  <!--<template v-if="vaildProp('colorList')">
                    <el-form-item label="系统配色">
                      <el-switch v-model="activeOption.switchTheme"></el-switch>
                    </el-form-item>
                    <el-form-item label="配色选择"
                                  v-if="activeOption.switchTheme">
                      <l-select v-model="activeOption.theme"
                                  :options="dicOption.themeList">
                      </l-select>
                    </el-form-item>
                  </template>-->
                  <component :is="activeComponent.prop + 'Option'"></component>
                  <main-option></main-option>
                </template>
                <!-- 主屏的配置项 -->
                <template v-else>
                  <el-form-item label="大屏宽度" style="margin-top: 8px">
                    <el-input-number
                      v-model="config.width"
                      controls-position="right"
                      :min="1"
                    ></el-input-number>
                  </el-form-item>
                  <el-form-item label="大屏高度">
                    <el-input-number
                      v-model="config.height"
                      controls-position="right"
                      :min="1"
                    ></el-input-number>
                  </el-form-item>
                  <el-form-item label="大屏简介">
                    <el-input
                      v-model="config.info"
                      type="textarea"
                      :rows="5"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="背景颜色">
                    <l-input-color
                      v-model="config.backgroundColor"
                    ></l-input-color>
                  </el-form-item>
                  <el-form-item label="背景图片">
                    <div
                      class="l-block"
                      style="width: 100%; height: 140px; padding-bottom: 40px"
                    >
                      <el-image
                        v-if="config.backgroundImage"
                        style="width: 100%; height: 100%; border-radius: 4px"
                        :src="
                          config.backgroundImage.replace('$BASE_URL', apiUrl)
                        "
                        :fit="cover"
                      ></el-image>
                      <div
                        style="
                          position: absolute;
                          bottom: 0;
                          left: 0;
                          width: 100%;
                          height: 32px;
                        "
                      >
                        <el-button
                          type="primary"
                          size="mini"
                          @click="
                            handleOpenImg('config.backgroundImage', 'datav_bg')
                          "
                          >选择图片</el-button
                        >
                        <el-button
                          type="danger"
                          size="mini"
                          @click="handleSetimg('', 'config.backgroundImage')"
                          >清空图片</el-button
                        >
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item label="环境地址">
                    <el-input
                      type="textarea"
                      :rows="3"
                      v-model="config.url"
                    ></el-input>
                  </el-form-item>
                  <!--<el-form-item label="参数">
                    <el-button size="mini"
                              type="primary"
                              @click="openCode('query')">编辑</el-button>
                  </el-form-item>-->
                  <!--<el-form-item label="水印(预览有效)">
                     <el-switch
                        :active-value="true"
                        :inactive-value="false"
                        v-model="config.mark.show"
                        >
                    </el-switch>
                  </el-form-item>
                  <template v-if="config.mark.show">
                    <el-form-item label="内容">
                      <el-input v-model="config.mark.text"></el-input>
                    </el-form-item>
                    <el-form-item label="大小">
                      <el-input-number v-model="config.mark.fontSize"  controls-position="right" :min="12" ></el-input-number>
                    </el-form-item>
                    <el-form-item label="颜色">
                      <l-input-color v-model="config.mark.textStyle"></l-input-color>
                    </el-form-item>
                    <el-form-item label="角度">
                      <el-input-number v-model="config.mark.degree"  controls-position="right" :min="1" ></el-input-number>
                    </el-form-item>
                  </template>-->
                </template>
              </el-form>
            </el-tab-pane>
            <!-- 数据配置 -->
            <el-tab-pane name="1" v-if="vaildProp('dataList')">
              <el-tooltip
                slot="label"
                effect="dark"
                content="数据"
                placement="top"
              >
                <div><i class="el-icon-document-copy"></i></div>
              </el-tooltip>
              <el-form label-width="80px" label-position="left" size="mini">
                <el-form-item label="数据类型" style="margin-top: 8px">
                  <l-radio
                    v-model="activeObj.dataType"
                    :options="dicOption.dataType"
                  ></l-radio>
                </el-form-item>
                <el-form-item
                  label="数据值"
                  label-position="top"
                  v-if="activeObj.dataType === 0"
                >
                  <el-button
                    size="mini"
                    type="primary"
                    @click="openCode('data')"
                    >编辑</el-button
                  >
                </el-form-item>
                <el-form-item label="数据源" v-if="activeObj.dataType === 2">
                  <l-select
                    v-model="activeObj.dataSourceCode"
                    placeholder="请选择数据源"
                    size="mini"
                    :options="dataSourceList"
                    lableKey="f_Name"
                    valueKey="f_Code"
                  >
                  </l-select>
                </el-form-item>
                <template>
                  <el-form-item
                    label="接口地址"
                    v-if="activeObj.dataType === 1"
                  >
                    <el-input
                      type="textarea"
                      :min-rows="6"
                      v-model="activeObj.url"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="接口方式"
                    v-if="activeObj.dataType === 1"
                  >
                    <l-radio
                      v-model="activeObj.dataMethod"
                      :options="dicOption.dataMethod"
                    ></l-radio>
                  </el-form-item>
                  <el-form-item
                    label="接口参数"
                    v-if="activeObj.dataType === 1"
                  >
                    <el-button
                      size="mini"
                      type="primary"
                      @click="openCode('dataQuery')"
                      >编辑</el-button
                    >
                  </el-form-item>
                  <el-form-item
                    label="刷新时间"
                    v-if="activeObj.dataType === 1 || activeObj.dataType === 2"
                  >
                    <el-input-number
                      v-model="activeObj.time"
                      controls-position="right"
                    ></el-input-number>
                  </el-form-item>
                </template>
                <el-form-item label="数据处理">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="openCode('dataFormatter')"
                    >编辑</el-button
                  >
                </el-form-item>
                <el-form-item label-width="0">
                  <el-button
                    size="mini"
                    type="primary"
                    class="block"
                    @click="handleRefresh"
                    >刷新</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <!-- 交互事件配置 -->
            <el-tab-pane name="2" v-if="vaildProp('eventList')">
              <el-tooltip
                slot="label"
                effect="dark"
                content="交互"
                placement="top"
              >
                <div><i class="el-icon-thumb"></i></div>
              </el-tooltip>
              <el-form label-width="100px" label-position="left" size="mini">
                <el-form-item label="子类" style="margin-top: 8px">
                  <l-select
                    multiple
                    v-model="activeObj.child.index"
                    :options="childList"
                    :props="childProps"
                  >
                  </l-select>
                </el-form-item>
                <el-form-item label="参数名称">
                  <el-input v-model="activeObj.child.paramName"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <!-- 其他事件配置 -->
            <el-tab-pane name="3" v-if="vaildProp('formatterList')">
              <el-tooltip
                slot="label"
                effect="dark"
                content="事件"
                placement="top"
              >
                <div><i class="el-icon-s-operation"></i></div>
              </el-tooltip>
              <el-form label-width="100px" label-position="left" size="mini">
                <el-form-item label="提示事件" style="margin-top: 8px">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="openCode('formatter')"
                    >编辑</el-button
                  >
                </el-form-item>
                <el-form-item
                  label="点击事件"
                  v-if="vaildProp('clickFormatterList')"
                >
                  <el-button
                    size="mini"
                    type="primary"
                    @click="openCode('clickFormatter')"
                    >编辑</el-button
                  >
                </el-form-item>
                <el-form-item
                  label="标题事件"
                  v-if="vaildProp('labelFormatterList')"
                >
                  <el-button
                    size="mini"
                    type="primary"
                    @click="openCode('labelFormatter')"
                    >编辑</el-button
                  >
                </el-form-item>
                <el-form-item label-width="0">
                  <el-button
                    size="mini"
                    type="primary"
                    class="block"
                    @click="handleRefresh"
                    >刷新</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <!-- 基本参数配置 -->
            <el-tab-pane name="4" v-if="isActive">
              <el-tooltip
                slot="label"
                effect="dark"
                content="参数"
                placement="top"
              >
                <div><i class="el-icon-folder"></i></div>
              </el-tooltip>

              <el-form
                style="padding-top: 8px"
                label-width="100px"
                label-position="left"
                size="mini"
              >
                <el-form-item label="序号">
                  <el-input v-model="activeObj.index" disabled></el-input>
                </el-form-item>
                <el-form-item label="X位置">
                  <el-input-number
                    v-model="activeObj.left"
                    controls-position="right"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="Y位置">
                  <el-input-number
                    v-model="activeObj.top"
                    controls-position="right"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="宽度">
                  <el-input-number
                    v-model="activeComponent.width"
                    controls-position="right"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="高度">
                  <el-input-number
                    v-model="activeComponent.height"
                    controls-position="right"
                  ></el-input-number>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <codeedit
      @submit="codeClose"
      :type="code.type"
      v-model="code.obj"
      :visible.sync="code.box"
    ></codeedit>
    <contentmenu ref="contentmenu"></contentmenu>
  </div>
</template>
<script>
import top from "./group/top";
import container from "@/page/group/container";
import layer from "./group/layer";
import imglist from "./group/imglist";
import codeedit from "./group/code";

import contentmenu from "./group/contentmenu";
import SketchRule from "vue-sketch-ruler";

import { dicOption } from "@/option/config";

import init from "@/mixins/bi.js";
import components from "@/option/components";

import { getDbsourceList } from "@/api/datasource";
export default {
  mixins: [init, components],
  components: {
    top,
    layer,
    SketchRule,
    container,
    contentmenu,
    imglist,
    codeedit,
  },
  data() {
    return {
      menuFlag: true,
      // 按键
      keys: {
        ctrl: false,
      },

      tabsActive: 0,
      // 标尺

      startX: 0, //x轴标尺开始的坐标数值
      startY: 0,
      lines: {
        //初始化水平标尺上的参考线
        h: [],
        v: [],
      },
      rendIndex: 0, //重新渲染组件
      shadow: { x: 0, y: 0 }, // 阴影大小
      thick: 20, //标尺的厚度
      width: 0, // 标尺宽,后面会初始化
      height: 0, // 标尺高,后面会初始化
      isShowReferLine: true, // 显示参考线
      isImgOpen: true, //眼镜打开
      imgOpenData:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAbCAYAAAAOEM1uAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAQNSURBVHja7JdvSON1HMdfP126/shSmaZ1ntuZbTLihOnSdJlPhIquB0VR1DZM9En0wCB3qCXKVOh86mmakdGDOqyHityBidYN1HPYZqbhOZprMGTOUk/9/XryWyxvek5NIu4Lg/H+fPj8Xt/P98/n8xUkSeK/PIT7gP8GoCAI8cTQAoWAHkgFRCAA3AKmgeBRA8VkOSZgMvAy8DZQCqQf4OcFRoDPgYmzAnwdaAAuxpFlCbgGfAR4ThUwYhcE4QngExnw71FWVuax2WwBk8mkSE9PV+7t7Ymrq6vbw8PD0uDgYO7CwsK5KPc14ENJkj497FtxAwqCYAK+kvcbANXV1U6Hw6HIyMh4GlAckJHwzMzMrM1my3a5XNoo01XgPUmSdk8MCLwEfAmoAPLz872jo6OrOTk5xVGBQ0tLS575+fnt7OzsRIPBcD4pKelctL2/v3+mtrbWLIpigixfA94BNk8C+JoMlyRn7WZvb68mISEhI+IQCASmKyoq0jweT25EU6lU4aGhoZnKykpzdNzl5eWbRqPxyWAwmCZL3wJvAHeOA/iCPMsHARwOx7jdbi+JXs7t7e3lrKys1LW1NVWsJXa73ZN6vb40WltfX3cbDIZ0r9ebKUv9wLvxAhYC1+V7je7u7rG6urrn9vu1tbWNNzU1lR90KgsLC5emp6cfB5TRejgc9mg0msyoTNYDXfEAjgFmQGxpaZlobm6OBbFrMpl+dTqd+YdcLztbW1ve5ORk7X6D3++f0ul0+aFQKAXYAF6RJOn6UQGDQBrgE0VRJQjCw7EAjUbj8tTUVN4hgLubm5u3lUrlhVjG+vr6ya6ursgWaJck6fJRAW8AzwNia2vrRGNjY8xltNvtEx0dHc8eRKfX62+73W418NB+m8/nm9LpdE+Fw+FHgD+AS/Fk8CJwI7IHe3t7x2pqau7agxsbG/NqtTp3a2tLGQtwcnJyvKSk5K7JhcPhnzQaTXYwGEyVpQ+AK8c5xd9EZt/e3v59Q0ND6f5LeXFx8cfy8vILfr9fHdEUCsVOX1/fhMViqdgfOxQKzRUUFKh9Pt+JTnHk76vyPZgcqR49PT3nExMTM/+x0XZ3fePj47/Mzc2RlZVFVVVVRkpKin5/3JWVFWdRUVFeIBCInN7v5NJ55ySV5EUZ8lEArVb728jIiDcvL++ZONqo0MDAwK2ampoyURQTZXlI7ob+PI1aXAR8AegiutVqdXZ2dt6zFs/OzrosFstjLpcr+iR3A+9LkrRzKs2CrGUCV4C3on3NZrPHarX+Xlxc/MARu5nLkiRdPbVuJsa4BDQCxjj6QRH4GvgY+PksOmqF3FG/KVcc9T066s+AH86y5Y8eOXI282XQyJtkRv6d/pvk/rPz/wT41wBibRrpeMs+PAAAAABJRU5ErkJggg==", // 左上角图片
      imgClose:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAPYSURBVHja7JVPTFRXFIe/+96gGRHEhQzBFMJKSKSkLTgtGxemSXcktohW2RBmTAjUClIYZ6Cxi+fQDgOCLJgJhqTSBAtLdjaxaSqQWnDSNp2U0I6FFh0SDdV0oMx7pwuZCUXjnyZNuvBsbnLvufe7555zfleJCP+1qReQfwVRSqWmqoFDIE3A+iZXQDbGlMmmNTatP5xPn/0ohOOgLgNtIB8DOlAKvAzsBTKBP4FF4Dvge1DrzwsBaAAuAJ8CxbpuezU/P397QcFLZGVlcf/+fRYXF1lc/G3VNJM/AJ8Dw8CdZ4QoQI4AIWBXaWkpQ0ND5v79+zW73Z5+n9XVVWZnb8rExIQ2MnKZWCz2M/Dhw1d4eiTngXafz2dmZ2ebPp9P6+vrl5qaI2p8fFyi0aheUlJiHj78tpaTs0sHJB6PW4HAJ3og0I2I+AHPkyAeu91uDA4OmrW1tRpAT09vsr29XXM4ciWZTJKXl2ctLCyoHTsy1ZUro+J0OjNSWR8ZGbFcLpeeSCTOAucfBykDpvr7+7c3NjamS+bevXvJ4uIS4vE7tra2tjW/32+7ffu21Ne7rJmZb7VIJKL27Nmjp0ADAwM0NjauAW+IyM2tkAGn8/WG69e/NjVNS20iHA6vd3Z2qrq6OtMwDFswGLROnz6dcffu3WRRUZEVCARwuVzbUv6WZVmVlZXa9PT0RRFp2gq56na7Dw0ODv6jGc6cOWNdu/Zl8saNb/RgMGi1tLSo7u5uaW5u1srLK8yDBw/aursD2ubmcbtPqnA4dFVE3twKuVBeXv7e5OSkabPZ0pGEQuG/WltbicV+0Xbv3m0LBnvWW1qatbNnvclLl4b0c+c+ErfblcoLa2trptPp1CORSEBEWrdCSoBpwzB2ejyedE6Wl5fNsrIyqaiokFAopBwOh/J4PKbf79/mcDiS0WiUnJwcWyoKr9erDMNYBg6ISOxx1dWg6/pAb2+vtZF8DWBqanr96NEalUgkpKCgQJaWljRN04jH43R1dcmpU6dsgBiGobxer3qoGnz2pD5pBfx1dXWaz+czi4qKNECtrKyYY2NjVjQa1fftK7aqq99hdHRUmpqaVEdHhzU/P58xPDycAN4Hws8iK28B/tzc3LJjx96lqqrKOnCggszMzLRmPHjwQM3MzFj19fX63NwcwDJQBUymK+ApEEDtBDkOnFBKvZafv9deWFhIdnYWKysr3Lr1K0tLvydE5CvgJ1AnQZqBi88DSV1aA0qAV4CCDRX+A1gAZoEfN/w/ALqAEyAjzwvZ8mc8KukblgGqD/gCZOyxkBd//P8G8vcAMK383pmr7aEAAAAASUVORK5CYII=",
      dragSlide: false, // 拖动滚动条标记

      dicOption: dicOption,

      code: {
        box: false,
        type: "",
        obj: "",
      },

      dataSourceList: [],
    };
  },
  provide() {
    return {
      main: this,
      contain: this,
    };
  },
  computed: {
    /* 标尺用的 */
    palette() {
      return {
        bgColor: "#181b24", // ruler bg color
        longfgColor: "#BABBBC", // ruler longer mark color
        shortfgColor: "#9C9C9C", // ruler shorter mark color
        fontColor: "#DEDEDE", // ruler font color
        shadowColor: "#525252", // ruler shadow color
        lineColor: "#EB5648",
        borderColor: "#B5B5B5",
        cornerActiveColor: "#fff",
      };
    },
    isActive() {
      return this.active.length !== 0;
    },
    isSelectActive() {
      return this.active.length > 1;
    },
    activeOption() {
      return this.activeObj.option || {};
    },
    activeComponent() {
      return this.activeObj.component || {};
    },
    childList() {
      console.log(this.list,'this.list')
      return this.list.filter((ele) => {
        if (["tabs"].includes(ele.component.prop)) {
          return false;
        }
        return true;
      }).map(t=>({value:t.index,label:t.name}));
    },
  },
  watch: {
    menuFlag() {
      this.initSize();
      this.initScale();
    },
    active(n, o) {
      //隐藏右键菜单
      this.$refs.contentmenu.hide();
      // 初始化选项卡
      this.tabsActive = "0";
    },
  },
  created() {
    this.listenKey();
    this.initresize();
    this.getDbsourceList();
  },
  mounted() {
    this.$nextTick(() => {
      this.initSize();
      this.initScale();
    });
  },
  methods: {
    // 数据源获取
    getDbsourceList() {
      getDbsourceList().then((res) => {
        this.dataSourceList = res.data.data;
        //console.log(res,'getDbsourceList');
      });
    },
    // 代码编辑器
    codeClose(value) {
      if (this.code.type === "query") {
        this.config.query = value;
      } else {
        this.activeObj[this.code.type] = value;
      }
    },
    openCode(type) {
      this.code.type = type;
      if (type === "query") {
        this.code.obj = this.config.query;
      } else {
        this.code.obj = this.activeObj[type];
      }
      this.code.box = true;
    },

    //监听键盘的按键
    listenKey() {
      document.onkeydown = (e) => {
        e = e || window.event;
        if (e.target.nodeName == "TEXTAREA" || e.target.nodeName == "INPUT") {
          return;
        }
        // 按下空格键
        if (e.keyCode == 32) {
          e.preventDefault();
          this.keys.space = true;
        }
        // 如果是delete按键,那么调用删除组件按钮
        if (e.keyCode === 46) {
          // Delete
          //this.deleteMethod()
        }
        if (e.keyCode === 90) {
          // Z
          //this.editorUndo();
        }
        if (e.keyCode === 89) {
          // Y
          //this.editorRedo();
        }
        this.keys.ctrl = e.keyCode === 17;
      };
      document.onkeyup = () => {
        this.keys.ctrl = false;
      };
    },

    // 右键菜单
    handleContextMenu(e, item = {}) {
      if (!item.index) {
        return;
      }
      if (!this.isSelectActive) {
        this.active = [item.index];
      }
      setTimeout(() => {
        this.$refs.contentmenu.show(e.clientX, e.clientY);
      }, 0);
    },
    // 画布设置
    // 初始化缩放
    initScale() {
      let width = window.innerWidth - 16 - this.thick;
      if (this.menuFlag) {
        width -= 524;
      }
      //console.log(this.config.width,'this.config.width');
      if (width < this.config.width) {
        this.scale = width / this.config.width;
      }
    },

    //打开图库
    handleOpenImg(item, type) {
      this.$refs.imglist.openImg(item, type);
    },
    //图库框回调赋值
    handleSetimg(val, type) {
      if (type === "activeObj.data") {
        this.activeObj.data = val;
      }
      if (type === "activeObj.data.value") {
        this.activeObj.data.value = val;
      } else if (type === "activeOption.backgroundImage") {
        this.activeOption.backgroundImage = val;
      } else if (type === "activeOption.backgroundBorder") {
        this.activeOption.backgroundBorder = val;
      } else if (type === "activeOption.empBackgroundBorder") {
        this.activeOption.empBackgroundBorder = val;
      } else if (type === "config.backgroundImage") {
        this.config.backgroundImage = val;
      } else if (type === "activeOption.symbol") {
        this.activeOption.symbol = val;
      }
    },

    //组件配置
    vaildProp(name, list) {
      if (list) {
        return list.includes(this.activeComponent.prop);
      }
      return this.dicOption[name].includes(this.activeComponent.prop);
    },

    /* **************************标尺方法开始******************************* */
    // 滚轮触发
    handleScroll() {
      const screensRect = this.$refs.screensRef.getBoundingClientRect();
      const canvasRect = this.$refs.canvas.getBoundingClientRect();
      // 标尺开始的刻度
      const startX =
        (screensRect.left + this.thick - canvasRect.left) / this.scale;
      const startY =
        (screensRect.top + this.thick - canvasRect.top) / this.scale;
      this.startX = startX >> 0;
      this.startY = startY >> 0;

      if (this.startX == 0) {
        this.startX = -1;
        this.$nextTick(() => {
          this.startX = 0;
        });
      }
      if (this.startY == 0) {
        this.startY = -1;
        this.$nextTick(() => {
          this.startY = 0;
        });
      }
    },
    // 控制缩放值
    handleWheel(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const nextScale = parseFloat(
          Math.max(0.2, this.scale - e.deltaY / 500).toFixed(2)
        );
        this.scale = nextScale;
      }
      this.$nextTick(() => {
        this.handleScroll();
      });
    },
    // 初始化标尺数值
    initSize() {
      let width = window.innerWidth; // 524 两边宽度
      if (this.menuFlag) {
        width -= 524;
      }
      let height = window.innerHeight - 45; // 45  顶部高度
      this.width = width - this.thick;
      this.height = height - this.thick;
      // 画布阴影部分
      this.shadow = { x: 0, y: 0, width, height };
      // 滚动居中
      let dom = this.$refs.containerRef.getBoundingClientRect();
      this.$refs.screensRef.scrollLeft = dom.width / 2 - this.thick;
      this.$refs.screensRef.scrollTop = dom.height / 2 - this.thick;
    },
    // resize
    initresize() {
      window.addEventListener("resize", () => {
        let width = this.width;
        let height = this.height;
        this.initSize();
        this.initScale();
        this.rendIndex++;
      });
    },
    // 图片点击事件
    imgClick() {
      this.isShowReferLine = !this.isShowReferLine;
    },
    // 鼠标按下事件
    dragMousedown(e) {
      // 如果按下了空格键,且按下鼠标左键,那么鼠标变抓手,开启滚动条随鼠标拖动的操作
      if (this.keys.space) {
        this.dragSlide = true;
        window.stardragEvent = e;
        window.startSlideX = this.$refs.screensRef.scrollLeft;
        window.startSlideY = this.$refs.screensRef.scrollTop;
      }
    },
    //鼠标抬起操作
    dragMouseup() {
      this.dragSlide = false;
    },
    // 鼠标移动骚操作
    dragMousemove(e) {
      if (this.dragSlide) {
        let x = e.clientX - window.stardragEvent.clientX;
        let y = e.clientY - window.stardragEvent.clientY;
        this.$refs.screensRef.scrollLeft = window.startSlideX - x;
        this.$refs.screensRef.scrollTop = window.startSlideY - y;
      }
    },

    // 对容器的操作
    handleRefresh(tip) {
      this.$refs.container.handleRefresh(tip);
    },
  },
};
</script>
<style lang="scss">
@import "../styles/build.scss";
</style>