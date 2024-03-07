import { defineStore } from 'pinia'
import { getEntireDepartments, getEntireRoles } from '../../service/main/main';

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}

const useMainStore = defineStore("main", {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    // 用户登录成功之后就发起这个请求，直接请求角色和部门数据
    async fetchEntireDataAction() {
      const entireRes = await getEntireRoles();
      const deparmentsRes = await getEntireDepartments();
      // 保存数据
      this.entireRoles = entireRes.data.list;
      this.entireDepartments = deparmentsRes.data.list;
    }
  }
})

export default useMainStore
