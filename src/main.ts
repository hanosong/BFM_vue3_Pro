import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import './assets/css/index.less' // vite 默认支持less，需要安装
import 'element-plus/dist/index.css'
// import "element-plus/theme-chalk/el-message.css"; // 引入message样式
import registerIcons from './global/register-icons'

const app = createApp(App)
app.use(registerIcons) // use 一个函数， 函数会自动调用
app.use(store)
app.use(router) // 最后再加载路由
app.mount('#app')
