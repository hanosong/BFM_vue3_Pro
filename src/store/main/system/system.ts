import { defineStore } from 'pinia'
import { postUsersListData, delUserById, newUserData, editUserData } from '@/service/main/system/system'
import type { ISystemState } from './type';


const useSystemStore = defineStore("system", {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListRes = await postUsersListData(queryInfo);
      const { totalCount, list } = usersListRes.data;
      this.usersTotalCount = totalCount;
      this.usersList = list;
    },
    async delUserByIdAction(id: number) {
      const delRes = await delUserById(id)
      // 重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      // 创建新用户
      const newRes = await newUserData(userInfo)
      // 刷新
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 编辑用户数据
      const editRes = await editUserData(id, userInfo)
      // 刷新
      this.postUsersListAction({ offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
