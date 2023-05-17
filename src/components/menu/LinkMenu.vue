<template>
  <el-menu :default-openeds="['1']" router :default-active="routePath">
    <el-sub-menu index="1">
      <template #title>toimc通用业务框架</template>
      <el-menu-item index="/"
        ><el-icon><component :is="Icons.HomeFilled" /></el-icon
        >首页</el-menu-item
      >
      <el-menu-item :index="item.path" v-for="item in menus" :key="item.id">
        <el-icon><component :is="Icons[item.icon]" /></el-icon>
        {{ item.name }}</el-menu-item
      >
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { useMenusStore } from "@/store/menus";
import { computed } from "vue";
import { useRoute } from "vue-router";
import * as Icons from "@element-plus/icons-vue";

const menusStore = useMenusStore();

const menus = computed(() => menusStore.menus);

const route = useRoute();

const routePath = computed(() => route.path);
</script>

<style scoped lang="scss"></style>
