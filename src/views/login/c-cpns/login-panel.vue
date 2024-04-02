<template>
  <div class="login-panel">
    <div class="title-wrapper">
      <h1 class="title"> 小哈后台管理 </h1>
    </div>
    <div class="tabs">
      <!-- tab页签 => 账号密码登录还是手机登录 -->
      <el-tabs type="border-card" :stretch="true" v-model="activeName">
        <!-- tab没有提供图标，所以要用插槽实现 -- add-icon  -->
        <el-tab-pane name="account">
          <template #label>
           <div class="label">
            <el-icon><UserFilled /></el-icon>
            <span class="text">用户登录</span>
           </div>
          </template>
          <pane-account ref="accountRef"></pane-account>

        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
           <div class="label">
            <el-icon><Iphone /></el-icon>
            <span class="text">手机登录</span>
           </div>
          </template>
          <!-- 账号密码输入框 -->
          <pane-phone></pane-phone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRememberPassWord" label="记住密码"> </el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="loginHandle">登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PaneAccount from "./pane-account.vue"
import PanePhone from "./pane-phone.vue"
import { localCache } from "@/utils/cache";
import { ElMessage } from 'element-plus'
// isRememberPassWord 为了解决报错暂时写死为 any
const isRememberPassWord : any = ref<boolean>(localCache.getCache('isRememberPassWord') ?? true); // ref（）=> () 小括号可以传泛型
const activeName = ref<string>("account");

// 记录用户是否选择记住密码
watch(isRememberPassWord, (newVal) => {
  localCache.setCache('isRememberPassWord', newVal)
})

// 获取 PaneAccount 的实例类型；InstanceType => 获取构造器PaneAccount的返回值
// PaneAccount 是构造器，可以创建很多个<pane-account/> 实例
const accountRef = ref<InstanceType<typeof PaneAccount>>()
const loginHandle = () => {
  if(activeName.value === "account"){
    console.log(isRememberPassWord, "isRememberPassWord")
    // 账号登录
    accountRef.value?.loginAction(isRememberPassWord)
  }else{
    ElMessage({
    message: '功能开发中，暂不支持手机登录',
    type: 'warning',
  })
    // 手机登录
    console.log("用户进行手机登录")
  }
  console.log("login click")
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title-wrapper{
    background-color: #fff;
    filter: contrast(50); // 对比度拉大，白的更白黑的更黑
  }
  .title {
    color: black;
    text-align: center;
    margin-bottom: 15px;
    letter-spacing: 0px;
    animation: showTitle 3s forwards; // 动画结束之后使用最终的样式
  }
  @keyframes showTitle {
      from {
        letter-spacing: -50px;
        filter: blur(10px);
      }
      to{
        letter-spacing: 10px;
        filter: blur(0px);
      }
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px; // 覆盖样式
  }
}
</style>

