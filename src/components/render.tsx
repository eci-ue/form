
import _ from "lodash-es";
import { Comp } from "../config";
import safeSet from "@fengqiaogang/safe-set";
import safeGet from "@fengqiaogang/safe-get";
import { h as createElement, toRaw } from "vue";
import { FormItem, Col, Row, Input } from "ant-design-vue";

import type { FormOptionValue, FormItemData, FormState } from "../props";

type UpdateValue = (value: FormState) => void;

const getComp = function(item: FormItemData, state: FormState, callback: UpdateValue) {
  const props = { state, ..._.pick(item, ["meta", "disabled"]) };
  const onUpdate = function(value: FormState) {
    callback({ ...toRaw(state), ...value });
  }
  const onChange = function(value: string | number | Array<string | number>) {
    if (item.key) {
      if (typeof value === "object" && !Array.isArray(value)) {
        const target = safeGet<HTMLInputElement>(value, "target");
        onUpdate({ [item.key]: safeGet<string>(target, "value") || "" });
      } else {
        onUpdate({ [item.key]: value });
      }
    }
  };
  if (item.key) {
    safeSet(props, "meta.key", item.key);
    const value = safeGet<any>(state, item.key) || void 0;
    _.assign(props, { value });
  }
  _.assign(props, { "onUpdate:state": onUpdate, onChange });
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

const formItem = function(props: FormItemData, state: FormState, onUpdateValue: UpdateValue) {
  let label;
  const className: string[] = [];
  if (props.className && typeof props.className) {
    className.push(props.className);
  }
  if (props.className && Array.isArray(props.className)) {
    className.push(...props.className);
  }
  if (_.isNil(props.lable) === false) {
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

export const render = function(value: FormOptionValue, state: FormState, onUpdateValue: UpdateValue) {
  if (value && Array.isArray(value)) {
    return (<Row gutter={ 24 }>
      {
        value.map((item: FormOptionValue) => {
          return (<Col span={ Math.ceil(24 / value.length) }>{ render(item, state, onUpdateValue) }</Col>);
        })
      }
    </Row>);
  }
  if (value) {
    return formItem(value, state, onUpdateValue);
  }
}