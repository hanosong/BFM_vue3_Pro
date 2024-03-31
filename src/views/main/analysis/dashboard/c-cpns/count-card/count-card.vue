<template>
  <div class="count-card">
    <div class="header">
      <span class="title">{{ title }}</span>
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="tips"
        placement="top"
      >
        <el-icon><Money /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <!-- <span v-if="amount === 'saleroom'">￥</span> -->
      <span ref="countup1Ref">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subtitle }}</span>
      <!-- <span v-if="amount === 'saleroom'">￥</span> -->
      <span ref="countup2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js'; // 数字的动画效果
import { ref, onMounted } from 'vue';

interface IProps {
  amount?: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}
// 添加props的默认值
const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tips: '销售额',
  number1: 0,
  number2: 0,
  subtitle: '商品总销量',
})

// 创建countup实例
const countup1Ref = ref<HTMLElement>();
const countup2Ref = ref<HTMLElement>();
// 给金额前面加前缀
const countOption = {
  prefix: props.amount === "saleroom" ? "¥" : " "
}
// 参数1: 执行动画的元素, 参数2: 数字递增的最终结果
onMounted(() => {
  const countup1 = new CountUp(countup1Ref.value!, props.number1, countOption)
  const countup2 = new CountUp(countup2Ref.value!, props.number2, countOption)
  countup1.start();
  countup2.start();
})

</script>

<style lang="less" scoped>
.count-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
  }

  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
