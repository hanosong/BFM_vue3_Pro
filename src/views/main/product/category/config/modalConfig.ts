import type { IModalConfig } from "@/components/page-modal/type";
// 商品类别的配置
const modalConfig: IModalConfig = {
  pageName: "category",
  header: {
    newTitle: "新建类别",
    editTitle: "编辑类别",
  },
  formItems: [
    {
      type: "input",
      label: "类别名称",
      prop: "name",
      placeholder: "请输入类别名称",
    },
  ]
}
export default modalConfig
