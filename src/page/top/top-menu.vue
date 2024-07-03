<template>
  <div class="top-menu" ref="topMenu" >
    <el-menu  ref="elMenuDom" background-color="#021429" text-color="#fff"
  active-text-color="#fff"
             mode="horizontal">
      <template v-for="(item,index) in items">
        <el-menu-item :index="index+''"
                      @click.native="openMenu(index,item)"
                      :class="{'l-is-active':vaildAvtive(item)}"
                      :key="index" v-show="!item.hide" >
          <template slot="title">
            <i :class="item.f_Icon"></i>
            <span>{{item.f_FullName}}</span>
          </template>
        </el-menu-item>
      </template>
      <el-submenu v-if="subItems.length > 0" index="1000" popper-class="top-more-menu" >
        <template slot="title"><i class="el-icon-more"></i></template>
       <template v-for="(item,index) in subItems">
        <el-menu-item :index="'1000'+ index"
                      @click.native="openMenu(items.length+ index,item)"
                      :class="{'l-is-active':vaildAvtive(item)}"
                      :key="'1000'+ index">
          <template slot="title">
            <i :class="item.f_Icon"></i>
            <span>{{item.f_FullName}}</span>
          </template>
        </el-menu-item>
      </template>
      </el-submenu>
    </el-menu>
    <transition name="el-fade-in"  >
      <div class="l-menu-mask" v-show="isMask"></div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const getWidth = elem => {
  let width =
    elem && typeof elem.getBoundingClientRect === 'function' && elem.getBoundingClientRect().width;
  if (width) {
    width = +width.toFixed(6);
  }
  return width || 0;
};


export default {
  name: "top-menu",
  data () {
    return {
      subItems:[],
      isMask:true
    };
  },
  inject: ["top"],
  created () {
    //this.getMenu();
  },
  mounted(){
    this.initTopMenu();
    //this.activeIndex = this.items.findIndex(t=>t.f_UrlAddress == this.nowTagValue);
  },
  computed: {
    ...mapGetters(["screen","userInfo"]),
    items(){
      const modules = [{
        f_EnCode: "visual",
        f_FullName: "大屏管理",
        f_Icon: "el-icon-monitor",
        f_ModuleId: "1",
        f_UrlAddress: '/visual/index',
        hide:false
      },{
        f_EnCode: "dbdata",
        f_FullName: "我的数据",
        f_Icon: "el-icon-coin",
        f_ModuleId: "2",
        f_UrlAddress: '/data/index',
        hide:false
      },{
        f_EnCode: "map",
        f_FullName: "地图管理",
        f_Icon: "el-icon-map-location",
        f_ModuleId: "3",
        f_UrlAddress: '/map/index',
        hide:false
      },{
        f_EnCode: "img",
        f_FullName: "图片管理",
        f_Icon: "el-icon-picture-outline",
        f_ModuleId: "4",
        f_UrlAddress: '/img/index',
        hide:false
      },{
        f_EnCode: "user",
        f_FullName: "用户管理",
        f_Icon: "el-icon-user",
        f_ModuleId: "5",
        f_UrlAddress: '/user/index',
        hide:false
      }];
      return modules;
    },
    nowTagValue () {
      return this.$router.$lRouter.getValue(this.$route);
    }
  },
  watch: {
    screen: function (val) {
      this.setChildrenWidthAndResize(val);
    }
  },
  methods: {
      vaildAvtive (item) {
      return this.nowTagValue === item['f_UrlAddress'];
    },
    openMenu (index,item) {
      this.$router.push({
        path: item.f_UrlAddress
      });
      //this.$store.commit('SET_MENU', this.modulesGroup[item.f_ModuleId] || []);
    },
    initTopMenu(){
      this.$nextTick(() => {
        setTimeout(()=>{
          let _index = 0;
          this.$refs.elMenuDom.$children.forEach(ele => {
              var item = this.items[_index]
              if(item){
                item.width = getWidth(ele.$el);
                _index++;
              }
          });
          this.setChildrenWidthAndResize(this.screen);
          this.isMask = false;
        },30)
      })
    },
    setChildrenWidthAndResize (bodyWidth) {
        let menuWidth = bodyWidth - getWidth(this.top.$refs.topLogo) - 8 - 316;
        let _menuWidth = 0;
        let _subItems = [];
        let len = this.items.length;
        let index = 1;
        this.items.forEach(item =>{
            _menuWidth += item.width;
            if(_menuWidth > menuWidth || (_menuWidth + 56 > menuWidth && len > index )){
              item.hide = true;
              _subItems.push(item);
            }
            else {
              item.hide = false;
            }
            index++;
        })
        this.subItems = _subItems;
    }
  }
};
</script>
<style lang="scss">
$height:56px;
.top-more-menu{
    background: #021429;
}
.el-menu--horizontal.top-more-menu .el-menu-item{
    position: relative;
    padding-left: 32px;
}
.el-menu--horizontal.top-more-menu .el-menu-item .fa{
    position: absolute;
    top:12px;
    left: 8px;
}
.el-menu--horizontal.top-more-menu .el-menu-item:hover,.el-menu--horizontal.top-more-menu .el-menu-item.l-is-active{
    background-color: #007DFF !important;
}
.l-top{

    .top-menu {
        box-sizing: border-box;

        .el-menu-item{
            height: $height;
            line-height: $height;
            color: #fff;
            padding: 0 8px;
            border:none !important;

            span{
                font-size: 13px;
            }
            i{
                font-size: 13px;
                color: #fff;
                opacity: .9;
                filter: alpha(opacity=90);
                margin-right: 4px;
            }

            &:not(.is-disabled):not(.l-is-active):hover{
                outline: 0;
                color: #fff;
                background-color: #007DFF !important;
            }
            &.l-is-active,
            &:not(.is-disabled):focus{
                outline: 0;
                color: #fff;
                background: #252a3d !important;
            }
        }

        .el-submenu__icon-arrow{
            display: none;
        }

        .el-submenu{
            color: #fff;
            width: 56px;
            text-align: center;
            i{
                font-size: 13px;
                color: #fff;
                opacity: .9;
                filter: alpha(opacity=90);
                margin-right: 0;
            }


            &:not(.is-disabled):not(.l-is-active):hover{
                outline: 0;
                color: #fff;
                background-color: #007DFF !important;
            }
            &__title{
                padding: 0;
            }
        }
    }
    .el-dropdown{
        color: #fff;
    }
    .el-dropdown-link{
        display: block;
        color: #fff;
        height: $height;
        cursor: pointer;
    }

    .el-badge{
        vertical-align: top;
    }
}
</style>
<style lang="scss" scoped>
.top-menu {
    box-sizing: border-box;
}
.l-menu-mask{
  position: absolute;
  top:0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #021429;
  z-index: 10;
}
</style>