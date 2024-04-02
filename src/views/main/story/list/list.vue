<template>
  <div class="list">
    <page-content :content-config="contentConfig" ref="contentRef" />
  </div>
</template>

<script setup lang="ts" name="list">
import PageContent from "@/components/page-content/page-content.vue";
import contentConfig from "./config/contentConfig.ts";



</script>

<style scoped>
.list {
}
</style>
