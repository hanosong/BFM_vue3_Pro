import { defineStore } from 'pinia'
import { getEntireDepartments, getEntireRoles, getEntireMenus } from '../../service/main/main';
import { postPageListData } from '@/service/main/system/system';

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
      // const deparmentsRes = await getEntireDepartments(); // 全量部门数据不传参数返回的数据不全，改为传入参数返回的数据
      const _deparmentsRes = await postPageListData('department', { offset: 0, size: 9999 });
      console.log(_deparmentsRes, "_deparmentsRes")
      const menuEntireRes = await getEntireMenus();
      // 保存数据
      this.entireRoles = entireRes.data.list;
      this.entireDepartments = _deparmentsRes.data.list;
      this.entireMenus = menuEntireRes.data.list;
    },
  }
})

export default useMainStore
