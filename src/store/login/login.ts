import {defineStore} from "pinia"
import accountLoginRequest from "@/service/login/login"
import { localCache } from "@/utils/cache";

const useLoginStore = defineStore('login', {
  state: () =>({
    id: '',
    token: localCache.getCache('token') ?? '',
    name: '',
  }),
  actions: {
    async loginAccountAction(account: {name: string, password: string}){
      const loginRes = await accountLoginRequest(account)
      // 保存在pinia中的数据是在内存中的，还需要做持久化，防止用户刷新
      this.id = loginRes.data.id;
      this.token = loginRes.data.token;
      this.name = loginRes.data.name;

      // 进行本地缓存
      // localStorage.setItem('token', this.token);
      localCache.setCache('token', this.token)
    }
  }
})


export default useLoginStore
