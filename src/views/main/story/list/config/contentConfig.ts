const contentConfig = {
  pageName: "story",
  header: {
    title: "故事列表",
    btnTitle: "新建故事",
  },
  // 表格的字段
  propsList: [
    // 1.selection 2.index
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '故事题目', prop: 'title', width: '150px' },
    { type: 'normal', label: '我的故事', prop: 'content', },
    // 日期相关
    { type: 'timer', label: '创建时间', prop: 'createAt', width: '150px' },
  ]
}

export default contentConfig
