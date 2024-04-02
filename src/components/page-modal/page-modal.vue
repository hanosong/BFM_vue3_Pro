<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      :width="isPc ? '30%' : '88%'"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker v-model="formData[item.prop]" type="daterange" range-separator="-"
                  start-placeholder="开始时间" end-placeholder="结束时间" />
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="formData[item.prop]" :placeholder="item.placeholder" style="width: 100%">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <!--  自定义插槽 注意：插槽没有绑定prop，没办法托管到formData-->
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item></template>
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
import type { IModalProps } from './type'
import useLoginStore from '@/store/login/login'

const {isPc} = useLoginStore()
// 0.定义props

const props = defineProps<IModalProps>()

// 1.定义内部的属性
const dialogVisible = ref(false) // 弹窗是否可见

// 初始化动态表单数据 和表单的初始化值
const initalData = {};
for (const item of props.modalConfig.formItems){
  initalData[item.prop] = item.initalValue ?? ""; // 注意：弹窗的初始化值直接设置是失效的 => 因为v-model的值为false => 解决办法： 在点击新建的时候在赋值
}
const formData = reactive<any>(initalData)
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
      // 记得写props，不然会提示modalConfig is undefined
      const item = props.modalConfig.formItems.find((item: any) => item.prop === key)
      formData[key] =  item ? item.initalValue : ''
    }
    editData.value = null; // 表示为新建数据
  }
}

// 3.点击了确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false;
  let infoData = formData;
  // 判断是否传入了表单中的其他数据（插槽）
  if(props.otherInfo){
    infoData = {...infoData, ...props.otherInfo}
  }
  if (!isNewRef.value && editData.value) {
    // 编辑部门的数据
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, infoData)
  } else {
    // 创建新的部门
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  }
}

// 暴露的属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
  :deep(.el-tree__empty-text){ // 重写el-tree没数据的时候显示暂无数据的样式
    min-width: 60px;
  }
  :deep(.el-tree ){ // 重写树形下拉el-tree样式
    width: 100%
  }
}
</style>
