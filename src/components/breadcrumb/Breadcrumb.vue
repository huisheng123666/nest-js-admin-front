<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-if="menu" :to="{ path: menu.path }">{{
      menu.name
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { useMenusStore } from "@/store/menus";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const menuStore = useMenusStore();

const menu = computed(() => {
  const item = menuStore.menus.find((item) => item.path === route.path);
  return item;
});
</script>

<style scoped lang="sass"></style>
