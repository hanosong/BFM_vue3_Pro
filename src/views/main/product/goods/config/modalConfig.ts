import type { IModalConfig } from "@/components/page-modal/type";
// 新建部门的配置
const modalConfig: IModalConfig = {
  pageName: "goods",
  header: {
    newTitle: "新建角色",
    editTitle: "编辑角色",
  },
  formItems: [
    {
      type: "input",
      label: "角色名称",
      prop: "name",
      placeholder: "请输入角色名称",
    },
    {
      type: "input",
      label: "权限介绍",
      prop: "intro",
      placeholder: "请输入权限介绍"
    },
    // 树形结构的菜单列表
    {
      type: "custom",
      slotName: "menulist"
    }

  ]
}
export default modalConfig
