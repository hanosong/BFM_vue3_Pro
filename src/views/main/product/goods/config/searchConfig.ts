// 争对goods 的配置
const searchConig = {
  pageName: "goods",
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '商品名称',
      placeholder: '请输入查询的商品名称',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'address',
      label: '发货地址',
      placeholder: '请输入查询的商品发货地址'
    },
    {
      type: 'select',
      prop: 'enable',
      label: '状态',
      placeholder: '请输入查询的状态',
      options: [
        {
          label: "已上架商品", value: '1'
        },
        {
          label: "已下架商品", value: '2'
        },
      ]
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间',
    },

  ]
}

export default searchConig
