<template>
  <div class="line-chart">
    <base-echart :option="option"/>
  </div>
</template>

<script setup lang="ts">
import BaseEchart from './base-echart.vue';
import type {EChartsOption} from 'echarts'
const option: EChartsOption = {

}

</script>

<style lang="less" scoped>
.line-chart{

}
</style>
