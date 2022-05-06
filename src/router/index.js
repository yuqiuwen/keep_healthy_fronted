import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {path: '/', redirect: '/home'},
  {path: '/login', name: 'Login',component:() => import('../views/common/Login')},
  {path: '/register', name: 'Register',component:() => import('../views/common/Login')},
  {path: '/home', name: 'Home', component:() => import('../views/common/Home.vue')},
  {
    path: '/user-center',
    name: 'UserCenter',
    component: () => import('../views/admin/home.vue'),
    children: [
      // { name: 'Logut', path: 'logout', component: () => import('../views/admin/home.vue')},
      // {icon: '', title: '编辑文章', path: '/article/edit'},
    ]
  },
  {
    path: '/health-center',
    name: 'Health',
    component: () => import('../views/health/index.vue'),
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'diabetes',
        name: 'Diabetes',
        component: () => import('../views/health/diabetes.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 前置守卫，判断是否登录
router.beforeEach((to, from, next) => {
  //debugger
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');
  if (to.name ==='Home') next()
  else if (to.name !== 'Login'  && !token) next({ name: 'Login' });
  else next()
});

export default router
