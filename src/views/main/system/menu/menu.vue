<template>
  <!-- 菜单管理 -->
  <div class="menu">

    <page-content :content-config="contentConfig"></page-content>
  </div>
</template>

<script setup lang="ts" name="menu">
import pageContent from '@/components/page-content/page-content.vue';
import contentConfig from "./config/contentConfig.ts";
</script>

<style scoped>
.menu {
}
</style>
