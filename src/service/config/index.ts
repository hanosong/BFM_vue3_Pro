// 方法 1.区分开发环境和生产环境 -- 手动切换（注释）
// export const BASE_URL = 'http://coderwhy.dev:8000'
// export const BASE_URL = 'http://codercba.prod:8000'

// 方法 2.代码逻辑判断, 判断当前环境
// vite默认提供的环境变量
// vite 在开发阶段是不用打包的, 只是对代码做了简单转换，就直接跑到浏览器上 => node无法获取到环境变量
// vite在打包的时候用的是rollup
console.group("vite-环境变量-请求测试");
console.log("mport.meta.env: ", import.meta.env)
console.log("import.meta.env.MODE: ", import.meta.env.MODE) // 应用运行的模式
console.log("import.meta.env.DEV: ", import.meta.env.DEV) // bool是否开发环境
console.log("import.meta.env.PROD: ", import.meta.env.PROD) // bool是否生产环境
console.log("import.meta.env.SSR: ", import.meta.env.SSR) // bool是否是服务器端渲染(server side render)
console.groupEnd();

let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = 'http://codercba.prod:8000'
} else {
  BASE_URL = 'http://coderwhy.dev:8000'
}

console.log(BASE_URL)

// 方法 3.通过创建.env文件直接创建变量, 只有以VITE_开头的，才会被vite读取到
console.log("import.meta.env.VITE_NAME: ", import.meta.env.VITE_NAME)

export const TIME_OUT = 10000
export { BASE_URL }
