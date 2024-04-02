import type { IModalConfig } from "@/components/page-modal/type";
// 新建部门的配置
const modalConfig: IModalConfig = {
  pageName: "goods",
  header: {
    newTitle: "新建商品",
    editTitle: "编辑商品",
  },
  formItems: [
    {
      type: "input",
      label: "商品名称",
      prop: "name",
      placeholder: "请输入商品名称",
    },
    {
      type: "input",
      label: "商品原价",
      prop: "oldPrice",
      placeholder: "请输入原价"
    },
    {
      type: "input",
      label: "商品现价",
      prop: "newPrice",
      placeholder: "请输入现价"
    },
    {
      type: "input",
      label: "商品描述",
      prop: "desc",
      placeholder: "请输入描述信息"
    },
    {
      type: "input",
      label: "商品预览图",
      prop: "imgUrl",
      placeholder: "请输入图片地址"
    },
    {
      type: "input",
      label: "商品库存",
      prop: "inventoryCount",
      placeholder: "请输入库存数量"
    },
    {
      type: "input",
      label: "商品销量",
      prop: "saleCount",
      placeholder: "请输入商品月销量"
    },
    {
      type: "input",
      label: "商品收藏数",
      prop: "favorCount",
      placeholder: "该商品被收藏的次数"
    },
    {
      type: "input",
      label: "发货地",
      prop: "address",
      placeholder: "该商品的发货地址"
    },
    {
      type: "select",
      label: "商品状态",
      prop: "status",
      placeholder: "请选择商品状态",
      options: [
        {
          label: "在售", value: '1'
        },
        {
          label: "下架", value: '2'
        },
      ],
    },
  ]
}
export default modalConfig
