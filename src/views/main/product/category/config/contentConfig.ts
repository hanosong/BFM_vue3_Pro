const contentConfig = {
  pageName: "category",
  header: {
    title: "商品类别列表",
    btnTitle: "新建商品数据",
  },
  // 表格的字段
  propsList: [
    // 1.selection 2.index
    { type: 'selection', label: '选择', width: '80px' }, // 这里写不写label都行，反正不展示
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '类别名称', prop: 'name', width: '150px' },
    // 日期相关
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    // 按钮操作相关
    { type: 'handler', label: '操作', width: '150px' }
  ]
}

export default contentConfig
