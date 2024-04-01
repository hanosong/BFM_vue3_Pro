// 针对category 的配置
const searchConig = {
  pageName: "category",
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '类别名称',
      placeholder: '请输入查询的角色名称',
      initialValue: ''
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间',
    },
  ]
}

export default searchConig
