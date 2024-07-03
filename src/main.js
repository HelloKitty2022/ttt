import Vue from 'vue'
import ElementUI from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/router';
import store from './store';
import './permission'; // 权限


import App from './App.vue'
import 'learun-ui-vue/dist2/lui.css'

// 力软定义的组件
import LearunUI from 'learun-ui-vue'
import './styles/common.scss'
import { url,rootUrl,apiUrl } from '@/config'
//注册自定义组件
import './components/'
//导入主题文件
//import '@/theme/index.js'
window.axios = axios;
Vue.config.productionTip = process.env.NODE_ENV !== 'development'
Vue.prototype.url = url;
Vue.prototype.rootUrl = rootUrl;
Vue.prototype.apiUrl = apiUrl;
Vue.prototype.$axios = axios;
/*Vue.use(window.AVUE, {
  size: 'mini'
});*/
Vue.use(ElementUI);
Vue.use(LearunUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
