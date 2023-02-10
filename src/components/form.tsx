/**
 * @file 动态表单
 * @author svon.me@gmail.com
 */

import _ from "lodash-es";
import { render } from "./render";
import { useValidate } from "src/utils";
import safeSet from "@fengqiaogang/safe-set";
import { Form, Button, Space } from "ant-design-vue";
import { PropType, defineComponent, toRaw, computed, ref } from "vue";

import type { Component } from "vue";
import type { ModalFuncProps } from "ant-design-vue";
import type { FormOptionValue, FormState, Props } from "../props";




// 初始化表达数据
const initData = function(form: FormOptionValue) {
  const data: FormState = {};
  for(const item of _.flattenDeep(_.concat(form))) {
    if (item.key) {
      safeSet(data, item.key, item.value);
    }
  }
  return data;
}


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
    const state = ref<FormState>({ ...toRaw(props.value || {}), ...initData(props.items) });
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
      if (_.isBoolean(props.buttons)) {
        if (slots.buttons) {
          return slots.buttons();
        }
        return (<div style={{ "padding-top": "12px", "text-align": "center" }}>
          <Space>
            <Button onClick={ onCancel }>{ config.value.cancelText }</Button>
            <Button type="primary" onClick={onClick}>{ config.value.okText }</Button>
          </Space>
        </div>);
      }
      return props.buttons;
    };

    return () => {
      return (<div class={ props.class }>
        <Form ref={ formRef } layout={ props.layout as Layout } model={ state.value }>
          {
            _.map(_.compact(_.concat(props.items)), function(value: FormOptionValue) {
              return render(value, state.value, onStateChange);
            })
          }
        </Form>
        { props.buttons && getButtons() }
      </div>);
    };
  },
});
