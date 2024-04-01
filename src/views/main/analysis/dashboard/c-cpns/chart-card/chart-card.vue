<template>
  <div class="chart-card">
    <el-card style="max-width: 480px" :header="header">
      <!-- 预留插槽-展示echats -->
      <slot>默认的内容</slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  header?: string
}
withDefaults(defineProps<IProps>(), {
  header: "卡片头部标题"
})

</script>

<style lang="less" scoped>
.chart-card{

}
</style>
