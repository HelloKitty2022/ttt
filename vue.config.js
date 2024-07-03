// 基础路径 注意发布之前要先修改这里
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/learun-datav/'
  : '/'

module.exports = {
  publicPath: BASE_URL, // 根据你的实际情况更改这里
  lintOnSave: false,
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
    })
  }
}