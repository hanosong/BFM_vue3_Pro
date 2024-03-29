import { defineStore } from 'pinia'
import { postUsersListData, delUserById, newUserData, editUserData, postPageListData, deletePageById, newPageData, editPageData } from '@/service/main/system/system'
import type { ISystemState } from './type';


const useSystemStore = defineStore("system", {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
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
    },
    /** 针对页面的数据：增删改查*/
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListRes = await postPageListData(pageName, queryInfo);
      const { totalCount, list } = pageListRes.data;
      this.pageList = list;
      this.pageTotalCount = totalCount;
    },
    // 删除
    async deletePageByIdAction(pageName: string, id: number | string) {
      const delRes = await deletePageById(pageName, id);
      // 刷新
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    // 新建
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newPageRes = await newPageData(pageName, pageInfo);
      // 刷新
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction(pageName: string, id: number, queryInfo: any) {
      const editRes = await editPageData(pageName, id, queryInfo);
      // 刷新
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
