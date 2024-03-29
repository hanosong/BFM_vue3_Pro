import useLoginStore from "@/store/login/login"
/**
 *
 * @param permissionID 权限id
 * @returns 是否具有 增删改查的按钮权限
 */
export const usePermissions = (permissionID: string) => {
  const loginStore = useLoginStore();
  const { permissions } = loginStore
  return !!permissions.find(item => item.includes(permissionID))
}
