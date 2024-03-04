import { defineStore } from 'pinia'

// 参数1： id
// 参数2：对象
const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 100
  }),
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    }
  },
  actions: {
    changeCounterAction(newCounter: number) {
      this.counter = newCounter
    }
  }
})

export default useCounterStore
