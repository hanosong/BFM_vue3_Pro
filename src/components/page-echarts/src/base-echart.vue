<template>
  <div class="base-echart">
   <div class="echart" ref="echartRef"> </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, defineProps, withDefaults} from 'vue'
import * as echarts from 'echarts'
import type {EChartsOption} from 'echarts' // option 的类型
import { watchEffect } from 'vue';


interface IProps {
  option: EChartsOption
}

const props = defineProps<IProps>()

const echartRef = ref<HTMLElement>()

onMounted(() => {
  const echartInstance = echarts.init(echartRef.value!, 'light',{ renderer: "canvas"});
  // echartInstance.setOption(props.option)

  // 在mounted进行setOption， 只会触发一次，需要用watchEffect自动收集依赖进行数据更新
  watchEffect(() => {
    echartInstance.setOption(props.option)
  })
})

</script>

<style lang="less" scoped>
.base-echart{
  .echart{
    height: 300px;
  }
}
</style>
