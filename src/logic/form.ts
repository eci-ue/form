/**
 * @file 基于动态表单进行功能扩展
 * @author svon.me@gmail.com
 */

import _ from "lodash-es";
import { confirm } from "@ui/model";
import UiForm from "../components/form";

import { Component, ref, toRaw } from "vue";
import type { FormOptionValue } from "types/form";
import type { ModalFuncProps } from "ant-design-vue";

interface State {
  [key: string]: any;
}
export const model = function<T = State>(items: FormOptionValue, config?: string | ModalFuncProps): Promise<T> {

  const state = ref<State>({});
  const onUpdate = (value: State) => (state.value = value);

  return new Promise<T>(function(resolve) {
    const opt = config ? (_.isString(config) ? { title: config } : config) : {};
    const option: ModalFuncProps = Object.assign({ ...opt }, {
      onCancel: () => {
        if (opt.onCancel) {
          return opt.onCancel();
        }
        resolve(void 0 as T);
      },
      onOk: (value?: State) => {
        const temp = value || toRaw(state.value);
        if (opt.onOk) {
          return opt.onOk(temp);
        }
        resolve(temp as T);
      },
    });
    confirm<Component, T, object>(UiForm, option, {
      items,
      value: state.value,
      "onUpdate:value": onUpdate,
    });
  });
}