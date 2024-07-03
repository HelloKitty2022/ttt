import store from '@/store/';
import axios from 'axios';
import router from '@/router/router'
import { Message } from 'element-ui'
axios.defaults.timeout = 10000;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
//let loadingInstance = '';
//axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
  const meta = (config.meta || {});
  const isToken = meta.isToken === false;
  if (store.getters.token && !isToken) {
    config.headers.token = store.getters.token // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
  }
  else if(!isToken){
    Message({
      message: '没有登录信息',
      type: 'error'
    })
    store.dispatch('FedLogOut').then(() => router.push({ path: '/login' }));
    return Promise.reject(new Error('没有登录信息'))
  }


  return config
}, error => {
  return Promise.reject(error)
});
//HTTPrequest拦截
axios.interceptors.response.use(res => {
  

  const status = Number(res.status) || 200;
  const message = res.data.info || '未知错误';
  
  //如果是401则跳转到登录页面
  if (status === 401) store.dispatch('FedLogOut').then(() => router.push({ path: '/login' }));
  // 如果请求为非200否者默认统一处理
  if (status !== 200) {
    Message({
      message: message,
      type: 'error'
    })
    return Promise.reject(new Error(message))
  }
  else if(res.data.code && res.data.code != 200){
    Message({
      message: message,
      type: 'error'
    })
    if(res.data.code === 401){
      store.dispatch('FedLogOut').then(() => router.push({ path: '/login' }));
    }
    return Promise.reject(new Error(message))
  }
  return res;
}, error => {
  return Promise.reject(new Error(error));
})

export default axios;