import { defineStore } from "pinia"
import accountLoginRequest, { getUserInfoById, getUserMenusByRoleId } from "@/service/login/login"
import type { IAccount } from '@/types'
import { localCache } from "@/utils/cache";
import { mapMenusToRoutes } from "@/utils/map-menus"
import router from "@/router";
import { LOGIN_TOKEN } from "@/global/constants";
import useMainStore from "../main/main";
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
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
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
      localCache.setCache('userMenus', userMenusRes.data)

      // 登录的请求所有的角色roles和部门departments数据
      const mainStore = useMainStore();
      mainStore.fetchEntireDataAction()
      // 动态添加路由
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach(route => router.addRoute('main', route))

      // 页面跳转 main
      router.push("/main")

    },
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN);
      const userInfo = localCache.getCache('userInfo');
      const userMenus = localCache.getCache('userMenus');
      if (token && userInfo && userMenus) {
        // 用户刷新的时候默认加载数据
        this.token = token;
        this.userInfo = userInfo;
        this.userMenus = userMenus;

        // 刷新的时候再次请求所有的角色roles和部门departments数据
        const mainStore = useMainStore();
        mainStore.fetchEntireDataAction()
        // 刷新的时候加载动态路由
        // 动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach(route => router.addRoute('main', route))

      }

    }
  }
})


export default useLoginStore
