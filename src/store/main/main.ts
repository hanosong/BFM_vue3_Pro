import { defineStore } from 'pinia'
import { getEntireDepartments, getEntireRoles, getEntireMenus } from '../../service/main/main';

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

const useMainStore = defineStore("main", {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: [],
  }),
  actions: {
    // 用户登录成功之后就发起这个请求，直接请求角色和部门数据
    async fetchEntireDataAction() {
      const entireRes = await getEntireRoles();
      const deparmentsRes = await getEntireDepartments();
      const menuEntireRes = await getEntireMenus();
      // 保存数据
      this.entireRoles = entireRes.data.list;
      this.entireDepartments = deparmentsRes.data.list;
      this.entireMenus = menuEntireRes.data.list;
    },
  }
})

export default useMainStore
