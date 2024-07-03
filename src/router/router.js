/**
 * 全站路由配置
 *
 * meta参数说明
 * keepAlive是否缓冲页面
 * isTab是否加入到tag导航
 * isAuth是否需要授权
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import PageRouter from './page/'
import ViewsRouter from './views/'
import lrRouter from './l-router';
import Store from '../store/';
import { rootUrl } from '@/config/url';

const originalPush = VueRouter.prototype.push
console.log(originalPush,'originalPush');
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location);//.catch(err => err)
}

Vue.use(VueRouter)
//创建路由
export const createRouter = () => new VueRouter({
  mode: 'history',
  base: rootUrl,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
  routes: [...PageRouter, ...ViewsRouter]
})
const Router = createRouter()


lrRouter.install(Vue, {
  router: Router,
  store: Store,
  keepAlive: false,
});
export function resetRouter () {
  const newRouter = createRouter()
  Router.matcher = newRouter.matcher // reset router
  lrRouter.install(Vue, {
    router: Router,
    store: Store,
    keepAlive: false,
  });
}
export default Router