<template>
  <div class="app">
    <h2>App</h2>
    <RouterLink to="/main">主要</RouterLink>
    <RouterLink to="/login">登录</RouterLink>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
interface IKun {
  name: string
}

const ikun: IKun = {
  name: 'kobe'
}
console.log(ikun)
</script>

<style scoped></style>
import type { RouterLink } from 'vue-router';

import type { RouterView } from 'vue-router';

