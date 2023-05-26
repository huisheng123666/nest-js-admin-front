<template>
  <div>
    <el-button type="primary" @click="toggleDialog(true, 1)">新增</el-button>
    <el-table :data="tableList" v-loading="loading">
      <el-table-column label="用户名" prop="username" width="100" />
      <el-table-column
        label="角色"
        prop="roles"
        width="300"
        show-overflow-tooltip
      >
        <template #default="scope">
          {{ scope.row.roles?.map((role: RoleItem) => role.name).join(",") }}
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="profile.gender" min-width="80" />
      <el-table-column
        label="头像"
        prop="profile.photo"
        min-width="100"
        show-overflow-tooltip
      />
      <el-table-column label="地址" prop="profile.address" min-width="150" />
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="toggleDialog(true, 2, scope.row as UserItem)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="removeRow(scope.row as UserItem)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialogType !== 1 ? '编辑用户' : '新增用户'"
      v-model="showDialog"
      width="600"
      @close="toggleDialog(false)"
    >
      <el-form
        label-width="100"
        :model="addFormState"
        :rules="rules"
        ref="addFormRef"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="addFormState.username"
          />
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-select
            style="width: 460px"
            placeholder="请选择角色"
            multiple
            v-model="addFormState.roles"
          >
            <el-option :value="1" label="管理员" />
            <el-option :value="2" label="普通用户" />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="profile.gender">
          <el-radio-group v-model="addFormState.profile.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户头像" prop="profile.photo">
          <el-input
            placeholder="请输入头像链接"
            v-model="addFormState.profile.photo"
          />
        </el-form-item>
        <el-form-item label="地址" prop="profile.address">
          <el-input
            placeholder="请输入地址"
            v-model="addFormState.profile.address"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="addSubmit">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import http from "@/utils/http";
import { ref, nextTick } from "vue";
import { ElMessageBox } from "element-plus";
import type { FormRules, FormInstance } from "element-plus";
import { reactive } from "vue";

interface Profile {
  id: number;
  gender: number;
  address: string;
  photo: string;
}

interface RoleItem {
  id: number;
  name: string;
}

interface UserItem {
  id?: number;
  username: string;
  profile: Profile;
  roles: RoleItem[];
}

const addFormState = reactive<{
  username: string;
  roles: number[];
  profile: Partial<Profile>;
}>({
  username: "",
  roles: [],
  profile: {
    gender: 1,
    address: "",
    photo: "",
  },
});

const addFormRef = ref<FormInstance>();

const rules: FormRules = {
  username: [{ required: true, message: "请输入用户名" }],
  "profile.address": [{ required: true, message: "请输入地址" }],
  "profile.photo": [{ required: true, message: "请输入头像" }],
};

const tableList = ref<UserItem[]>([]);

const loading = ref(true);

function getList() {
  loading.value = true;
  http
    .get<any, UserItem[]>("/user", {
      params: {
        page: 1,
      },
    })
    .then((res) => {
      loading.value = false;
      tableList.value = res;
    });
}

getList();

function removeRow(row: UserItem) {
  ElMessageBox.confirm("确定要删除吗？", "删除", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
  }).then(() => {
    http.delete("/user/" + row.id).then(() => {
      getList();
    });
  });
}

const showDialog = ref(false);
const editRow = ref<UserItem | null>();
const dialogType = ref(1);

// type 1: add 2: edit
function toggleDialog(show: boolean, type = 1, row: UserItem | null = null) {
  showDialog.value = show;
  if (show && type === 2) {
    nextTick(() => {
      addFormState.username = row?.username!;
      addFormState.profile.photo = row?.profile.photo!;
      addFormState.profile.address = row?.profile.address!;
      addFormState.profile.gender = row?.profile.gender!;
      addFormState.roles = row?.roles.map((item) => item.id)!;
    });
  }
  editRow.value = row;
  dialogType.value = type;
  if (!show) {
    addFormRef.value?.resetFields();
  }
}

const addLoading = ref(false);

function addSubmit() {
  addFormRef.value?.validate().then((valid) => {
    if (valid) {
      addLoading.value = true;
      http
        .post("/user", {
          ...addFormState,
          password: "123456",
        })
        .then((res) => {
          addLoading.value = false;
          console.log(res);
          toggleDialog(false);
          getList();
        });
    }
  });
}
</script>

<style scoped lang="sass"></style>
