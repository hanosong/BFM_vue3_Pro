import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from "@/global/constants";
import { localCache } from '@/utils/cache';
import { firstMenu } from "@/utils/map-menus"
const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系: path => component
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main/main.vue'),
      name: 'main',
      // 方法1: 直接配置路由
      // children: [
      //   {
      //     path: '/main/analysis/overview',
      //     component: () =>
      //       import('../views/main/analysis/overview/overview.vue'),
      //   },
      //   {
      //     path: '/main/analysis/dashboard',
      //     component: () =>
      //       import('../views/main/analysis/dashboard/dashboard.vue'),
      //   },
      //   {
      //     path: '/main/system/user',
      //     component: () =>
      //       import('../views/main/system/user/user.vue'),
      //   },
      //   {
      //     path: '/main/system/role',
      //     component: () =>
      //       import('../views/main/system/role/role.vue'),
      //   },
      // ]
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 法2：根据权限手动注册路由
// // 1所有的路由
// const localRoutes =  [
//     {
//       path: '/main/analysis/overview',
//       component: () =>
//         import('../views/main/analysis/overview/overview.vue'),
//     },
//     {
//       path: '/main/analysis/dashboard',
//       component: () =>
//         import('../views/main/analysis/dashboard/dashboard.vue'),
//     },
//     {
//       path: '/main/system/user',
//       component: () =>
//         import('../views/main/system/user/user.vue'),
//     },
//     {
//       path: '/main/system/role',
//       component: () =>
//         import('../views/main/system/role/role.vue'),
//     },
//   ]

// // 2动态的添加路由
// router.addRoute('main', localRoutes[0])
// router.addRoute('main', localRoutes[1])

// 导航守卫
// to: 跳转到的位置
// from：从哪里跳转过来
// return: 返回值决 定导航的路径
console.log(router, 'router')
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN);
  // 非登录页，全部需要校验是否有token
  // 如果是只是想校验main以及其子页面的话，可以使用：to.path.startsWith('/main)
  if (to.path !== '/login' && !token) {
    return '/login'
  }

  // 如果进入的是main页面
  if (to.path === '/main') {
    console.log(firstMenu, 'firstMenu')
    return firstMenu?.url
  }
})
export default router
