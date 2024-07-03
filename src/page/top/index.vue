<template>
  <div class="l-top">
    <div class="l-top__left">
      <div class="l-top__logo" ref="topLogo" >
          <div class="l-top__logobox" >  
            <img :src="`${rootUrl}img/logo.png`"><span class="l-top__logotext" > · 可视化数据大屏</span>
          </div>
      </div>
      <div class="l-top__item">
        <top-menu ref="topMenu"></top-menu>
      </div>
    </div>
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
import { resetRouter } from '@/router/router'
import { mapGetters } from "vuex";
import { fullscreenToggel, listenfullscreen } from "@/utils/utils";
import topMenu from "./top-menu";
export default {
  components: {
    topMenu,
  },
  name: "top",
  provide () {
    return {
      top: this
    };
  },
  data () {
    return {
      frameworkVisible:false
    };
  },
  filters: {},
  created () { },
  mounted () {
    listenfullscreen(this.setScreen);
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
};
</script>
<style lang="scss">
    $height:56px;
    .l-top{
        transition: all .3s;
        box-sizing: border-box;
        position: relative;
        padding: 0 284px 0 16px;
        height: $height;
        line-height: $height;
        white-space: nowrap;

        &__left {
            position: relative;
            height: 100%;
            width: 100%;
            padding:0;
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: inherit;
        }
        &__logo{
            box-sizing: border-box;
            display: inline-block;
            position: relative;
            line-height: $height;
            height: $height;
            vertical-align:top;
            margin-right: 8px;
            min-width: 176px;
            .l-top__logobox{
                line-height: $height;
                height: $height;
                display: flex;align-items: center;
                img{align-items: center;}
            }
             .l-top__logotext{
                 margin-left: 8px;
                 color: #fff;
                 font-size: 18px;
             }
        }


        &__right {
            height: $height;
            position: absolute;
            top: 0;
            right: 16px;
            display: flex;
            align-items: center;
            i{
                line-height: $height;
            }
        }

        &__item {
            position: relative;
            display: inline-block;
            height: $height;
            margin:0 8px;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
            &--show {
                display: inline-block !important;
            }
            .el-badge__content.is-fixed{
                top:12px;
                right: 5px;
            }
        }

        &__img {
            margin: 0 4px 0 8px;
            width: 24px;
            height: 24px;
            border-radius: 100%;
            box-sizing: border-box;
            vertical-align: middle;
        }


    }

  .l-framework-img{
    position: absolute;
    top:80px;
    left:114px;
    height: 32px;
  }
  .l-framework-title{
    font-size: 18px;
  }
  .l-framework-footer{
    position: absolute;
    bottom: 16px;
    width: 100%;
    text-align: center;
  }
</style>