const contentConfig = {
  pageName: "goods",
  header: {
    title: "商品列表",
    btnTitle: "新建商品数据",
  },
  // 表格的字段
  propsList: [
    // 1.selection 2.index
    { type: 'selection', label: '选择', width: '80px' }, // 这里写不写label都行，反正不展示
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '商品名称', prop: 'name', width: '150px' },
    { type: 'custom', label: '图片预览', prop: 'imgUrl', width: '150px', slotName: 'imgUrl' },
    { type: 'normal', label: '商品描述', prop: 'desc', width: '150px' },
    { type: 'normal', label: '用户收藏个数', prop: 'favorCount', width: '150px' },
    { type: 'normal', label: '月销量', prop: 'saleCount', width: '150px' },
    { type: 'normal', label: '商品原价', prop: 'oldPrice', width: '150px' },
    { type: 'normal', label: '商品现价', prop: 'newPrice', width: '150px' },
    { type: 'normal', label: '库存数量', prop: 'inventoryCount', width: '150px' },
    { type: 'normal', label: '发货地址', prop: 'address', width: '150px' },
    // 日期相关
    { type: 'timer', label: '创建时间', prop: 'createAt', width: '150px' },
    { type: 'timer', label: '更新时间', prop: 'updateAt', width: '150px' },
    // 按钮操作相关
    { type: 'handler', label: '操作', width: '150px' }
  ]
}

export default contentConfig
