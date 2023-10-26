/**
 * @file 动态表单
 * @author svon.me@gmail.com
 */

export { useValidate } from "./utils";
export * as rules from "./utils/rules";
export { default as Form } from "./components/form";
export { Layout as FormLayout } from "./config/type";

export type { FormItemData, FormOptionValue, Props as FormProps, FormOption, FormItemProps } from "./config/props";