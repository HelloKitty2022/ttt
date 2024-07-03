import Layout from '@/page/index/'
export default [{
    path: '/login',
    name: '登录页',
    component: () =>
        import( /* webpackChunkName: "page" */ '@/page/login'),
        meta: {
            keepAlive: true,
            isAuth: false
        }
},
{
    path: '/build/:id',
    name: '设计大屏',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/build2')
},{
    path: '/view/:id',
    name: 'view',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/view'),
      meta: {
        isAuth: false
    }
},
{
    path: '/',
    name: '主页',
    redirect: '/visual'
}
]