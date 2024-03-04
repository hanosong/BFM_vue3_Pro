import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less' // vite 默认支持less，需要安装
import App from './App.vue'
import router from './router'
import pinia from './store'

const app = createApp(App)
app.use(router)
app.use(pinia)

app.mount('#app')
