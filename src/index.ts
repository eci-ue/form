/**
 * @file 动态表单
 * @author svon.me@gmail.com
 */

export { useValidate } from "./utils";
export { config } from "./config";
export { default as form } from "./logic/form";
export { default as Form } from "./components/form";

export type { FormItemData, FormOptionValue, FormItemMeta, Props as FormProps } from "./props";