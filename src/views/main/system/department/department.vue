<template>
  <div class="department">

    <page-search :searchConfig="searchConfig" @query-click="handleQueryClick" @reset-click="handleResetClick"></page-search>
    <page-content
      :contentConfig="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <!-- 定制化表格的内容 使用具名插槽回传子组件的内容-->
      <template #leader="slotProps">
        <span class="leader">
          🌼：{{ slotProps.row[slotProps.prop] }}
        </span>
      </template>
      <template #parent="slotProps">
        <span class="parent">
          🌈：{{ slotProps.row[slotProps.prop] }}
        </span>
      </template>
    </page-content>
    <page-modal ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from '@/components/page-search/page-search.vue';
import PageContent from '@/components/page-content/page-content.vue';
import pageModal from './c-cpn/page-modal.vue';

import searchConfig from './config/search.config.ts'
import contentConfig from './config/content.config.ts'

import { ref } from 'vue'


// 点击search, content的操作
const contentRef = ref<InstanceType<typeof PageContent>>()
const handleQueryClick = (queryInfo: any) => {
  contentRef.value?.fetchPageListData(queryInfo) // 让内容组件进行搜索
}
const handleResetClick = () => {
  contentRef.value?.fetchPageListData()
}

// 点击content，弹出弹窗
const modalRef = ref<InstanceType <typeof PageModal>>()
const handleNewClick = () => {
   modalRef.value?.setModalVisible()
};
const handleEditClick = (itemData: any) => {
  modalRef.value?.setModalVisible(false, itemData)
};
</script>

<style scoped>
.leader{
  color: red;
}
.parent{
  color: brown;
}
</style>
