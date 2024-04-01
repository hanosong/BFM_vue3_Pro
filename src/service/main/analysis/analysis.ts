import hyRequest from '@/service'
export const getAmountList = () => {
  return hyRequest.get({
    url: "/goods/amount/list"
  })
}

// 获取echarts中商品类别的个数的数据
export const getGoodsCategoryCount = () => {
  return hyRequest.get({
    url: "/goods/category/count"
  })
}
