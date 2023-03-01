<script setup lang="ts">
import { onMounted } from "vue";
import { form } from "../src/index";
import { rule as rules } from "@ue/utils";
import type { FormOptionValue } from "../src/props";

const items: FormOptionValue = [
  {
    key: "age",
    value: "",
    lable: "A",
    meta: { placeholder: "请输入邮箱" },
  },
  {
    key: "name",
    value: "",
    rules: rules.text(),
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


onMounted(() => {
  setTimeout(async function() {
    const data = await form(items, "测试");
    console.log(data);
  })
});
</script>

<template>
  <div></div>
</template>