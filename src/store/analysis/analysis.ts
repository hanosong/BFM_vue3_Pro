import { defineStore } from 'pinia'
import { getAmountList, getGoodsCategoryCount } from '@/service/main/analysis/analysis'

interface IAnalysisState {
  amountList: any[]
  goodsCategoryCount: any[]
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => {
    return {
      amountList: [],
      goodsCategoryCount: [],
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
    }
  }
})
export default useAnalysisStore
