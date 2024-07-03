<template>
  <div class="top-nav l-build-nav">
    <div class="l-top-logo" >
      <img :src="`${rootUrl}img/logob.svg`" class="l-top-logo-bule">
      <p class="l-fullscreen-dialog--title-text"> · 大屏设计器</p>
    </div>
    <el-menu class="nav"
             mode="horizontal"
             background-color="#212528"
             text-color="#fff"
             active-text-color="#409EFF"
             @mousedown="contain.handleMouseDown">
      <el-submenu :index="index+''"
                  v-for="(item,index) in baseList"
                  :key="index">
        <template slot="title">
          <el-tooltip effect="dark"
                      :content="item.label"
                      placement="top">
            <i :class="'nav__icon '+item.icon"></i>
          </el-tooltip>
        </template>
        <div style="width:390px">
          <el-menu-item v-for="(citem,cindex) in item.children"
                        @click="handleAdd(citem.option,true)"
                        :key="cindex"
                        class="menu-inline"
                        :index="`${index}-${cindex}`">
            <div class="usehove">
              <img :src="citem.option.img"
                   class="inside-img">
              <div class="bottom-text">{{citem.label}}</div>
            </div>

          </el-menu-item>
        </div>
      </el-submenu>
      <el-menu-item index="6"
                    @click="handleReset"
                    v-show="!contain.menuFlag">
        <el-tooltip effect="dark"
                    content="还原"
                    placement="top">
          <i class="nav__icon el-icon-refresh-left"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="7"
                    @click="handleView"
                    v-show="contain.menuFlag">
        <el-tooltip effect="dark"
                    content="预览"
                    placement="top">
          <i class="nav__icon el-icon-view"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="8"
                    @click="handleBuild">
        <el-tooltip effect="dark"
                    content="保存"
                    placement="top">
          <i class="nav__icon el-icon-finished"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="9"
                    :disabled='!contain.canUndo'
                    @click="contain.editorUndo">
        <el-tooltip effect="dark"
                    content="撤销"
                    placement="top">
          <i class="nav__icon el-icon-arrow-left"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="10"
                    :disabled='!contain.canRedo'
                    @click="contain.editorRedo">
        <el-tooltip effect="dark"
                    content="重做"
                    placement="top">
          <i class="nav__icon el-icon-arrow-right"></i>
        </el-tooltip>
      </el-menu-item>
    </el-menu>

    <div class="l-top__right">
      <el-tooltip 
                  effect="dark"
                  :content="isFullScren?'退出全屏':'全屏'"
                  placement="bottom">
        <div class="l-top__item">
          <i :class="isFullScren?'el-icon-full-screen':'el-icon-full-screen'"
             @click="handleScreen"></i>
        </div>
      </el-tooltip>
      <el-dropdown>
        <div class="el-dropdown-link">
          <img class="l-top__img"
           :src="this.avatar">
          {{userInfo.f_RealName}}
        </div>
        <el-dropdown-menu slot="dropdown">
          <!--<el-dropdown-item>
            <router-link to="/info/index">{{'个人信息'}}</router-link>
          </el-dropdown-item>-->
          <el-dropdown-item @click.native="handleFramework" >
            {{'关于软件'}}
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout"
                            divided>{{'退出登录'}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    
    <l-dialog
      :title="'关于软件'"
      :visible.sync="frameworkVisible"
      :hasBtns="false"
      :height="240"
      width="560px"
      >
      <div class="l-rblock" >
        <img class="l-framework-img" :src="`${rootUrl}img/login/logo.png`" >
        <div class="l-framework-footer">
          <a :href="website.url" target="_blank">{{website.company}},版本:{{website.version}}</a>
        </div>
      </div>
    </l-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { resetRouter } from '@/router/router'
import { fullscreenToggel } from '@/utils/utils'
import baseList from '@/option/base'
import { updateComponent } from '@/api/visual'
export default {
  inject: ["contain"],
  data () {
    return {
      baseList: baseList,
      frameworkVisible:false
    }
  },
  computed: {
    ...mapGetters([
      "website",
      "userInfo",
      "isFullScren",
    ]),
    avatar:function(){
      return this.userInfo.f_HeadIcon ? `${this.apiUrl}v1/api/user/img/${this.userInfo.f_HeadIcon}` : `${this.rootUrl}img/head.png`
    }
  },
  methods: {
    vaildData (id) {
      const list = [];
      for (var i = 0; i < 20; i++) {
        list.push(i + '')
      }
      return list.includes(id)
    },
    handleView () {
      this.contain.menuFlag = false;
      this.contain.handleInitActive();
      this.contain.initSize();
      this.contain.initScale();
    },
    handleReset () {
      this.contain.menuFlag = true;
      this.contain.initSize();
      this.contain.initScale();
    },
    handleBuild () {
      this.contain.handleInitActive();
      const loading = this.$loading({
        lock: true,
        text: '正在保存配置，请稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$nextTick(() => {
        html2canvas(document.getElementById('container'), {
          useCORS: true,
          backgroundColor: null,
          allowTaint: true
        }).then(canvas => {

          /**保存配置信息 */
          const postData = {
            visual: this.$deepClone(this.contain.visual),
            config: {
              f_Id: this.contain.obj.config.f_Id,
              f_VisualId: this.contain.visual.f_Id,
              f_Detail: JSON.stringify(this.contain.config),
              f_Component: JSON.stringify(this.$deepClone(this.contain.nav)),
            }
          }
          postData.visual.img = canvas.toDataURL('image/jpeg', 0.1)
          updateComponent(postData.visual.f_Id,postData).then(() => {
            loading.close();
            this.$confirm('保存成功大屏配置, 是否打开预览?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let routeUrl = this.$router.resolve({
                path: '/view/' + this.contain.id
              })
              window.open(routeUrl.href, '_blank');
            }).catch(() => {

            });
          }).catch(res => {
            this.$message.error(res.data.info)
            loading.close();
          })
        })
      })
    },
    handleAdd (option, first = false) {
      let obj = this.$deepClone(option);

      console.log(obj);

      obj.left = 0;
      obj.top = 0
      obj.index = this.$uuid();
      if (first) {
        this.contain.nav.unshift(obj);
      } else {
        this.contain.nav.push(obj);
      }

    },
    handleUndo () {
      this.contain.editorUndo()
    },
    handleRedo () {
      this.contain.editorRedo()
    },

    handleScreen () {
      fullscreenToggel();
    },
    setScreen () {
      this.$store.commit("SET_FULLSCREN");
    },
    logout () {
      this.$confirm("您确定要退出当前系统吗?", '提示', {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("FedLogOut").then(() => {
          resetRouter();
          this.$router.push({ path: "/login" });
        });
      }).catch(() => {
      });
    },
    handleFramework(){
      this.frameworkVisible = true;
    }  
  }
}
</script>

