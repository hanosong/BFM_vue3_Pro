<template>
  <div class="login-panel">
    <h1 class="title"> 小哈后台管理 </h1>
    <div class="tabs">
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
import { ref } from 'vue'
import PaneAccount from "./pane-account.vue"
import PanePhone from "./pane-phone.vue"
const isRememberPassWord = ref(true); // ref（）=> () 小括号可以传泛型
const activeName = ref<string>("account");
// 获取 PaneAccount 的实例类型；InstanceType => 获取构造器PaneAccount的返回值
// PaneAccount 是构造器，可以创建很多个<pane-account/> 实例
const accountRef = ref<InstanceType<typeof PaneAccount>>()
const loginHandle = () => {
  if(activeName.value === "account"){
    // 账号登录
    accountRef.value?.loginAction()
  }else{
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

  .title {
    text-align: center;
    margin-bottom: 15px;
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

