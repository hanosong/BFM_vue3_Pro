import { localCache } from "@/utils/cache";
import hyRequest from "..";
import type { IAccount } from '@/types'
import { LOGIN_TOKEN } from "@/global/constants";
export default function accountLoginRequest (account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}


export function getUserInfoById (id: number) {
  return hyRequest.get({
    url: `/users/${id}`,
    // 统一把token放到拦截器中
    // headers: {
    //   Authorization: "Bearer " + localCache.getCache(LOGIN_TOKEN),
    // }
  })
}

// 获取菜单列表
export function getUserMenusByRoleId (id: number){
  return hyRequest.get({
    url: `/role/${id}/menu`,
  })
}
