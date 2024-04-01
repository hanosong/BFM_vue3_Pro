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
        <chart-card :header="`分类商品数量饼状图`">
          <pie-chart :pie-data="showGoodsCategoryCount">
          </pie-chart>
        </chart-card>
      </el-col>
      <el-col :span="11">
        <chart-card :header="`城市销量地图预览`">
          <!-- 地图 -->
          <map-chart :map-data="showGoodsAddressSale"></map-chart>
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card :header="`分类商品数量玫瑰图`">
          <rose-chart :rose-data="showGoodsCategoryCount"></rose-chart>
        </chart-card>
      </el-col>
    </el-row>

    <!-- 底部的图表 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card :header="`分类商品销量折线图`">
          <!-- <line-chart :labels="showGoodsCategorySale.labels" :values="showGoodsCategorySale.values"></line-chart> -->
          <!-- 也可以用v-bind -->
          <line-chart v-bind="showGoodsCategorySale"></line-chart>
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card :header="`分类商品收藏数量柱状图`">
          <bar-chart v-bind="showGoodsCategoryFavor"></bar-chart>
        </chart-card>
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
import {PieChart, LineChart, RoseChart, BarChart, MapChart} from '@/components/page-echarts/index';
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()
// 获取 echart的数据
const {amountList, goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, goodsAddressSale} = storeToRefs(analysisStore)

const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map(item => ({
    name: item.name,
    value: item.goodsCount
  }))
})

const showGoodsCategorySale = computed(() => {
 const labels =  goodsCategorySale.value.map(item => item.name)
 const values =  goodsCategorySale.value.map(item => item.goodsCount)
 return {
  labels,
  values
 }
})

const showGoodsCategoryFavor = computed(() => {
 const labels =  goodsCategoryFavor.value.map(item => item.name)
 const values =  goodsCategoryFavor.value.map(item => item.goodsFavor)
 return {
  labels,
  values
 }
})

const showGoodsAddressSale = computed(() => {
  console.log(goodsAddressSale.value, "goodsAddressSale.value")
  return goodsAddressSale.value.map(item => ({
    name: item.address,
    value: item.count
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
