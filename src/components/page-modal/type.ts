export interface IModalConfig {
  pageName: string
  header: {
    newTitle: string
    editTitle: string
  }
  formItems: any[]
}
export interface IModalProps {
  modalConfig: IModalConfig
  otherInfo?: any // 其他数据
}
