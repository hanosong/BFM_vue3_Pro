import { defineStore } from 'pinia'
import { getAmountList, getGoodsAddressSale, getGoodsCategoryCount, getGoodsCategoryFavor, getGoodsCategorySale } from '@/service/main/analysis/analysis'

interface IAnalysisState {
  amountList: any[]
  goodsCategoryCount: any[]
  goodsCategorySale: any[]
  goodsCategoryFavor: any[]
  goodsAddressSale: any[]
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => {
    return {
      amountList: [],
      goodsCategoryCount: [],
      goodsCategorySale: [],
      goodsCategoryFavor: [],
      goodsAddressSale: [],
    }
  },
  actions: {
    fetchAnalysisDataAction() {
      // 以下数据接口均没有相互依赖关系，所以不用await
      getAmountList().then((res) => {
        console.log(res.data, "res.data")
        this.amountList = res.data
      })

      getGoodsCategoryCount().then(res => {
        this.goodsCategoryCount = res.data
      });

      getGoodsCategorySale().then(res => {
        this.goodsCategorySale = res.data
      })

      getGoodsCategoryFavor().then(res => {
        this.goodsCategoryFavor = res.data
      })

      getGoodsAddressSale().then(res => {
        this.goodsAddressSale = res.data
      })
    }
  }
})
export default useAnalysisStore
