/**
 * @file 动态表单
 * @author svon.me@gmail.com
 */

import { PropType } from "vue";
import { FormOptionValue } from "./form";
import type { Component } from "vue";
import type { FormInstance, ModalFuncProps } from "ant-design-vue";

export * from "./form";

export declare interface State {
  [key: string]: any;
}

export declare const config: (name: string, component: Component) => void;

export declare const model: <T = State>(value: FormOptionValue, config?: string | ModalFuncProps) => Promise<T | undefined>;

export declare const useValidate: () => {
    formRef: import("vue").Ref<FormInstance>;
    validate: <T>(next?: () => T | Promise<T>) => Promise<boolean | T>;
};

interface FormState {
    [key: string]: any;
}
declare enum Layout {
    horizontal = "horizontal",
    vertical = "vertical",
    inline = "inline"
}

export declare const Form: import("vue").DefineComponent<{
    value: {
        type: PropType<FormState>;
        default(): {};
    };
    items: {
        required: true;
        type: PropType<FormOptionValue>;
    };
    option: {
        type: PropType<ModalFuncProps>;
        default(): {};
    };
    layout: {
        type: PropType<string>;
        default(): Layout;
    };
    class: {
        type: StringConstructor;
        default: string;
    };
    buttons: {
        type: PropType<boolean | Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>;
        default: () => boolean;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: PropType<FormState>;
        default(): {};
    };
    items: {
        required: true;
        type: PropType<FormOptionValue>;
    };
    option: {
        type: PropType<ModalFuncProps>;
        default(): {};
    };
    layout: {
        type: PropType<string>;
        default(): Layout;
    };
    class: {
        type: StringConstructor;
        default: string;
    };
    buttons: {
        type: PropType<boolean | Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>;
        default: () => boolean;
    };
}>>, {
    buttons: boolean;
    value: {};
    option: {};
    layout: string;
    class: string;
}>;
