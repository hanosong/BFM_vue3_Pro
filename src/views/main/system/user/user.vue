<template>
  <div class="user">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleRestClick"
    ></user-search>
    <user-content ref="contentRef" @new-user-click="handleNewBtnClick" @edit-click="handleEditClick"></user-content>
    <user-modal ref="modalRef"></user-modal>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'
import {ref} from 'vue'
// 给content组件派发查询事件
const contentRef = ref<InstanceType<typeof UserContent >>();
// querySarch中按下了查询按钮
const handleQueryClick = (formData: any) => {
  contentRef.value?.fetchUserListData(formData)
}

// querySarch中按下了重置按钮
const handleRestClick = () => {
  contentRef.value?.fetchUserListData()
}

// 对modal组件进行操作
const modalRef = ref<InstanceType <typeof UserModal>>();
// 新增
const handleNewBtnClick = () => {
  modalRef.value?.setModalVisible()
}
// 修改
const handleEditClick = (itemData: any) => {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
