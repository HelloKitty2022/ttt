import Layout from '@/page/index'
export default [{
  path: '/visual',
  component: Layout,
  redirect: '/visual/index',
  children: [{
    path: 'index',
    name: '大屏管理',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/page/views/visual/index')
  }]
},{
  path: '/data',
  component: Layout,
  redirect: '/data/index',
  children: [{
    path: 'index',
    name: '我的数据',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/page/views/data/index')
  }]
},{
  path: '/map',
  component: Layout,
  redirect: '/map/index',
  children: [{
    path: 'index',
    name: '地图管理',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/page/views/map/index')
  }]
}, {
  path: '/img',
  component: Layout,
  redirect: '/img/index',
  children: [{
    path: 'index',
    name: '图片管理',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/page/views/img/index')
  }]
},{
  path: '/user',
  component: Layout,
  redirect: '/user/index',
  children: [{
    path: 'index',
    name: '用户管理',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/page/views/user/index')
  }]
},{
  path: '/info',
  component: Layout,
  redirect: '/info/index',
  children: [{
    path: 'index',
    name: '个人信息',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/page/views/user/index')
  }]
}
]