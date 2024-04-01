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

// 获取echarts中商品销量的数据
export const getGoodsCategorySale = () => {
  return hyRequest.get({
    url: "/goods/category/sale"
  })
}

// 获取echarts中商品喜爱的数据
export const getGoodsCategoryFavor = () => {
  return hyRequest.get({
    url: "/goods/category/favor"
  })
}

// 地图数据
export const getGoodsAddressSale = () => {
  return hyRequest.get({
    url: "/goods/address/sale"
  })
}
