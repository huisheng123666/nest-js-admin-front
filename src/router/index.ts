import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/reg",
    component: () => import("@/views/login/reg.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/dashboard/index.vue"),
      },
      {
        path: "/users",
        component: () => import("@/views/users/users.vue"),
      },
      {
        path: "/menus",
        component: () => import("@/views/menus/menus.vue"),
      },
      {
        path: "/roles",
        component: () => import("@/views/roles/roles.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
