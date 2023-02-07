<script setup lang="ts">
import { onMounted } from "vue";
import { model } from "../src/index";
import type { FormOptionValue } from "../types/form";

const items: FormOptionValue = [
  {
    key: "mail",
    value: "",
    meta: { placeholder: "请输入邮箱" },
  }
];


onMounted(async function() {
  const data = await model(items, "测试");
  console.log(data);
});
</script>

<template>
  <div>1</div>
</template>