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
    <page-modal ref="modalRef" :modalConfig="modalConfigRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from '@/components/page-search/page-search.vue';
import PageContent from '@/components/page-content/page-content.vue';
import pageModal from '@/components/page-modal/page-modal.vue';

import searchConfig from './config/search.config.ts'
import contentConfig from './config/content.config.ts'
import modalConfig from "./config/modal.config.ts" // 弹窗的配置
import { ref, computed } from 'vue'
import useMainStore from '@/store/main/main';

// 对modalConfig进行操作 => 使用computed 是为了动态生成表单配置
const modalConfigRef = computed(() => {
  const mainStore = useMainStore(); // 为了拿到部门信息
  // 由于接口返回来的叫id/name => 需要映射为id/value，
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  console.log(departments, "departments")
  modalConfig.formItems.forEach((item) => {
    console.log(item, "item")
    // 如果是上级部门栏位
    if(item.prop === 'parentId'){
       item.options.push(...departments) // 要记得解构 => 拿到数组里面的对象
    }
  })
  return modalConfig
})
// 点击search, content的操作
const contentRef = ref<InstanceType<typeof PageContent>>()
const handleQueryClick = (queryInfo: any) => {
  contentRef.value?.fetchPageListData(queryInfo) // 让内容组件进行搜索
}
const handleResetClick = () => {
  contentRef.value?.fetchPageListData()
}

// 点击content，弹出弹窗
const modalRef = ref<InstanceType <typeof pageModal>>()
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
