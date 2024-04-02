<template>
  <div class="overview">
    <chat-output>
        <div>{{ text }}</div>
    </chat-output>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import chatOutput from './c-cpns/chat-output.vue';
const text = ref('');

const _text = "你好，我是本文的作者哈鋆，欢迎加我的微信: ha_kwan";
let index = 0
onMounted(() => {
  let timmer = setInterval(() => {
    if(index >= _text.length) {
      clearInterval(timmer)
      return
    }
    text.value += _text[index]
    index++
  }, 300); // 光标闪烁的间隔时间（单位：毫秒）
});
</script>

<style lang="less" scoped>
.overview {

}
</style>
