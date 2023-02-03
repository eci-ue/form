/**
 * @file 动态表单
 * @author svon.me@gmail.com
 */

import { FormOptionValue } from "./form";
import type { Component } from "vue";

export * from "./form";

export declare interface State {
  [key: string]: any;
}

export declare const form: <T = State>(value: FormOptionValue, config?: string | ModalFuncProps) => Promise<T | undefined>;

export declare const config: (name: string, component: Component) => void