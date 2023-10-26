
import type { Component, VNode, Ref } from "vue";
import type { ModalFuncProps } from "ant-design-vue";
import type { RuleObject } from "ant-design-vue/lib/form/interface";

export interface FormState {
  [key: string]: any;
}

export interface FormOption extends ModalFuncProps{
  textAlign?: string;
  divider?: boolean;
  loading?: Ref<boolean>;
}

export interface Props<State, Layout> {
  value: State;
  items: FormOptionValue;
  option: FormOption;
  layout?: Layout | string;
  class?: string;
  buttons?: boolean | Component;
};

export interface FormItemProps {
  /** 是否禁用 */
  disabled?: boolean;
  // 提示语
  placeholder?: string;
  [key: string]: any;
};


export interface FormItemData {
  /** 键 （非虚拟 dom key 概念） */
  key?: string; 
  /** 是否为表单 默认 true */
  from?: boolean;
  label?: string | Component | VNode;
  /** 表单数据 */
  value?: string | number | Array<string | number>;
  /** 校验规则 */
  rules?: RuleObject | RuleObject[];
  className?: string;
  /** 表单组件, 默认 Antd Input */
  component?: VNode | Component | string; 
  // 传递给 component 的配置参数
  props?: FormItemProps;
  slots?: any;
  /** 启用该属性当前组件不会以表单进行渲染 */
  children?: FormItemData | FormItemData[];
};



export type FormOptionValue = FormItemData | Array<FormItemData | Array<FormItemData | FormItemData[]>>;