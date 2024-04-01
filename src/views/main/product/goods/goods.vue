<template>
  <div class="goods">
    <page-search :searchConfig="searchConfig" @query-click="handleQueryClick" @reset-click="handleResetClick"></page-search>
    <page-content :content-config="contentConfig" ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick">
      <template #imgUrl="slotProps">
        <el-image
          style="width: 50px; height: 50px"
          :src="slotProps.row[slotProps.prop]"
          :preview-src-list="[slotProps.row[slotProps.prop]]"
          preview-teleported
          lazy
        >
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
        </el-image>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfig" ref="modalRef" >
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="goods">
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

<style scoped>
.goods {
  .image-slot{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 14px;
  }
  .dot {
    animation: dot 2s infinite steps(3, start);
    overflow: hidden;
  }
}
</style>
