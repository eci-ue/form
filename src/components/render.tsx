
import { Comp } from "../config";
import { concat, safe } from "../utils/index";
import { h as createElement, toRaw } from "vue";
import { FormItem, Col, Row, Input } from "ant-design-vue";

import type { Component, VNode } from "vue";
import type { FormOptionValue, FormItemData, FormState } from "../props";

type UpdateValue = (value: FormState) => void;

const getComp = function(item: FormItemData, state: FormState, callback: UpdateValue) {
  const props = { state, meta: item.meta, disabled: item.disabled };
  const onUpdate = function(value: FormState) {
    callback({ ...toRaw(state), ...value });
  }
  const onChange = function(value: string | number | Array<string | number>) {
    if (item.key) {
      if (typeof value === "object" && !Array.isArray(value)) {
        const target = safe.get<HTMLInputElement>(value, "target");
        onUpdate({ [item.key]: safe.get<string>(target, "value") || "" });
      } else {
        onUpdate({ [item.key]: value });
      }
    }
  };
  if (item.key) {
    safe.set(props, "meta.key", item.key);
    const value = safe.get<any>(state, item.key) || void 0;
    Object.assign(props, { value });
  }
  Object.assign(props, { "onUpdate:state": onUpdate, onChange });
  if (item.component) {
    if (typeof item.component === "string") {
      const value = Comp.get(item.component);
      if (value) {
        return createElement(value, props);
      }
    }
    return createElement(item.component as any, props);
  }
  return createElement(Input, props);
}

const ClassName = function(value?: string | string[]) {
  const list: string[] = [];
  if (value && typeof value === "string") {
    list.push(value);
  }
  if (value && Array.isArray(value)) {
    list.push(...value);
  }
  return list;
}

const formItem = function(props: FormItemData, state: FormState, onUpdateValue: UpdateValue) {
  let label;
  const className = ClassName(props.className);
  if (props.lable || typeof props.lable === "undefined") {
    label = props.lable ? props.lable : (<span>&nbsp;</span>);
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

export const render = function(value: FormOptionValue, state: FormState, onUpdateValue: UpdateValue): VNode | Component | undefined {
  if (value && Array.isArray(value)) {
    return (<Row gutter={ 24 }>
      {
        value.map((item: FormOptionValue) => {
          return (<Col span={ Math.ceil(24 / value.length) }>{ render(item, state, onUpdateValue) }</Col>);
        })
      }
    </Row>);
  }
  if (value && safe.get(value, "children")) {
    const opt = { "class":  ClassName(safe.get(value, "className")) };
    const children: VNode[] = [];
    const list = concat(safe.get<FormItemData>(value, "children"));
    for (const item of list) {
      const temp = render(item, state, onUpdateValue);
      if (temp) {
        children.push(temp as any);
      }
    }
    if (safe.get(value, "component")) {
      return createElement(safe.get<VNode>(value, "component"), opt, children);
    }
    return createElement("div", opt, children);
  } else if (value) {
    return formItem(value as FormItemData, state, onUpdateValue);
  }
}