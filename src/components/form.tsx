/**
 * @file 动态表单
 * @author svon.me@gmail.com
 */

import I18n from "@ue/i18n";
import { Layout } from "./type";
import { render } from "./render";
import { Form, Button, Space } from "ant-design-vue";
import { useValidate, concat, safe } from "../utils/index";
import { PropType, defineComponent, toRaw, ref } from "vue";

import type { Component } from "vue";
import type { ModalFuncProps } from "ant-design-vue";
import type { FormOptionValue, FormState, Props } from "../props";

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
    const state = ref<FormState>({ ...toRaw(props.value || {}), ...initData(props.items) });
    const onStateChange = function(value: FormState) {
      state.value = value;
      emit("update:value", toRaw(value));
    };

    const config = function() {
      const tmp = Object.assign({}, props.option || {});
      if (!tmp.okText || !tmp.cancelText) {
        const i18n = I18n();
        if (!tmp.okText) {
          tmp.okText = i18n.common.button.submit;
        }
        if (!tmp.cancelText) {
          tmp.cancelText = i18n.common.button.cancel;
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
        return (<div style={{ "padding-top": "12px", "text-align": "center" }}>
          <Space>
            <Button onClick={ onCancel }>{ option.cancelText }</Button>
            <Button type="primary" onClick={onClick}>{ option.okText }</Button>
          </Space>
        </div>);
      }
      return props.buttons;
    };

    return () => {
      return (<div class={ props.class }>
        <Form ref={ formRef } layout={ props.layout as Layout } model={ state.value }>
          {
            concat(props.items).map(function(value: FormOptionValue) {
              return render(value, state.value, onStateChange);
            })
          }
        </Form>
        { props.buttons && getButtons() }
      </div>);
    };
  },
});
