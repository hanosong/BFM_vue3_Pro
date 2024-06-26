<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ props.contentConfig.header?.title ?? "数据列表" }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">
        {{ props.contentConfig.header?.btnTitle ?? "新建数据" }}
      </el-button>
    </div>
    <!-- 用户管理的表格 -->
    <div class="table">
      <el-table :data="pageList" border style="width: 100%" v-bind="props.contentConfig.childrenTree"> <!-- 不要写死 row-key="id"  :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" ，还是动态写然后用v-bind绑定-->
        <!-- 使用配置的做法 -->
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item" show-overflow-tooltip>
              <template #default="rowScope">
                {{ fromatUTC(rowScope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler' ">
            <el-table-column align="center" v-bind="item" show-overflow-tooltip v-if="(isUpdate || isDelete)">
              <template #default="rowScope">
                <!-- 点击编辑的时候把整行的数据抛出去 -->
                <el-button v-if="isUpdate" size="small" icon="Edit" type="primary" text @click="handleEditBtnClick(rowScope.row)">
                  编辑
                </el-button>
                <el-button v-if="isDelete" @click="handleDelClick(rowScope.row?.id)" size="small" icon="Delete" type="danger" text>
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'custom'">
            <!-- 定制化的内容使用具名插槽 -->
            <el-table-column align="center" v-bind="item" show-overflow-tooltip>
              <template #default="rowScope">
                <!-- v-bind="rowScope" => 把数据回传出去; prop => 传自己的东西出去(所有的属性都会给到rowScope)-->
                <slot :name="item.slotName" v-bind="rowScope" :prop="item.prop"></slot>
              </template>
            </el-table-column>
          </template>

          <template v-else>
            <el-table-column align="center" v-bind="item" show-overflow-tooltip></el-table-column>
          </template>
        </template>

        <!-- 不使用配置直接做 -->
        <!-- 勾选框 -->
        <!-- <el-table-column
          type="selection"
          align="center"
          width="50px"
        />
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
        使用dayjs格式化时间
        <el-table-column
          align="center"
          label="创建时间"
          prop="createAt"
        >
          <template #default="rowScope">
            {{ fromatUTC(rowScope.row.createAt)}}
          </template>
        </el-table-column> -->
        <!-- <el-table-column
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
        </el-table-column> -->
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 30]"
        small :layout="layout" :total="pageTotalCount"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import useLoginStore from '@/store/login/login'
import { fromatUTC } from '@/utils/format';
import { ElNotification } from 'element-plus'
import {usePermissions} from "@/hooks/usePermissions";
import { computed } from 'vue';
interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string | undefined
      btnTitle?: string | undefined
    } | undefined
    propsList: any[]
    childrenTree?: any
  }
}

const props = defineProps<IProps>()

const emit = defineEmits(['newClick', "editClick"])
const currentPage = ref(1);
const pageSize = ref(10);

// 移动端表格配置
const layout = computed(() => {
  const {isPc} = useLoginStore()
  return isPc ? `sizes, prev, pager, next, jumper,total` : `prev, next,`
})


// 0. 一进入组件,立即判断是否具有相关按钮权限
let isCreate = usePermissions(`${props.contentConfig.pageName}:create`);
let isUpdate = usePermissions(`${props.contentConfig.pageName}:update`);
let isDelete = usePermissions(`${props.contentConfig.pageName}:delete`);
let isQuery = usePermissions(`${props.contentConfig.pageName}:query`);

console.log(isUpdate, isDelete, "--------")
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
  if(!isQuery && !(props.contentConfig.pageName === 'story')) {
    ElNotification({
      title: 'Warning',
      message: '很抱歉,您没有查看权限',
      type: 'warning',
    })
    return
  }
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * pageSize.value;
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }

  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo);
}

// 删除
const handleDelClick = (id: string | number) => {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}

// 新建用户功能 -- 弹出弹窗
const handleNewUserClick = () => {
  emit("newClick")
}
// 编辑 -- 弹出弹窗
const handleEditBtnClick = (itemData: any) => {
  emit('editClick', itemData)
}

// 监听systemStore中的actions被执行
systemStore.$onAction(({ name, after }) => {
  if (name === 'editPageDataAction' || name === 'deletePageByIdAction' || name === 'newPageDataAction') {
    // afer => 等待这些action成功执行后触发
    after(() => {
      currentPage.value = 1;// 表格页面重置到第一页
    })
  }
})

defineExpose({ fetchPageListData })
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
