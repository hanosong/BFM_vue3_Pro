<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="25px" v-if="isPc">
        <!-- 使用动态组件决定图标的切换状态 -->
        <component :is="isFold ? 'Expand' : 'Fold' "/>
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb" v-if="isPc">
        <!-- 导航面包屑 -->
       <header-crumb></header-crumb>
      </div>
      <!-- 右上头像和小图标 -->
     <header-info></header-info>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import HeaderInfo from './c-cpns/header-info.vue'
import HeaderCrumb from './c-cpns/header-crumb.vue'
import useLoginStore from '@/store/login/login';
const isFold = ref(false); // 默认图标为展开状态
const emit = defineEmits(["foldChange"]) // 自定义事件
const handleMenuIconClick = () => {
  isFold.value = !isFold.value;
  // 将事件状态传递给父组件,动态修改宽度
  emit('foldChange', isFold.value)
}

// 判断设备是不是移动端，如果是，则不让显示展开的图标
const {isPc} = useLoginStore()

</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }

  .breadcrumb{
    display: flex;
  }
}
</style>
