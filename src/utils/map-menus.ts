import type { RouteRecordRaw } from "vue-router";
/**
 * 读取本地写死的路由信息，动态注册路由
 * @returns { path, component} 路径信息和懒加载的路由
 */
function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = [] // RouteRecordRaw router类型
  // 1.1 读取router/main 所有的ts文件 webpack中叫require.context()
  // ** => 匹配所有子目录； 如果不写**，则只会加载main下面的直接文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true, // 如果不写eager则返回一个函数(类似懒加载)； 写了eager则返回每个模块的信息
  })

  for (const key in files) {
    const module = files[key];
    console.log(module.default, "module.default")
    localRoutes.push(module.default);
  }
  return localRoutes
}

export let firstMenu: any = null; // 第一次进入页面的时候，应该进入menu的第一个菜单里
/**
 *
 * 将接口返回来的路由信息，处理成真的路径
 * @param userMenus => { code , data[ { id, name, type, url } ] }
 * @returns 路由
 *  页面跳转前要动态的添加路由
   1. 获取菜单 usermenus
   2. 动态获取所有的路由对象，放在数组中，
    路由对象都是在独立的文件中的
    从文件中将所有的路由对象读取到数组中
   3. 根据菜单去匹配正确的路由 router.addRoute()
 */
export function mapMenusToRoutes(userMenus: any[]) {
  // 1.加载本地路由
  const localRoutes = loadLocalRoutes()
  // 所有的路由和根据菜单的路由进行取交集
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    console.log("menu: ", menu);
    for (const submenu of menu.children) {
      const route = localRoutes.find(item => item.path === submenu.url)
      if (route) {
        // 给顶层菜单(进入后的默认第一个菜单)增加重定向，但是只需要添加一次即可
        if (!routes.find(item => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }

        // 二级菜单
        routes.push(route)
      }
      if (!firstMenu && route) firstMenu = submenu;
    }
  }
  console.log("mapMenusToRoutes==routes: ", routes)
  return routes
}

/**
 * @param path 要匹配的路径
 * @param userMenus 所有的菜单
 *
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface IBreadcrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumbs[] = [];
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
