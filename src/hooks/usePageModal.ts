import { ref } from "vue"
import type pageModal from "@/components/page-modal/page-modal.vue"
type EditFnType = (data: any) => void
type NewFnType = () => void
export const usePageModal = (editCallBack?: EditFnType, newCallback?: NewFnType) => {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  // 新建
  const handleNewClick = () => {
    modalRef.value?.setModalVisible()
    if (newCallback) {
      newCallback();
    }
  };
  // 编辑 itemData -- rowData
  const handleEditClick = (itemData: any) => {
    modalRef.value?.setModalVisible(false, itemData)
    if (editCallBack) {
      editCallBack(itemData)
    }
  };

  return {
    modalRef,
    handleNewClick,
    handleEditClick
  }
}
