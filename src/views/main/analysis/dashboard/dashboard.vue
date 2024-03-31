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
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import CountCard from './c-cpns/count-card/count-card.vue'
import useAnalysisStore from '@/store/analysis/analysis';

const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()
const {amountList} = storeToRefs(analysisStore)
console.log(amountList, "amountList")
</script>

<style lang="less" scoped>
.dashboard {
  color: red;
}
</style>
