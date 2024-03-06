import {defineStore} from "pinia"
import accountLoginRequest, { getUserInfoById, getUserMenusByRoleId } from "@/service/login/login"
import type { IAccount } from '@/types'
import { localCache } from "@/utils/cache";
import router from "@/router";
import { LOGIN_TOKEN } from "@/global/constants";
import type { RouteRecordRaw } from "vue-router";
interface ILoginState {
  token: string
  userInfo: any /* {
    role?: {
      id: number
    }
  } */
  userMenus: any
}
const useLoginStore = defineStore('login', {
  // 指定state返回值的类型
  state: (): ILoginState =>({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo:  localCache.getCache('userInfo') ?? {},
    userMenus:  localCache.getCache('userMenus')  ?? [],
  }),
  actions: {
    async loginAccountAction(account: IAccount){
      const loginRes = await accountLoginRequest(account)
      // 保存在pinia中的数据是在内存中的，还需要做持久化，防止用户刷新
      const id = loginRes.data.id;
      // const name = loginRes.data.name;
      this.token = loginRes.data.token;
      localCache.setCache(LOGIN_TOKEN, this.token) // 先存token，其他请求要用
      // 获取用户信息
      const userInfoRes = await getUserInfoById(id)
      const userInfo = userInfoRes.data;
      this.userInfo = userInfo

      // 根据角色信息请求用户的权限菜单 menus
      const userMenusRes = await getUserMenusByRoleId(this.userInfo.role.id)
      console.log("userMenusRes: ", userMenusRes)
      this.userMenus = userMenusRes.data

      // 进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus',  userMenusRes.data)

      // 页面跳转前要动态的添加路由
      // 1. 获取菜单 usermenus
      // 2. 动态获取所有的路由对象，放在数组中，
      //  路由对象都是在独立的文件中的
      //  从文件中将所有的路由对象读取到数组中
      // 3. 根据菜单去匹配正确的路由 router.addRoute()

      const localRoutes:RouteRecordRaw[] = [] // RouteRecordRaw router类型
      // 1.1 读取router/main 所有的ts文件 webpack中叫require.context()
      // ** => 匹配所有子目录； 如果不写**，则只会加载main下面的直接文件
      const files:Record<string, any> = import.meta.glob('../../router/main/**/*.ts', {
        eager: true
      }) // 如果不写eager则返回一个函数(类似懒加载)； 写了eager则返回每个模块的信息

      for(const key in files) {
        const module = files[key];
        // console.log(module, "module")
        localRoutes.push(module.default);
      }

      // 所有的路由和根据菜单的路由进行取交集
      for(const menu of this.userMenus) {
        console.log("menu: ", menu);
        for(const submenu of menu.children){
          const route = localRoutes.find(item => item.path === submenu.url)
          if(route) router.addRoute('main', route)
        }
      }


      // 页面跳转 main
      router.push("/main")

    }
  }
})


export default useLoginStore
