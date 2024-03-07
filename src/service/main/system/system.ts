import hyRequest from '@/service'
/** 获取用户的网络请求 */
export const postUsersListData = (queryInfo: any) => {
  return hyRequest.post({
    url: "/users/list",
    data: queryInfo
  })
}

/** 删除表格数据 */
export const delUserById = (id: number) => {
  return hyRequest.delete({
    url: `/users/${id}`,
  })
}

