import { ref } from "vue"
import type PageContent from "@/components/page-content/page-content.vue" // 注意，默认导出，没有大括号
export const usePageContent = () => {
  // 点击search, content的操作
  const contentRef = ref<InstanceType<typeof PageContent>>()
  const handleQueryClick = (queryInfo: any) => {
    contentRef.value?.fetchPageListData(queryInfo) // 让内容组件进行搜索
  }
  const handleResetClick = () => {
    contentRef.value?.fetchPageListData()
  }

  return {
    contentRef,
    handleQueryClick,
    handleResetClick,
  }
}
