// 正对search 的配置
const searchConig = {
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '名称',
      placeholder: '请输入查询的部门名称',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入查询的领导名称'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间',
    },
    // 下拉框
    {
      type: 'select',
      prop: 'enable',
      label: '状态',
      placeholder: '请输入查询的状态',
      options: [
        {
          label: "启动", value: '1'
        },
        {
          label: "停止", value: '2'
        },
      ]
    },

  ]
}

export default searchConig
