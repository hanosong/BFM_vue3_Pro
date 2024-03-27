const contentConfig = {
  pageName: "menu",
  header: {
    title: "菜单列表",
    btnTitle: "新建菜单",
  },
  // 表格的字段
  propsList: [
    { type: 'index', label: '序号', width: '80px' },
    { label: '菜单名称', prop: 'name', width: '150px' },
    { type: 'normal', label: '菜单级别', prop: 'type', width: '150px' },
    { type: 'normal', label: '菜单url', prop: 'url', width: '150px' },
    { type: 'normal', label: '菜单图标', prop: 'icon', width: '200px' },
    { type: 'normal', label: '排序', prop: 'sort', width: '150px' },
    { type: 'normal', label: '权限', prop: 'permission', width: '150px' },
    // 日期相关
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    // 按钮操作相关
    { type: 'handler', label: '操作', width: '150px' }
  ],
  // 展开表格行的配置
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: "children",
    }
  }
}

export default contentConfig
