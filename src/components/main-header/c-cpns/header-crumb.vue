<template>
  <div class="curmb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <!-- 面包屑的名字/点击跳转路径 -->
        <el-breadcrumb-item :to="item.path">{{item.name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import {computed } from 'vue'
import {mapPathToBreadcrumbs} from '@/utils/map-menus';
import {useRoute} from 'vue-router';
import useLoginStore from '@/store/login/login';
const route = useRoute();
const userMenus = useLoginStore().userMenus;
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>

<style lang="less" scoped>
.curmb {
}
</style>
