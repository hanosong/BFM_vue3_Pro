<template>
  <div class="role">
    <page-search :searchConfig="searchConfig" @query-click="handleQueryClick" @reset-click="handleResetClick"></page-search>
    <page-content :content-config="contentConfig" ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick"/>
    <page-modal :modal-config="modalConfig" ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts">
import PageSearch from "@/components/page-search/page-search.vue"
import PageContent from "@/components/page-content/page-content.vue";
import searchConfig from './config/searchConfig.ts'
import contentConfig from "./config/contentConfig.ts";
import pageModal  from "@/components/page-modal/page-modal.vue";
import modalConfig from "./config/modalConfig.ts";
import { usePageContent } from '@/hooks/usePageContent.ts';
import {usePageModal} from '@/hooks/usePageModal.ts'
// 点击search, content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 点击content，弹出弹窗
const { modalRef, handleNewClick, handleEditClick } = usePageModal()


</script>

<style lang="less" scoped>
.role {

}
</style>
