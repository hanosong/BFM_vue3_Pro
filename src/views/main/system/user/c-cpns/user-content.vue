<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <!-- 用户管理的表格 -->
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
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
          label="用户名"
          prop="name"
          width="150px"
        />
        <el-table-column
          align="center"
          label="真实姓名"
          prop="realname"
          width="150px"
        />
        <el-table-column
          align="center"
          label="手机号码"
          prop="cellphone"
          width="150px"
        />
        <!-- 1-- 启用； 0-- 禁用 -->
        <el-table-column
          align="center"
          label="状态"
          prop="enable"
          width="100px"
        >
          <!-- 获取对应的那一条数据 -- 作用域插槽 -->
          <template #default="rowScope">
            <el-button
              size="small"
              :type="rowScope.row.enable ? 'primary' : 'danger'"
              >
              {{ rowScope.row.enable ? '启用' : '禁用'}}
            </el-button>
          </template>
        </el-table-column>
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
          <el-button size="small" icon="Edit" type="primary" text>
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
      :total="usersTotalCount"
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
const emit = defineEmits(['newUserClick'])
const currentPage = ref(1);
const pageSize = ref(10);

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()
fetchUserListData()

// 2.获取usersList数据(异步，也可以使用computed解决),进行展示
// storeToRefs => 可以确保在组件中使用store中的状态属性时，能够实现响应式更新
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 3.页码相关
const handleSizeChange = () => {
  fetchUserListData()
}
const handleCurrentChange = () => {
  fetchUserListData()
}


// 请求表格数据
function fetchUserListData(queryInfo: any = {}) {
  const size = pageSize.value;
  const offset =  (currentPage.value - 1) * pageSize.value;
  const info = {size, offset, ...queryInfo};
  systemStore.postUsersListAction(info);
}

// 删除
const handleDelClick = (id: string | number) => {
  systemStore.delUserByIdAction(id)
}

// 新建用户功能
const handleNewUserClick = () => {
  emit("newUserClick")
}
defineExpose({fetchUserListData})
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

