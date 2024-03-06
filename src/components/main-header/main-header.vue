<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="25px">
        <!-- 使用动态组件决定图标的切换状态 -->
        <component :is="isFold ? 'Expand' : 'Fold' "/>
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
       面包屑
      </div>
      <div class="info">
          个人信息
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const isFold = ref(false); // 默认图标为展开状态
const emit = defineEmits(["foldChange"]) // 自定义事件
const handleMenuIconClick = () => {
  isFold.value = !isFold.value;
  // 将事件状态传递给父组件,动态修改宽度
  emit('foldChange', isFold.value)
}
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
}
</style>
