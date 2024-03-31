import hyRequest from '@/service'
export const getAmountList = () => {
  return hyRequest.get({
    url: "/goods/amount/list"
  })
}
