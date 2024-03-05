import {defineStore} from "pinia"
import accountLoginRequest from "@/service/login/login"
import type { IAccount } from '@/types'
import { localCache } from "@/utils/cache";

const LOGIN_TOKEN = 'token'
const useLoginStore = defineStore('login', {
  state: () =>({
    id: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    name: '',
  }),
  actions: {
    async loginAccountAction(account: IAccount){
      const loginRes = await accountLoginRequest(account)
      // 保存在pinia中的数据是在内存中的，还需要做持久化，防止用户刷新
      this.id = loginRes.data.id;
      this.token = loginRes.data.token;
      this.name = loginRes.data.name;

      // 进行本地缓存
      // localStorage.setItem('token', this.token);
      localCache.setCache(LOGIN_TOKEN, this.token)
    }
  }
})


export default useLoginStore
