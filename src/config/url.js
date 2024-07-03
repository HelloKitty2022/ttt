// 配置编译环境和线上环境之间的切换
const rootUrl = process.env.NODE_ENV === 'production'
    ? '/datav/'
    : '/'
let apiUrl = ''
if (process.env.NODE_ENV == 'development') {
  apiUrl = `http://10.211.55.4:8000/`; // 开发环境地址
} else if (process.env.NODE_ENV == 'production') {
  apiUrl = `http://dev.learun.cn/datav/`; //生产环境地址
}
export {
  apiUrl,
  rootUrl
}