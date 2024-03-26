import { localCache } from "@/utils/cache";
import hyRequest from "..";
import type { IAccount } from '@/types'
import { LOGIN_TOKEN } from "@/global/constants";
/**
 *用户登录接口
 * @param account {name: string, password: string | number} 用户名 / 密码
 * @returns 用户id | 用户token
 */
export default function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

/**
 * 获取部门信息 和 角色信息
 * @param id 由用户登录接口返回的id
 * @returns 获取用户部门归属信息department 和 角色role
 */
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`,
    // 后续统一把token放到拦截器中，不需要单独加请求头
    // headers: {
    //   Authorization: "Bearer " + localCache.getCache(LOGIN_TOKEN),
    // }
  })
}


/**
 * 获取菜单列表
 * @param id 由用户登录接口返回的id
 * @returns  路由信息
 */
export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`,
  })
}
