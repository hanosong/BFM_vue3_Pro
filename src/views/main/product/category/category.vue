<template>
  <div class="category">
    <page-search :searchConfig="searchConfig" @query-click="handleQueryClick" @reset-click="handleResetClick"></page-search>
    <page-content :content-config="contentConfig" ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick"/>
    <page-modal :modal-config="modalConfig" ref="modalRef">
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="category">
import {ref, nextTick} from "vue";
import PageSearch from "@/components/page-search/page-search.vue";
import PageContent from "@/components/page-content/page-content.vue";
import pageModal  from "@/components/page-modal/page-modal.vue";

import searchConfig from './config/searchConfig.ts'
import contentConfig from "./config/contentConfig.ts";
import modalConfig from "./config/modalConfig.ts";

import { usePageContent } from '@/hooks/usePageContent.ts';
import {usePageModal} from '@/hooks/usePageModal.ts'


const { contentRef, handleQueryClick, handleResetClick } = usePageContent();
const { modalRef, handleNewClick, handleEditClick } = usePageModal();



</script>

<style scoped>
.category {
}
</style>
