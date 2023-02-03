<script setup lang="ts">
import { form } from "@ui/form";
import { Input, InputPassword, Button } from "ant-design-vue";
import type { FormOptionValue } from "@ui/form";

const items: FormOptionValue = [
  {
    key: "name",
    component: Input,
    meta: { placeholder: "请输入账号" }
  },
  {
    key: "password",
    component: InputPassword,
    meta: { placeholder: "请输入密码" }
  }
];

const onModel = async function() {
  const data = await form(items, "用户登录");
  if (data) {
    console.log(data);
  }
}
</script>

<template>
  <div>
    <Button @click="onModel">弹框模式表单</Button>
  </div>
</template>