<template>
  <div class="base-echart">
   <div class="echart" ref="echartRef"> </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, defineProps, withDefaults, onBeforeUnmount} from 'vue'
import * as echarts from 'echarts'
import type {EChartsOption} from 'echarts' // option 的类型
import { watchEffect } from 'vue';

import ChinaDataJson from '../data/china.json' // 引入中国地图数据
echarts.registerMap('china', ChinaDataJson as any) // 注册地图

interface IProps {
  option: EChartsOption
}

const props = defineProps<IProps>()

const echartRef = ref<HTMLElement>()
let echartInstance: echarts.ECharts;
console.log(1111)
onMounted(() => {
  echartInstance = echarts.init(echartRef.value!, 'light',{ renderer: "canvas"});
  // echartInstance.setOption(props.option)

  // 在mounted进行setOption， 只会触发一次，需要用watchEffect自动收集依赖进行数据更新
  watchEffect(() => {
    echartInstance.setOption(props.option)
  })

  // 监听window缩放，动态调整echarts的大小
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})

onBeforeUnmount(() => {
  // 取消监听
  window.removeEventListener('resize', () => {
    echartInstance.resize()
  });
  echartInstance.dispose();
})
</script>

<style lang="less" scoped>
.base-echart{
  .echart{
    height: 300px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
