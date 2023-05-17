import { Menu } from "@/types";
import { defineStore } from "pinia";

interface MenusState {
  menus: Menu[];
}

export const useMenusStore = defineStore<string, MenusState>("menu", {
  state: () => ({
    menus: [
      {
        id: 1,
        name: "用户管理",
        path: "/users",
        icon: "User",
      },
      {
        id: 2,
        name: "角色管理",
        path: "/roles",
        icon: "Key",
      },
      {
        id: 3,
        name: "菜单管理",
        path: "/menus",
        icon: "Menu",
      },
    ],
  }),
});
