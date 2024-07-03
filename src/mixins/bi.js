// bi大屏渲染公共的方法
import common from '@/config'
import { config } from '@/option/config'
import container from '@/page/group/container'

import { getObj } from '@/api/visual'
import { getList as getMapList } from '@/api/map'
import md5 from 'js-md5';
export default {
  components: {
    container
  },
  provide () {
    return {
      contain: this
    };
  },
  data () {
    return {
        id:'',             // 大屏配置id
        obj:{},            // 大屏配置信息对象
        visual:{},         // 大屏信息
        config: config,    // 配置信息
        nav:[],            // 组件信息    
        active:[],
        overactive:'',

        scale: 1,          //缩放

        historyCache: [],            // 历史操作数据用于undo redo
        currentHistoryIndex: -1,     // redo undo 指针
        copyNav: '',                 // 用于监听去干扰,字符串类型,方便比较

        DIC: {
          MAP: []
        },
    }
  },
  watch: {
    nav: {
      handler (val, oldval) {
        this.recordMain(val, oldval)
      },
      deep: true
    }
  },
  computed: {
    list () {
      let result = [];
      //循环处理数据
      const detail = (item) => {
        if (item.children) {
          item.children.forEach(ele => {
            detail(ele);
          })
        } else {
          result.push(item)
        }
      }
      this.nav.forEach(ele => {
        detail(ele);
      })
      const len = result.length - 1;
      result.forEach((ele, index) => {
        ele.zIndex = len - index;
      })
      return result
    },
    activeObj () {
        let result
        if (this.$validatenull(this.active)) {
          return {}
        }
        this.active.forEach(ele => {
          const item = this.findnav(ele, true);
          if (this.active.length > 1) {
            if (!result) result = [];
            result.push(item.obj);
          } else {
            result = item.obj
          }
        })
        return result
    },
    // 能否撤销
    canUndo () {
      return this.currentHistoryIndex > 0
    },
    canRedo () {
      return this.historyCache.length > this.currentHistoryIndex + 1
    },
  },
  created () {
    this.initMap();
  },
  mounted(){
    this.initData();

  },
  methods: {
    //初始化数据
    initData () {
        const id = this.$route ? this.$route.params.id : this.props.id
        this.id = id;
        const isBuild = this.$route ? this.$route.name === '设计大屏' : this.props.name;


        const loading = this.$loading({
            lock: true,
            text: '正在加载中，请稍后',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        getObj(id).then(res => {
            const data = res.data.data;
            this.obj = data;
            const config = data.config;
            this.visual = data.visual;
            const callback = () => {
                //赋值属性
                this.config = JSON.parse(config.f_Detail) || {};
                this.nav = JSON.parse(config.f_Component) || [];
                if (this.config.mark.show && !isBuild) {
                    this.watermark(this.config.mark);
                }
                this.calcData();

                this.initScale();
            }
            //添加水印。只有查看页面生效
            if (!isBuild) {
                const password = this.visual.f_Password
                if (!this.$validatenull(password)) {
                    this.$prompt('请输入密码', '提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    showClose: false,
                    closeOnClickModal: false,
                    inputValidator:(value)=>{
                      if(md5(value) == password){
                        return true;
                      }
                      return "密码不正确";
                    },
                    inputErrorMessage: '密码不正确，请重新输入'
                    }).then(() => {
                    callback();
                    })
                } else {
                    callback();
                }
            } else {
                callback();
            }
            loading.close();
        }).catch((err) => {
            console.log(err)
            loading.close();
        })
    },
    calcData () {
        if (!this.config.mark) this.config.mark = {}
        if (!this.config.query) this.config.query = {}
    },

    //初始化地图数据
    initMap () {
      const isBuild = this.$route ? this.$route.name === '设计大屏' : this.props.name;
      if(isBuild){
        getMapList().then(res => {
          const data = res.data.data;
          this.DIC.MAP = data.map(ele => {
            return {
              label: ele.f_Name,
              value: ele.f_Id
            }
          });
        })
      }
      
    },

    // 获取组件
    findnav (id, type) {
        //循环处理数据
        let obj = undefined;
        let count = 0;
        let parent = undefined;
        let pcount = 0;
        let len = 0;
        const detail = (item, list, i, number = 0) => {
            if (!item.children || type) {
                if (id === item.index) {
                    obj = item;
                    len = Array.isArray(list) ? list.length - 1 : list.children.length - 1;
                    parent = list;
                    pcount = number;
                    count = i;
                }
            }
            if (item.children) {
                item.children.forEach((ele, index) => {
                    detail(ele, item, index, number + 1);
                })
            }
        }
        this.nav.forEach((ele, index) => {
            detail(ele, this.nav, index);
        })
        return {
            obj,
            count,
            len,
            pcount,
            parent
        }
    },


    handleInitActive () {
        this.active = []
    },

    /**历史记录处理 */
    recordMain (val, oldval) {
      let newst = JSON.stringify(val)
      if (newst != this.copyNav) {
        this.copyNav = newst
        this.addHistoryCache(val)
      }
    },
    addHistoryCache (val) {
      if (this.currentHistoryIndex + 1 < this.historyCache.length) {
        this.historyCache.splice(this.currentHistoryIndex + 1)
      }
      this.historyCache.push({
        nav: this.$deepClone(val)
      })
      // 限制undo 纪录步数，最多支持100步操作undo
      this.historyCache.splice(100)
      this.currentHistoryIndex++
    },
    editorUndo () {
      if (!this.canUndo) {
        return;
      }
      this.currentHistoryIndex--
      this.relapceEditorState()
    },
    editorRedo () {
      if (!this.canRedo) {
        return;
      }
      this.currentHistoryIndex++
      this.relapceEditorState()
    },

    relapceEditorState () {
      const prevState = this.historyCache[this.currentHistoryIndex]
      this.nav = this.$deepClone(prevState.nav)
      // 版本回退,本地保存一个,方便后面对比
      this.copyNav = JSON.stringify(prevState.nav)
    }

  }
}