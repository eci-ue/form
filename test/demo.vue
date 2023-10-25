<script setup lang="ts">
import { Form } from "../src/index";
import type { FormOptionValue, FormOption } from "../src/props";

const items: FormOptionValue = [
  {
    key: "age",
    value: "",
    lable: "A",
    rules: {
      required: true,
      type: "number",
    },
    meta: { placeholder: "请输入邮箱" },
  },
  {
    key: "name",
    value: "",
    meta: { placeholder: "请输入姓名" },
  },
  {
    children: [
      {
        key: "c",
        value: "",
        lable: "C",
        meta: { placeholder: "请输入CCCC" },
      },
      {
        key: "d",
        value: "",
        lable: "D",
        meta: { placeholder: "请输入DDD" },
      },
    ]
  },
];
</script>

<template>
  <div style="padding: 20px;">
    <Form class="p-5" :items="items"></Form>
  </div>
</template>

<style>
.p-5 {
  padding: 20px;
}
</style>