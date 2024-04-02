import { createPinia } from 'pinia'
import useLoginStore from './login/login'
import type { App } from 'vue'
const pinia = createPinia()
const registerStore = (app: App<Element>) => {
  // 1. use pinia
  app.use(pinia)
  // 2. 加载本地数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
  // 3.判断设备是不是移动端
}

export default registerStore
