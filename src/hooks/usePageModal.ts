import { ref } from "vue"
import type pageModal from "@/components/page-modal/page-modal.vue"
export const usePageModal = () => {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  const handleNewClick = () => {
    modalRef.value?.setModalVisible()
  };
  const handleEditClick = (itemData: any) => {
    modalRef.value?.setModalVisible(false, itemData)
  };

  return {
    modalRef,
    handleNewClick,
    handleEditClick
  }
}
