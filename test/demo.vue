<script setup lang="ts">
import { onMounted } from "vue";
import { model } from "../src/index";
import type { FormOptionValue } from "../types/form";

const items: FormOptionValue = [
  {
    key: "age",
    value: "1",
    lable: "B",
    meta: { placeholder: "请输入邮箱" },
  },
  {
    key: "name",
    value: "2",
    lable: "D",
    meta: { placeholder: "请输入姓名" },
  }
];


onMounted(() => {
  setTimeout(async function() {
    const data = await model(items, "测试");
    console.log(data);
  })
});
</script>

<template>
  <div></div>
</template>