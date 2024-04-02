<template>
  <div class="pie-echart">
    <base-echart :option="option" :height="400"/>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseEchart from './base-echart.vue';
import type {EChartsOption} from 'echarts'
import type { IProps } from '../types';
import useLoginStore from '@/store/login/login';

const props = defineProps<IProps>()
const {isPc} = useLoginStore()

// 由于传入的是普通数据，所以使用计算属性监听数据的变化
const option = computed<EChartsOption>(() => {
  return {
    // 手指放上去的时候显示的文本
    tooltip: {
      trigger: 'item'
    },
    // 图例:
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '70%',
        top: '15%',
        bottom: '-10%', // 距离底部预留一定距离
        data: props.pieData,
        emphasis: {
          itemStyle: { // 手指放上去的样式
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})

</script>

<style lang="less" scoped>
.pie-echart{

}
</style>
