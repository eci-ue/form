
import type { Component } from "vue";
import type { ModalFuncProps } from "ant-design-vue";
import type { RuleObject } from "ant-design-vue/lib/form/interface";

export interface FormState {
  [key: string]: any;
}

export interface Props<State, Layout> {
  value: State;
  items: FormOptionValue;
  option?: ModalFuncProps;
  layout?: Layout | string;
  class?: string;
  buttons?: boolean | Component;
};

export interface FormItemMeta {
  placeholder?: string;
  key?: string; // 键 （非虚拟 dom key 概念）
  [key: string]: any;
}

export interface FormItemData {
  key?: string; // 键 （非虚拟 dom key 概念）
  disabled?: boolean; // 是否禁用
  from?: boolean;     // 是否为表单 默认 true
  lable?: string | Component;
  value?: string | number | Array<string | number>, // 表单数据
  rules?: RuleObject | RuleObject[];  // 校验规则
  meta?: FormItemMeta;
  className?: string,
  component?: Component | string; // 表单组件, 默认 Antd Input
};

export type FormOptionValue = FormItemData | Array<FormItemData | Array<FormItemData | FormItemData[]>>;