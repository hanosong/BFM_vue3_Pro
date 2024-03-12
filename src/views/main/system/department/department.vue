<template>
  <div class="department">

    <page-search @query-click="handleQueryClick" @reset-click="handleResetClick"></page-search>
    <page-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick"></page-content>
    <page-modal ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from './c-cpn/page-search.vue';
import PageContent from './c-cpn/page-content.vue';
import pageModal from './c-cpn/page-modal.vue';
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
.department {}
</style>
