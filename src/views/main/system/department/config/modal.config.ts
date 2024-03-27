import type { IModalConfig } from "@/components/page-modal/type";
// 新建部门的配置
const modalConfig: IModalConfig = {
  pageName: "department",
  header: {
    newTitle: "新建部门",
    editTitle: "编辑部门",
  },
  formItems: [
    {
      type: "input",
      label: "部门名称",
      prop: "name",
      placeholder: "请输入部门名称",
      initalValue: "默认部门"
    },
    {
      type: "input",
      label: "部门领导",
      prop: "leader",
      placeholder: "请输入部门领导"
    },
    {
      type: "select",
      label: "上级部门",
      prop: "parentId",
      placeholder: "请选择上级部门",
      options: [],  // 这玩意是服务器来的，下拉框的选项不能写死
    },
  ]
}
export default modalConfig
