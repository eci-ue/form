import { concat, isNil } from "./index";
import { h as createElement, toRaw } from "vue";
import { FormItem, Col, Row, Input } from "ant-design-vue";

import type { Component, VNode } from "vue";
import type { FormOptionValue, FormItemData, FormState } from "../config/props";

type UpdateValue = (value: FormState) => void;

const getComp = function (item: FormItemData, state: FormState, callback: UpdateValue) {
  const props = {};
  if (item.props) {
    Object.assign(props, item.props);
  }
  const onUpdate = function (value: FormState) {
    const data = { ...toRaw(state), ...value };
    callback(data);
  }
  const onChange = function (e: any) {
    if (item.key) {
      let value;
      if (e && e.target) {
        const target: HTMLInputElement = e.target;
        value = target.value;
      } else {
        value = e;
      }
      onUpdate({ [item.key]: value });
    }
  };
  if (item.key) {
    const value = state[item.key] || void 0;
    Object.assign(props, { value });
  }
  Object.assign(props, { onChange });

  if (item.component) {
    return createElement(item.component as VNode, props, item.slots);
  }
  return createElement(Input, props, item.slots);
}

const ClassName = function (value?: string | string[]) {
  const list: string[] = [];
  if (value && typeof value === "string") {
    list.push(value);
  }
  if (value && Array.isArray(value)) {
    list.push(...value);
  }
  return list;
}

const formItem = function (props: FormItemData, state: FormState, onUpdateValue: UpdateValue) {
  let label;
  const className = ClassName(props.className);
  // @ts-ignore
  const tmp: string | VNode | Component = props.label || props["lable"];
  if (!isNil(tmp)) {
    label = tmp ? tmp : (<span>&nbsp;</span>);
  }
  if (props.from === false) {
    const opt = { "class": className };
    return createElement("div", opt, getComp(props, state, onUpdateValue));
  } else {
    const opt = { "class": className, name: props.key, rules: props.rules };
    const slots = { label, default: getComp(props, state, onUpdateValue) };
    return createElement(FormItem, opt, slots);
  }
}

export const render = function (value: FormOptionValue, state: FormState, onUpdateValue: UpdateValue): VNode | Component | undefined {
  if (value && Array.isArray(value)) {
    return (<Row gutter={24}>
      {
        value.map((item: FormOptionValue) => {
          return (<Col span={Math.ceil(24 / value.length)}>{render(item, state, onUpdateValue)}</Col>);
        })
      }
    </Row>);
  }
  // @ts-ignore
  if (value && value.children) {
    // @ts-ignore
    const opt = { "class": ClassName(value.className) };
    const children: VNode[] = [];
    // @ts-ignore
    const list = concat(value.children);
    for (const item of list) {
      if (item) {
        const temp = render(item, state, onUpdateValue);
        if (temp) {
          children.push(temp as any);
        }
      }
    }
    // @ts-ignore
    const node = value.component as VNode;
    if (node) {
      return createElement(node, opt, children);
    }
    return createElement("div", opt, children);
  } else if (value) {
    return formItem(value as FormItemData, state, onUpdateValue);
  }
}