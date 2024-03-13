const contentConfig = {
  header: {
    title: "部门列表",
    btnTitle: "新建部门",
  },
  propsList: [
    // 1.selection 2.index
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '部门名称', prop: 'name', width: '150px' },
    { type: 'normal', label: '部门领导', prop: 'leader', width: '150px' },
    { type: 'normal', label: '上级部门', prop: 'parentId', width: '150px' },
    // 如果要对表格数据进行定制化，比如在文字前面加样式啥的 => 新增一个类：custom + 具名插槽
    {
      type: 'custom',
      label: '部门领导（定制）',
      prop: 'leader',
      width: '150px',
      slotName: 'leader'
    },
    {
      type: 'custom',
      label: '上级部门（定制）',
      prop: 'parentId',
      width: '150px',
      slotName: 'parent'
    },
    // 日期相关
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    // 按钮操作相关
    { type: 'handler', label: '操作', width: '150px' }
  ]
}

export default contentConfig
