<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建部门</el-button>
    </div>
    <!-- 用户管理的表格 -->
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <!-- 勾选框 -->
        <el-table-column
          type="selection"
          align="center"
          width="50px"
        />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />

        <el-table-column
          align="center"
          label="部门名称"
          prop="name"
          width="150px"
        />
        <el-table-column
          align="center"
          label="部门领导"
          prop="leader"
          width="150px"
        />
        <el-table-column
          align="center"
          label="上级部门"
          prop="parentId"
          width="150px"
        />
        <!-- 使用dayjs格式化时间 -->
        <el-table-column
          align="center"
          label="创建时间"
          prop="createAt"
        >
          <template #default="rowScope">
            {{ fromatUTC(rowScope.row.createAt)}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="更新时间"
          prop="updateAt"
        >
          <template #default="rowScope">
            {{ fromatUTC(rowScope.row.updateAt)}}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="操作"
          width="150px"
        >
         <template #default="rowScope">
          <el-button size="small" icon="Edit" type="primary" text @click="handleEditBtnClick(rowScope.row)">
            编辑
          </el-button>
          <el-button  @click="handleDelClick(rowScope.row?.id)" size="small" icon="Delete" type="danger" text>
            删除
          </el-button>
         </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 30]"
      small="small"
      layout="sizes, prev, pager, next, jumper,total"
      :total="pageTotalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import {fromatUTC} from '@/utils/format';
const emit = defineEmits(['newClick', "editClick"])
const currentPage = ref(1);
const pageSize = ref(10);

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()
fetchPageListData()

// 2.pageCountList(异步，也可以使用computed解决),进行展示
// storeToRefs => 可以确保在组件中使用store中的状态属性时，能够实现响应式更新
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3.页码相关
const handleSizeChange = () => {
  fetchPageListData()
}
const handleCurrentChange = () => {
  fetchPageListData()
}


// 请求表格数据
function fetchPageListData(formData: any = {}) {
  const size = pageSize.value;
  const offset =  (currentPage.value - 1) * pageSize.value;
  const pageInfo = { size, offset }
  const queryInfo = {...pageInfo, ...formData}

  systemStore.postPageListAction("department", queryInfo);
}

// 删除
const handleDelClick = (id: string | number) => {
  systemStore.deletePageByIdAction('department',id)
}

// 新建用户功能
const handleNewUserClick = () => {
  emit("newClick")
}
// 编辑
const handleEditBtnClick = (itemData: any) => {
  emit('editClick', itemData)
}

defineExpose({fetchPageListData})
</script>

<style lang="less" scoped>
.content {
  margin-top: 10px;
  padding: 15px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

// 分页器靠右
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}
</style>
import type { deletePageById } from '@/service/main/system/system';

