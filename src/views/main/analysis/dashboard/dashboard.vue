<template>
  <div class="dashboard">
    <!-- 顶部的数字的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6">
          <count-card v-bind="item"/>
        </el-col>
      </template>
    </el-row>

    <!-- 中间部分的e-charts -->
    <el-row :gutter="10">
      <el-col :span="6">
        <chart-card>
          <pie-chart :pie-data="showGoodsCategoryCount">
          </pie-chart>
        </chart-card>
      </el-col>
      <el-col :span="11">
        <line-chart></line-chart>
      </el-col>
      <el-col :span="7">
        <chart-card></chart-card>
      </el-col>
    </el-row>

    <!-- 底部的图表 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card></chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card></chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {computed} from 'vue'
import CountCard from './c-cpns/count-card/count-card.vue'
import ChartCard from './c-cpns/chart-card/chart-card.vue'
import useAnalysisStore from '@/store/analysis/analysis';
import {PieChart, LineChart} from '@/components/page-echarts/index';
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()
// 获取 echart的数据
const {amountList, goodsCategoryCount} = storeToRefs(analysisStore)

const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map(item => ({
    name: item.name,
    value: item.goodsCount
  }))
})
</script>

<style lang="less" scoped>
.dashboard {
  .el-row {
  margin-bottom: 10px;
}
}

</style>
