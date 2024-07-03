/**
 * 全站权限配置
 * 
 */
import router from './router/router'
import store from './store'
router.beforeEach((to, from, next) => {
  if(to.query.token){
    // 1.获取token值，并写入
    // 2.隐藏边框操作
    store.commit('SET_TOKEN', to.query.token)
  }


  const meta = to.meta || {}
  if (store.getters.token) {
    if (to.path === '/login') { //如果登录成功访问登录页跳转到主页
      next({ path: '/' })
    } 
    else {
      next()
    }
  } else {
    //判断是否需要认证，没有登录访问去登录页
    if (meta.isAuth === false) {
      next()
    } else {
      if(to.query.openToken){
        store.dispatch('Login2',to.query.openToken).then(res=>{
          next({path:to.path});
        }).catch(()=>{
        })
      }
      else{
        next('/login')
      }
      //
    }
  }
})
router.afterEach(() => {
  //router.$lrRouter.setTitle(title);
});