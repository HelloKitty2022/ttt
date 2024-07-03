<template>
  <div class="build views">
    <container :props="props"
               ref="container" :scale="scale" :style="styleContainer" style="transform-origin:left top;" ></container>
  </div>
</template>
<script>
import init from '@/mixins/bi.js';

export default {
  props: {
    props: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mixins: [init],
  created () {
    this.initresize();
  },
  data(){
    return {
      marginTop:0,
      marginLeft:0,
    };
  },
  computed:{
    styleContainer(){
      return {
        marginTop:this.marginTop + 'px',
        marginLeft:this.marginLeft + 'px'
      }
    }
  },
  methods:{
    // resize
    initresize () {
      window.addEventListener('resize', () => {
        this.initScale();
      })
    },
    // 初始化缩放
    initScale(){
      let width = window.innerWidth;
      let height = window.innerHeight;
      let scaleW = 1;
      let scaleH = 1;

      //console.log(this.config.width,'this.config.width');
      if(width < this.config.width){
        scaleW = width / this.config.width;
      }

      if(height < this.config.height){
        scaleH = height / this.config.height;
      }

      if(scaleW>scaleH){
        this.scale = scaleH;
        this.marginTop = 0;
        this.marginLeft = (width -this.config.width * scaleH)/2;
      }
      else{
        this.scale = scaleW;
        this.marginLeft = 0;
        this.marginTop = (height -this.config.height * scaleW)/2;
      }



    }
  }
}
</script>
<style lang="scss">
@import "../styles/style.scss";
</style>