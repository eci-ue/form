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
import { config, model } from "@ue/form";
import { Input } from "ant-design-vue";
// 配置组件别名
config("text", Input);

model([
  {
    key: "name",
    component: "text", // 使用别名
  }
]);

```

## FormItemMeta 配置
名称 | 类型 | 是否必填 |描述
-- | -- | -- | -- 
key | string | 否 | 键， 表单字段 key
placeholder | string | 否 | 占位符，提示语

```
interface FormItemMeta {
  placeholder?: string;
  key?: string;
  [key: string]: any;
}
```


## FormItemData 配置

名称 | 类型 | 是否必填 |描述
-- | -- | -- | -- 
key | string | 否 | 键， 表单字段 key
disabled | boolean | 否 | 是否禁用
from | boolean | 否 | 是否已表单形式渲染，默认为 true
lable | string | 否 | 表单字段文本
value | string、number、string[]、number[] | 否 | 单个表单元素默认值
rules | RuleObject、 RuleObject[] | 否 | 校验规则
meta | FormItemMeta | 否 | 其余附加配置
component | Component、string | 否 | 表单组件, 默认 Antd Input
className | string | 否 | class 内容

```
interface FormItemData {
  key?: string;
  from?: boolean;
  disabled?: boolean;
  className?: string;
  meta?: FormItemMeta;
  lable?: string | Component;
  component?: Component | string;
  rules?: RuleObject | RuleObject[];
  value?: string | number | Array<string | number>;
};
```

