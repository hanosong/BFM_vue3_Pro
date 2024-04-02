<template>
  <div class="result-streaming">
    <slot></slot>
    <span v-if="showCursor" class="cursor"></span>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
const showCursor = ref(false);

onMounted(() => {
  setInterval(() => {
    showCursor.value = !showCursor.value;
  }, 500); // 光标闪烁的间隔时间（单位：毫秒）
});




</script>


<style>
.result-streaming>:not(ol):not(ul):not(pre):last-child:after,
.result-streaming>ol:last-child li:last-child:after,
.result-streaming>pre:last-child code:after,
.result-streaming>ul:last-child li:last-child:after {
  -webkit-animation: blink .1s steps(2, start) infinite;
  animation: blink .1s steps(2, start) infinite;
  content: "";
  /* margin-left: 0.25rem; */
  vertical-align: baseline;
}
.result-streaming{
  display: flex;
}
.cursor {
  display: inline-block;
  width: 0.2rem; /* 光标宽度 */
  height: 1rem; /* 光标高度 */
  margin-left: 2px;
  background-color: #0A60BD; /* 光标颜色 */
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0; /* 光标透明度 */
  }
  50% {
    opacity: 1;
  }
}
</style>onMounted,
