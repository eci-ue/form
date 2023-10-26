/**
 * @file 动态表单
 * @author svon.me@gmail.com
 */

import { Layout } from "./type";
import { render } from "./render";
import locale from "ant-design-vue/es/locale/en_US";
import { Form, Button, Space, Divider } from "ant-design-vue";
import { useValidate, concat, safe } from "../utils/index";
import { PropType, defineComponent, toRaw, ref } from "vue";

import type { Component, StyleValue } from "vue";
import type { FormOptionValue, FormState, Props, FormOption } from "../props";

// 初始化表达数据
const initData = function(form: FormOptionValue) {
  const data: FormState = {};
  const list = concat(form);
  for(const item of list) {
    if (Array.isArray(item)) {
      const value = initData(item);
      Object.assign(data, value);
    } else if (item.children) {
      const value = initData(item.children);
      Object.assign(data, value);
    } else if (item.key) {
      safe.set(data, item.key, item.value);
    }
  }
  return data;
}


export default defineComponent({
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
      type: Object as PropType<FormOption>,
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
    const state = ref<FormState>({ ...toRaw(props.value || {}), ...initData(props.items) });
    const onStateChange = function(value: FormState) {
      const data = { ...value };
      state.value = value;
      emit("update:value", data);
      emit("change", data);
    };

    const config = function() {
      const tmp = Object.assign({}, props.option || {});
      if (!tmp.okText || !tmp.cancelText) {
        if (!tmp.okText) {
          tmp.okText = locale.Modal?.okText || "Submit";
        }
        if (!tmp.cancelText) {
          tmp.cancelText = locale.Modal?.cancelText || "Cancel";
        }
      }
      return tmp;
    };

    const onCancel = function() {
      emit("cancel");
    };
    const onSubmit = function () {
      return validate(function() {
        return toRaw(state.value);
      });
    }
    const onClick = async function(e: Event) {
      const value = await onSubmit();
      if (value) {
        emit("submit", e, value);
      }
    }
    expose({ onSubmit, validate });

    const getButtons = function() {
      if (props.buttons && typeof props.buttons === "boolean") {
        if (slots.buttons) {
          return slots.buttons();
        }
        const option = config();
        const textAlign: string = props.option.textAlign ? props.option.textAlign : "center";
        const buttonStyle: StyleValue = {
          "paddingTop": "12px", 
          "textAlign": textAlign as any
        }
        return (<div>
          { option.divider ? <Divider style="margin: 0;"></Divider> : void 0 }
          <div style={ buttonStyle }>
            <Space>
              <Button { ...option.cancelButtonProps } onClick={ onCancel }>{ option.cancelText }</Button>
              <Button type="primary" loading={ option.loading?.value } { ...option.okButtonProps } onClick={onClick}>{ option.okText }</Button>
            </Space>
          </div>
        </div>);
      }
      return props.buttons;
    };

    return () => {
      return (<div>
        <div class={ props.class }>
          <Form ref={ formRef } layout={ props.layout as Layout } model={ state.value }>
            {
              concat(props.items).map(function(value: FormOptionValue) {
                return render(value, state.value, onStateChange);
              })
            }
          </Form>
        </div>
        { props.buttons && getButtons() }
      </div>);
    };
  },
});
