<h1 align="center">@ui/form</h1>

<div align="center">
  <h3>基于 Ant Design 而封装的动态表单</h3>
  <p>简单配置，快速开发</p>
</div>

## 功能

- 支持自定义表单组件
- 使用配置的方式布局

## 安装

```
pnpm install @ui/form --registry http://npm.jslion.xyz/
```

**使用**

```
import { form, ui } from "@ui/form";
```

## 案例

**表单模式**
```
<script setup lang="ts">
import { ui } from "@ui/form";
import { Input, InputPassword } from "ant-design-vue";
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

const onSubmit = function(data: object) {
  console.log(data);
}
</script>

<template>
  <div>
    <ui :items="items" @submit="onSubmit"></ui>
  </div>
</template>
```

**弹框模式**
```
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
rules | RuleObject | RuleObject[] | 否 | 校验规则
meta | FormItemMeta | 否 | 其余附加配置
component | Component、string | 是 | 表单组件
className | string | 否 | class 内容

```
interface FormItemData {
  key?: string;
  from?: boolean;
  disabled?: boolean;
  className?: string;
  meta?: FormItemMeta;
  lable?: string | Component;
  component: Component | string;
  rules?: RuleObject | RuleObject[];
  value?: string | number | Array<string | number>;
};
```

