import type {App} from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 返回app的类型从createApp 返回值的 类型中找
function registerIcons(app: App<Element>){
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
 export default registerIcons
