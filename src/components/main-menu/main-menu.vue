<template>
  <div class="logo">
    <img class="img" :src="logImgSrc" alt="" />
    <h2 class="title">后台管理系统</h2>
  </div>
  <!-- menu -->
  <div class="menu">
    <!--
    el-menu ： 整个的菜单
    el-sub-menu： 可以有子菜单，并且可以展开（用于多级分组）
    el-menu-item-group： 对子菜单进行分组，但是不能展开（目的是给小菜单加上分组名称，不可交互）
    el-menu-item： 每个小菜单
   -->
    <el-menu active-text-color="#fff" text-color="#b7bdc3"  background-color="#001529">
      <el-sub-menu>
        <template #title>
          <el-icon>
            <Odometer />
          </el-icon>
          <span>系统总览</span>
        </template>
        <el-menu-item>
          核心技术
        </el-menu-item>
        <el-menu-item>
          商品统计
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu>

        <template #title>
          <el-icon>
            <Odometer />
          </el-icon>
          <span>系统检测</span>
        </template>
        <el-menu-item>
          用户管理
        </el-menu-item>
        <el-menu-item>
          部门管理
        </el-menu-item>
        <el-menu-item>
          菜单管理
        </el-menu-item>
        <el-menu-item>
          角色管理
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu>

        <template #title>
          <el-icon>
            <Odometer />
          </el-icon>
          <span>商品中心</span>
        </template>
        <el-menu-item>
          商品类别
        </el-menu-item>
        <el-menu-item>
          商品信息
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu>

        <template #title>
          <el-icon>
            <Odometer />
          </el-icon>
          <span>随便聊聊</span>
        </template>
        <el-menu-item>
          你的故事
        </el-menu-item>
        <el-menu-item>
          故事列表
        </el-menu-item>
      </el-sub-menu>

    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useLoginStore from '@/store/login/login'
import imgSrc from "@/assets/img/logo.svg"
const logImgSrc = ref(imgSrc)

// 1.获取动态菜单
const loginStore = useLoginStore();
const userMenu = loginStore.userMenu;
</script>

<style lang="less" scoped>
.main-menu {
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
