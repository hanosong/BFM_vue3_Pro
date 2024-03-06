import type { RouteRecordRaw } from "vue-router";

function loadLocalRoutes () {
  const localRoutes:RouteRecordRaw[] = [] // RouteRecordRaw router类型
  // 1.1 读取router/main 所有的ts文件 webpack中叫require.context()
  // ** => 匹配所有子目录； 如果不写**，则只会加载main下面的直接文件
  const files:Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  }) // 如果不写eager则返回一个函数(类似懒加载)； 写了eager则返回每个模块的信息

  for(const key in files) {
    const module = files[key];
    // console.log(module, "module")
    localRoutes.push(module.default);
  }
  return localRoutes
}

export function mapMenusToRoutes(userMenus: any[]) {
      // 页面跳转前要动态的添加路由
      // 1. 获取菜单 usermenus
      // 2. 动态获取所有的路由对象，放在数组中，
      //  路由对象都是在独立的文件中的
      //  从文件中将所有的路由对象读取到数组中
      // 3. 根据菜单去匹配正确的路由 router.addRoute()

      // 1.加载本地路由
      const localRoutes = loadLocalRoutes()


      // 所有的路由和根据菜单的路由进行取交集
      const routes: RouteRecordRaw = []
      for(const menu of userMenus) {
        console.log("menu: ", menu);
        for(const submenu of menu.children){
          const route = localRoutes.find(item => item.path === submenu.url)
          if(route) routes.push(route)
        }
      }
      return routes
}
