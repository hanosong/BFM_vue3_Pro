import { defineStore } from "pinia"
import accountLoginRequest, { getUserInfoById, getUserMenusByRoleId } from "@/service/login/login"
import type { IAccount } from '@/types'
import { localCache } from "@/utils/cache";
import { mapMenuListToPermissions, mapMenusToRoutes } from "@/utils/map-menus"
import router from "@/router";
import { LOGIN_TOKEN, IS_PC } from "@/global/constants";
import useMainStore from "../main/main";
import { judgeClient } from "@/utils/device";
interface ILoginState {
  token: string
  userInfo: any /* {
    role?: {
      id: number
    }
  } */
  userMenus: any
  permissions: string[]
  isPc: boolean
}
const useLoginStore = defineStore('login', {
  // 指定state返回值的类型
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [], // data：一级路由，data.children: 二级路由
    permissions: [], // 按钮权限
    isPc: true,
  }),
  actions: {
    /**
     * 点击登录的时候触发，保存角色信息，动态添加路由并跳转到main页面(由路由拦截重定向到第一个子菜单页面)
     * @param account {name: string, password: string | number} 用户名 / 密码
     */
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

      // 获取设备信息
      const isPc = judgeClient()
      this.isPc = isPc
      localCache.setCache(IS_PC, JSON.stringify(isPc))
      // 根据角色信息请求用户的权限菜单 menus
      const userMenusRes = await getUserMenusByRoleId(this.userInfo.role.id) // 返回菜单的url，如果有二级菜单，则二级菜单的url在children属性中
      console.log("userMenusRes: ", userMenusRes)
      const userMenus = userMenusRes.data;
      this.userMenus = userMenus

      // 进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenusRes.data)

      // ! 获取登录用户的所有按钮的权限 (从userMenus里面取)
      const permissions = mapMenuListToPermissions(userMenus)
      this.permissions = permissions

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
      const isPc = localCache.getCache('isPc');
      if (token && userInfo && userMenus && isPc) {
        // 用户刷新的时候默认加载数据
        this.token = token;
        this.userInfo = userInfo;
        this.userMenus = userMenus;
        this.isPc = JSON.parse(isPc);

        // 刷新的时候再次请求所有的角色roles和部门departments数据
        const mainStore = useMainStore();
        mainStore.fetchEntireDataAction()

        // ! 获取登录用户的所有按钮的权限 (从userMenus里面取)
        const permissions = mapMenuListToPermissions(userMenus)
        this.permissions = permissions

        // 刷新的时候加载动态路由
        // 动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach(route => router.addRoute('main', route))

      }

    }
  }
})


export default useLoginStore
