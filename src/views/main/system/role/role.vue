<template>
  <div class="role">
    <page-search :searchConfig="searchConfig"></page-search>
  </div>
</template>

<script setup lang="ts">
import PageSearch from "@/components/page-search/page-search.vue"
import searchConfig from './config/config.ts'
</script>

<style lang="less" scoped>
.role {
  color: red;
}
</style>
