// ts的引用声明类型
// 引入.jpg ... 文件类型打包不报错
/// <reference types="vite/client" /> 

// 引入.vue 文件类型打包不报错 => 使用了volar可以解决报错（但是没办法提示.vue文件的类型），但是不使用插件的话需要如下配置
// 声明引入的.vue 文件都是一个个组件类型
/* declare module '*.vue' {
  import { DefineComponent } from 'vue' // DefineComponent 类型，
  const component: DefineComponent
  export default component
}
 */