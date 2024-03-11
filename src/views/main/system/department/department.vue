<template>
  <div class="department">

    <page-search></page-search>
    <page-content></page-content>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from './c-cpn/page-search.vue';
import PageContent from './c-cpn/page-content.vue';
</script>

<style scoped>
.department {
}
</style>

