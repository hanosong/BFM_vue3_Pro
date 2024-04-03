<template>
  <div class="panel-phone">
    <el-form :model="phone" label-width="60px" size="large" :rules="phoneVertifyRules" ref="formRef">
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model="phone.phoneNum"/>
      </el-form-item>
      <el-form-item label="验证码" prop="verificationCode">
        <div class="verify-code">
          <el-input v-model="phone.verificationCode"/>
          <el-button class="get-btn" type="primary" @click="getVertifyCode">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { IPhoneVerificationCode } from '@/types'
import type { FormRules, ElForm } from "element-plus"
import { ElMessage } from 'element-plus'
const formRef = ref<InstanceType <typeof ElForm>>()
const phone = reactive<IPhoneVerificationCode>({
  phoneNum: '',
  verificationCode: "",
})

const phoneVertifyRules: FormRules = {
  phoneNum: [
    { required: true, message: '请输入手机号~', trigger: 'blur' },
    {
      pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, // 电话号码验证
      message: '请输入正确手机号码~',
      trigger: 'blur'
    }
  ],

}

// 获取验证码功能：-- todo
const getVertifyCode = () => {
  ElMessage({
    message: '功能开发中，暂无法发送验证码',
    type: 'warning',
  })
}

</script>

<style lang="less" scoped>
.panel-phone {
  color: red;
}

.verify-code {
  display: flex;

  .get-btn {
    margin-left: 8px;
  }
}
</style>
