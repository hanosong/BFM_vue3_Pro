import hyRequest from '@/service'
/** 获取用户的网络请求 */
export const postUsersListData = (queryInfo: any) => {
  return hyRequest.post({
    url: "/users/list",
    data: queryInfo
  })
}

/** 删除表格数据 */
export const delUserById = (id: number | string) => {
  return hyRequest.delete({
    url: `/users/${id}`,
  })
}

/** 新建用户*/
export const newUserData = (userInfo: any) => {
  return hyRequest.post({
    url: '/users',
    data: userInfo,
  })
}

/** 编辑用户*/
export const editUserData = (id: number, userInfo: any) => {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo,
  })
}

/** 针对页面的网络请求：增删改查*/
export const postPageListData = (pageName: string, queryInfo: any) => {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo,
  })
}

/** 删除*/
export const deletePageById = (pageName: string, id: number | string) => {
  return hyRequest.delete({
    url: `/${pageName}/${id}`,
  })
}


/** 新建*/
export const newPageData = (pageName: string, pageInfo: any) => {
  return hyRequest.post({
    url: `/${pageName}`,
    data: pageInfo,
  })
}

/** 编辑*/
export const editPageData = (pageName: string, id: number, userInfo: any) => {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: userInfo,
  })
}
