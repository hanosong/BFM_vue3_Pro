/* eslint-env node */
// eslint 和 prettier 要匹配，不要冲突
// prettier 用于生成 ； eslint 用于检测
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  // extends -- 代码需要符合这里面的插件的规范
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:prettier/recommended' // 会从 prettier中读取风格（保持一致）
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 'off'
  }
}
