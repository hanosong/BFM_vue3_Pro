<template>
  <div class="pane-account">
    <!--  status-icon : 对校验结果相关的图标 -->
    <el-form :model="account" size="large" :rules="accountRules" ref="formRef" >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" placeholder="请输入您的帐号" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password clearable />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, } from 'vue'
import {ElMessage} from "element-plus" // template中的才会自动导入
import type { FormRules, ElForm } from "element-plus"
import useLoginStore from "@/store/login/login"
import type { IAccount } from '@/types'
import { localCache } from "@/utils/cache";

const CACHE_NAME = 'name';
const CACHE_PASSWORD = 'password'

const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,20}$/, // ^: 开头，$: 结尾
      message: '请检查账号是否符合6~20数字或字母规则~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}
const formRef = ref<InstanceType <typeof ElForm>>()
const loginStore = useLoginStore()
const loginAction = (isRemPwd: any) => {
  console.log(isRemPwd, "isRememberPwd")
  formRef.value?.validate(valid => {
    if(!valid){
      ElMessage({
        message: '登录失败，请先检查输入信息',
        type: 'warning',
      })
      return
    }
    const {name,password} = account;
    // 登录并保存用户信息
    loginStore.loginAccountAction({name, password}).then(() => {
      // 是否记住用户名/密码
      if(isRemPwd.value){
        localCache.setCache(CACHE_NAME, name)
        localCache.setCache(CACHE_PASSWORD, password)
      }else {
        localCache.removeCache(CACHE_NAME)
        localCache.removeCache(CACHE_PASSWORD)
      }
    });

  })
}
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-account {
  color: red;
}
</style>
