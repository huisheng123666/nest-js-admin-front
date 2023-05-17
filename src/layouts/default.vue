<template>
  <div class="layout">
    <el-container style="height: 100vh">
      <el-aside class="aside" width="200px">
        <el-scrollbar>
          <link-menu />
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header class="header">
          <Breadcrumb />
          <div style="flex: 1"></div>
          <el-dropdown @command="handleCommand">
            <div class="user">
              <el-avatar
                :size="30"
                src="https://img2.baidu.com/it/u=473659940,2616707866&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
              />
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="username"
                  >用户名：xmw</el-dropdown-item
                >
                <el-dropdown-item command="email"
                  >邮箱：571692056@qq.com</el-dropdown-item
                >
                <el-dropdown-item command="logout">登出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from "@/components/breadcrumb/Breadcrumb.vue";
import LinkMenu from "@/components/menu/LinkMenu.vue";
import { ArrowDown } from "@element-plus/icons-vue";

function handleCommand(command: string | number | object) {
  if (command === "logout") {
    console.log("logout");
  }
}
</script>

<style scoped lang="scss">
.layout {
  min-height: 100vh;
  ::v-deep(.el-menu) {
    border-right: none;
    background: #1d3043;
    .el-menu-item {
      color: #fff;
      &.is-active {
        color: aqua;
      }
      &:hover {
        background-color: #213d5a;
      }
    }
    .el-sub-menu__title {
      color: #fff;
      &:hover {
        background-color: #213d5a;
      }
    }
  }
  .aside {
    border-right: 1px solid #eee;
    background: #1d3043;
  }
  .header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    .user {
      display: flex;
      align-items: center;
    }
  }
}
</style>