<style lang='scss'>
.top-nav {
  .nav {
    border-bottom: 0 !important;
    height: 45px;
    line-height: 45px;
    overflow: hidden;
    margin: auto;
    width: 660px;
  }
  .nav__icon {
    margin-right: 5px;
    font-size: 16px;
  }
  .nav .el-submenu .el-submenu__title,
  .nav .el-menu-item {
    height: 45px;
    line-height: 45px;
    font-size: 12px;
  }

  .el-menu-item {
    height: 100px !important;
  }
}
.el-menu--horizontal {
  .menu-inline {
    text-align: center;
    display: inline-block !important;
  }
  .bottom-text {
    color: #b1b1b1;
  }
  .inside-img {
    width: 110px;
    height: 70px;
    border: 2px solid transparent;
    box-sizing: border-box;
  }
  .inside-img:hover {
    border-color: #006eff;
  }
  .usehove:hover {
    .bottom-text {
      color: #fff;
    }
  }
}

.l-build-nav{
  position: fixed;
  height: 45px;
  width: 100%;
  top:0;
  left: 0;
  background-color: rgb(33, 37, 40);
  .l-top-logo{
    position: absolute;
    top:0;
    left: 16px;
    height: 100%;
    align-items: center;
    display: flex;
    p{
      padding-top: 3px;
      line-height: 56px;
      display: inline-block;
      margin: 0;
      font-size: 18px;
      margin-left: 8px;
      color: #43a6ef;
    }
  }

  .l-top__right{
    height: 100%;
  }
  
}
</style>