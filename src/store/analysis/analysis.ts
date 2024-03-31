import { defineStore } from 'pinia'
import { getAmountList } from '@/service/main/analysis/analysis'

interface IAnalysisState {
  amountList: any[]
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => {
    return {
      amountList: []
    }
  },
  actions: {
    async fetchAnalysisDataAction() {
      const res = await getAmountList()
      console.log(res.data, "res.data")
      this.amountList = res.data
    }
  }
})
export default useAnalysisStore
