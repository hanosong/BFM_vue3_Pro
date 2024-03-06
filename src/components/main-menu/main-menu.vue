<template>
  <div class="logo">
    <img class="img" :src="logImgSrc" alt="" />
    <h2 v-show="!isFold" class="title">后台管理系统</h2>
  </div>
  <!-- menu -->
  <div class="menu">
    <!--
    el-menu ： 整个的菜单
    el-sub-menu： 可以有子菜单，并且可以展开（用于多级分组）
    el-menu-item-group： 对子菜单进行分组，但是不能展开（目的是给小菜单加上分组名称，不可交互）
    el-menu-item： 每个小菜单
   -->
    <el-menu
      default-active="3"
      :collapse="isFold"
      active-text-color="#fff"
      text-color="#b7bdc3"
      background-color="#001529"
    >
      <!-- 遍历整个菜单 -->
      <template v-for="item in userMenus" :key="item.id">
        <el-sub-menu :index="item.id + '' ">
          <template #title>
            <!-- 将字符串：el-icon-monitor => 组件 使用：component 动态组件 -->
            <el-icon>
              <component :is="item.icon.split('-icon-')[1]" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>

          <template v-for="subitem in item.children" :key="subitem.id">
            <el-menu-item :index="subitem.id + ''">{{ subitem.name }}</el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useLoginStore from '@/store/login/login'
import imgSrc from "@/assets/img/logo.svg"
const logImgSrc = ref(imgSrc)

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 1.获取动态菜单
const loginStore = useLoginStore();
const userMenus = loginStore.userMenus;
console.log(userMenus, "userMenus")
</script>

<style lang="less" scoped>.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
