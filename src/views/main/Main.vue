<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollaps ? '55px' : '200px'">
        <!-- 侧边栏容器  isFold:是否折叠侧边栏-->
        <main-menu :isFold="isCollaps" ></main-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 顶栏容器 -->
          <main-header @fold-change="handleFoldChange"/>
        </el-header>
        <!-- 使用动态路由作为main的内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
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

import mainMenu from "@/components/main-menu/main-menu.vue";
import MainHeader from '@/components/main-header/main-header.vue'
import {ref} from 'vue'
import { onMounted } from "vue";
import useLoginStore from "@/store/login/login";
// 处理main-header中折叠的变化
const isCollaps = ref(false)
// 顶栏容器的折叠icon是否折叠
const handleFoldChange = (isFold: boolean) => {
  isCollaps.value = isFold
}

// 判断是否移动设备
const {isPc} = useLoginStore()
onMounted(() => {
  console.log("ispc???", isPc)
  if (!isPc) {
    // 页面宽度小于768px的情况下执行的代码
    isCollaps.value = true
  }
})
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

    transition: width 0.3s ease; // menu 的宽度发生变化
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


