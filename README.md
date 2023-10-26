# @ue/form

```
  基于 Ant Design 而封装的动态表单
  简单配置，快速开发
```

## 功能

- 支持自定义表单组件
- 使用配置的方式布局

## 安装

```
pnpm install @fengqiaogang/safe-get @fengqiaogang/safe-set
pnpm install @ue/form --registry http://npm.jslion.xyz/
```

**使用**

```
import { Form } from "@ue/form";
```

## 案例

**组件模式**
```
<script setup lang="ts">
import { Form } from "@ue/form";
import { Input, InputPassword } from "ant-design-vue";
import type { FormOptionValue } from "@ue/form/types/props";

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

const onSubmit = function(data: object) {
  console.log(data);
}
</script>

<template>
  <div>
    <Form :items="items" @submit="onSubmit"></Form>
  </div>
</template>
```

**Config**
```
import * as modal from "@ue/modal";
import { Select } from "ant-design-vue";
import { h as createElement } from "vue";

modal.form([
  {
    key: "user",
    component: Select,
    props: { 
      placeholder: "请选择用户",
      fieldNames: { label: "label", value: "value" },
    },
    slots: [
      createElement(SelectOption, { value: "u001", label: "张三" }),
      createElement(SelectOption, { value: "u002", label: "李四"}),
    ]
  },
  {
    key: "mail",
    component: Select,
    props: { 
      placeholder: "请选择邮箱",
      fieldNames: { label: "label", value: "value" },
      options: [
        { value: "zhangsan@mail.com", label: "zhangsan@mail.com" },
        { value: "lisi@mail.com", label: "lisi@mail.com" },
      ]
    },
  }
]);

```

## props 配置

配合 component 使用, props 中的所有数据都将传给 component 对应的组件

```


## FormItemData 配置

名称 | 类型 | 是否必填 |描述
-- | -- | -- | -- 
key | string | 否 | 键， 表单字段 key
from | boolean | 否 | 是否已表单形式渲染，默认为 true
label | string | 否 | 表单字段文本
value | string、number、string[]、number[] | 否 | 单个表单元素默认值
rules | RuleObject、 RuleObject[] | 否 | 校验规则
component | Component、string | 否 | 表单组件, 默认 Antd Input
props | Object | 否 | component 附加配置
slots | Any | 否 | 以 component slots形式展示 
className | string | 否 | class 内容


