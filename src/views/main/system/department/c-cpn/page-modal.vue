<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input
              v-model="formData.leader"
              placeholder="请输入部门领导"
            />
          </el-form-item>
          <el-form-item label="选择部门" prop="parentId">
            <el-select
              v-model="formData.parentId"
              placeholder="请选择部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!-- 页脚footer -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'

// 1.定义内部的属性
const dialogVisible = ref(false) // 弹窗是否可见
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: '',
})
const isNewRef = ref(true)
const editData = ref()

// 2.获取roles/departments数据 => 一登陆就获取了的数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore)

// 2.定义设置dialogVisible方法
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  // 点击了编辑按钮
  if (!isNew && itemData) {
    // 编辑数据（回显）
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData; // 传入的那一行的数据，编辑的时候需要id
  } else {
    // 新建数据 的时候 数据要清空数据
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null; // 表示为新建数据
  }
}

// 3.点击了确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    // 编辑部门的数据
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    // 创建新的部门
    systemStore.newPageDataAction('department', formData)
  }
}

// 暴露的属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
