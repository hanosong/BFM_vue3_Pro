<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="200px">
        <main-menu></main-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// import {localCache} from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constants';
// import {useRouter} from 'vue-router'
// const router = useRouter();
// const logOutHandle = () => {
//   // 删除token
//   localCache.removeCache(LOGIN_TOKEN)
//   // 跳回登录页面
//   router.push("/login")
// }

import mainMenu from "@/components/main-menu/main-menu.vue"
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.3s ease;
    // 消除滚动条样式
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>


