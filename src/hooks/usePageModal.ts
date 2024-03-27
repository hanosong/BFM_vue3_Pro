import { ref } from "vue"
import type pageModal from "@/components/page-modal/page-modal.vue"
export const usePageModal = () => {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  // 新建
  const handleNewClick = () => {
    modalRef.value?.setModalVisible()
  };
  // 编辑
  const handleEditClick = (itemData: any) => {
    modalRef.value?.setModalVisible(false, itemData)
  };

  return {
    modalRef,
    handleNewClick,
    handleEditClick
  }
}
