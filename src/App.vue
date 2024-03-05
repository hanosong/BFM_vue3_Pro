<template>
  <div class="app">
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

<style scoped>
.app {
  height: 100vh;
  width: 100vw;
}
</style>
