<template>
  <div class="role">
    <page-search :searchConfig="searchConfig" @query-click="handleQueryClick" @reset-click="handleResetClick"></page-search>
    <page-content :content-config="contentConfig" ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick"/>
    <page-modal :modal-config="modalConfig" ref="modalRef" :other-info="otherInfo">
      <!-- 使用插槽 -->
      <template #menulist>
        <el-tree
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="defaultProps"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
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
import useMainStore from "@/store/main/main.ts";
import { storeToRefs } from "pinia";
import { ref } from "vue";
// 点击search, content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 点击content，弹出弹窗
const { modalRef, handleNewClick, handleEditClick } = usePageModal()

// 配置选项 children: 指定子树为节点对象的某个属性值; label: 指定节点标签为节点对象的某个属性值
const defaultProps = {
  children: 'children',
  label: 'name', // tree组件的label的别名这里是name
}

// 获取完整的菜单数据
const mainStore = useMainStore();
const {entireMenus} = storeToRefs(mainStore);

// 可能往页面中传递的其他数据
const otherInfo = ref({})

// 点击菜单树的复选框, 需要保存子节点和对应的父节点id
const handleElTreeCheck = (_: any,{checkedKeys, halfCheckedKeys}) => {
  const menuList = [...checkedKeys, ...halfCheckedKeys];
  otherInfo.value = {menuList};
}
</script>

<style lang="less" scoped>
.role {

}
</style>
