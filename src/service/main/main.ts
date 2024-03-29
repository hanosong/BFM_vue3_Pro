import hyRequest from "..";
// 获取所有角色
export const getEntireRoles = () => {
  return hyRequest.post({
    url: "/role/list",
  })
}

// 获取所有部门
export const getEntireDepartments = () => {
  return hyRequest.post({
    url: "/department/list"
  })
}

// 获取所有菜单
export const getEntireMenus = () => {
  return hyRequest.post({
    url: "/menu/list"
  })
}
