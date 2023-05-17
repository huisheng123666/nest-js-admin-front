import * as Icons from "@element-plus/icons-vue";

export interface Menu {
  id: number;
  name: string;
  path: string;
  icon: keyof typeof Icons;
}
