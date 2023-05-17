<template>
  <div class="login">
    <el-form
      label-width="60"
      class="form"
      label-position="top"
      :model="formState"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="用户名" prop="username">
        <el-input clearable v-model="formState.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input clearable type="password" v-model="formState.password" />
      </el-form-item>
      <el-form-item prop="rember">
        <el-checkbox v-model="formState.rember">记住我</el-checkbox>
      </el-form-item>
      <el-form-item :error="errMsg">
        <el-button
          style="width: 100%"
          type="primary"
          @click="sumit"
          :loading="loading"
          >登录</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button @click="router.push('/reg')" style="width: 100%"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";

const router = useRouter();

const formState = reactive({
  username: "",
  password: "",
  rember: false,
});

const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: "请输入邮箱地址",
    },
    {
      type: "email",
      message: "请输入正确邮箱地址",
    },
  ],
  password: [
    { required: true, message: "请输入密码" },
    { min: 6, message: "请输入6位及以上密码" },
  ],
});

const formRef = ref<FormInstance>();

const errMsg = ref("");
const loading = ref(false);

function sumit() {
  formRef.value?.validate((valid) => {
    console.log(valid);
    if (valid) {
      errMsg.value = "账号或密码错误";
    }
  });
}
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    box-sizing: border-box;
    width: 350px;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 4px;
  }
}
</style>
