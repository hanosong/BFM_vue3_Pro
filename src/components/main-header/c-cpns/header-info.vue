<template>
   <div class="header-info">
    <!-- 操作相关的小图标 -->
    <div class="operation">
      <span>
        <el-icon><Phone /></el-icon>
      </span>
      <span>
        <el-icon><Sunny /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
    </div>

    <!-- 个人信息 -->
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="30"
            src="https://p26-passport.byteacctimg.com/img/user-avatar/3607e2aee7ea5daabb69b042a513ce3f~40x40.awebp"
          />
          <span class="name">哈鋆</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
   </div>
</template>

<script setup lang="ts">
import {localCache} from "@/utils/cache";
import {LOGIN_TOKEN} from "@/global/constants";
import {useRouter} from "vue-router";
 const router = useRouter()
 /**
  * 退出
  */
 const handleExitClick = () => {
  localCache.removeCache(LOGIN_TOKEN);
  router.push("/login")
 }
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}

.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 5px;
    }
  }
}

.info {
  // 弹出来的下拉框，其实没有放在app里面，而是在外面又有一个div，
  // 使用:deep(.el-dropdown-menu__item) 无法选中（只能选中info的子元素）
  // deep的用法：在父组件中写样式， 可以选中子组件的根元素，但是非根元素的子元素无法选中=> 使用deep
  // 使用:global的意思是全局html设置样式
  :global(.el-dropdown-menu__item) {

    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
