<script setup lang="ts">
import { Form } from "../src/index";
import { h as createElement, toRaw } from "vue";
import { Select, SelectOption } from "ant-design-vue";
import type { FormOptionValue } from "../src/props";

const items: FormOptionValue = [
  {
    key: "age",
    value: "",
    label: "A",
    rules: {
      required: true,
    },
    props: { placeholder: "请输入邮箱" },
  },
  {
    key: "mail",
    value: "",
    label: "邮箱",
    component: Select,
    props: { 
      placeholder: "请选择邮箱",
      fieldNames: {
        label: "label",
        value: "value"
      }
    },
    slots: [
      createElement(SelectOption, { value: "a", label: "1@a.com" }),
      createElement(SelectOption, { value: "b", label: "2@a.com"}),
    ]
  },
  {
    children: [
      {
        key: "name",
        value: "",
        label: "用户",
        component: Select,
        props: {
          placeholder: "请选择用户",
          fieldNames: {
            label: "label",
            value: "value"
          },
          options: [
            { label: "张三", value: "a" },
            { label: "李四", value: "b" },
          ]
        }
      },
      {
        key: "d",
        value: "",
        label: "D",
        props: { placeholder: "请输入DDD" },
      },
    ]
  },
];

const onChange = function(data: object) {
  console.log(data);
}
</script>

<template>
  <div style="padding: 20px;">
    <Form class="p-5" :items="items" @change.self="onChange"></Form>
  </div>
</template>

<style>
.p-5 {
  padding: 20px;
}
</style>