/**
 * @file 动态表单
 * @author svon.me@gmail.com
 */

import _ from "lodash-es";
import { Comp } from "../config";
import { useValidate } from "src/utils";
import safeSet from "@fengqiaogang/safe-set";
import { Form, FormItem, Button, Space, Divider, Input } from "ant-design-vue";
import { PropType, h as createElement, defineComponent, toRaw, computed, ref } from "vue";

import type { Component } from "vue";
import type { ModalFuncProps } from "ant-design-vue";
import type { FormItemData, FormOptionValue, Props } from "types/form";

interface FormState {
  [key: string]: any;
}

// 初始化表达数据
const initData = function(data: FormState = {}, form: FormOptionValue) {
  for(const item of _.flattenDeep(_.concat(form))) {
    if (item.key) {
      safeSet(data, item.key, item.value);
    }
  }
  return data;
}

const getComp = function(item: FormItemData, state: FormState, change: (value: FormState) => void) {
  const props = { state, ..._.pick(item, ["meta", "disabled"]) };
  const onUpdate = function(value: FormState) {
    change({ ...toRaw(state), ...value });
  }
  const onChange = function(value: string | number | Array<string | number>) {
    if (item.key) {
      onUpdate({ [item.key]: value });
    }
  };
  if (item.key) {
    safeSet(props, "meta.key", item.key);
    _.assign(props, { value: state[item.key] });
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

const cols = [
  "",
  "grid-cols-1",
  "grid-cols-2", 
  "grid-cols-3", 
  "grid-cols-4", 
  "grid-cols-5"
];

enum Layout {
  horizontal = "horizontal",
  vertical = "vertical",
  inline = "inline"
}

export default defineComponent({
  name: "UiForm",
  props: {
    value: {
      type: Object as PropType<FormState>,
      default () {
        return {};
      }
    },
    items: {
      required: true,
      type: [Array, Object] as PropType<FormOptionValue>
    },
    option: {
      type: Object as PropType<ModalFuncProps>,
      default () {
        return {};
      }
    },
    layout: {
      type: String as PropType<string | Layout>,
      default () {
        return Layout.vertical;
      }
    },
    class: {
      type: String,
      default: ""
    },
    buttons: {
      type: Boolean as PropType<boolean | Component>,
      default: () => true
    }
  },
  setup (props: Props<FormState, Layout>, { expose, slots, emit }) {
    const { formRef, validate } = useValidate();
    const state = ref<FormState>(initData(props.value, props.items));
    const onStateChange = function(value: FormState) {
      state.value = value;
      emit("update:value", toRaw(value));
    };

    const config = computed<ModalFuncProps>(function() {
      return _.assign({
        okText: "Submit",
        cancelText: "Cancel"
      }, props.option);
    });

    const onCancel = function() {
      emit("cancel");
    };
    const onSubmit = function () {
      return validate(function() {
        const value = toRaw(state.value);
        emit("submit", value);
        return value;
      });
    }
    expose({ onSubmit, validate, });

    const getButtons = function() {
      if (_.isBoolean(props.buttons)) {
        if (slots.buttons) {
          return slots.buttons();
        }
        return (<div class="pt-3">
          <Divider class="m-0" />
          <div class="pt-3 text-center">
            <Space>
              <Button onClick={ onCancel }>{ config.value.cancelText }</Button>
              <Button type="primary" onClick={onSubmit}>{ config.value.okText }</Button>
            </Space>
          </div>
        </div>);
      }
      return props.buttons;
    };

    return () => {
      const renderForm = function(value: FormOptionValue): any {
        if (_.isArray(value)) {
          return (<>
            {
              _.map(value as FormItemData[], (item: FormItemData) =>{
                if (_.isArray(item)) {
                  const className = ["grid", "gap-x-8", cols[_.size(item)]];
                  return (<div class={ className }>
                    { renderForm(_.flatten(item)) }
                  </div>);
                }
                return renderForm(item);
              })
            }
          </>);
        }
        const data = value as FormItemData;
        if (data) {
          let label;
          const className: string[] = [];
          if (data.className && _.isString(data.className)) {
            className.push(data.className);
          }
          if (data.className && _.isArray(data.className)) {
            className.push(...data.className);
          }
          if (_.isNil(data.lable) === false) {
            label = data.lable ? data.lable : (<span>&nbsp;</span>);
          }
          if (data.from === false) {
            const opt = { "class": className };
            return createElement("div", opt, getComp(data, state.value, onStateChange));
          } else {
            const opt = { "class": className, name: data.key, rules: data.rules };
            const slots = { label, default: getComp(data, state.value, onStateChange) };
            return createElement(FormItem, opt, slots);
          }
        }
      }
      const className = props.class ? props.class : ["px-6", "py-3", "first:pt-6"];
      return (<div class={ className }>
        <Form ref={ formRef } layout={ props.layout as Layout } model={ state.value }>
          { renderForm(props.items) }
          { props.buttons && getButtons() }
        </Form>
      </div>);
    };
  },
});
