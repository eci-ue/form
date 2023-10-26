/**
 * @file 表单校验规则
 * @author svon.me@gmail.com
 * @description https://github.com/yiminghe/async-validator
 */

import type { RuleObject } from "ant-design-vue/lib/form/interface";

type Transform = <T>(value: any) => T;

export const text = function (message: string = "Please input", required: boolean = true, transform?: Transform): RuleObject[] {
  return [
    {
      required,
      message,
      trigger: ["blur"],
      transform: transform || toString
    }
  ];
}

export const integer = function (message: string = "Please input", required: boolean = true, transform?: Transform): RuleObject[] {
  return [
    {
      type: "number",
      required,
      message,
      trigger: ["blur"],
      transform: transform || toInteger
    }
  ];
}

export const number = function (message: string = "Please input", required: boolean = true, transform?: Transform): RuleObject[] {
  return [
    {
      type: "number",
      required,
      message,
      trigger: ["blur"],
      transform: transform || toNumber
    }
  ];
}

export const link = function (message: string = "Please input link", required: boolean = true, transform?: Transform): RuleObject[] {
  return [
    {
      required,
      message,
      type: "url",
      trigger: ["blur"],
      transform: transform || toString
    }
  ];
}

export const email = function (message: string = "Please input email", required: boolean = true, transform?: Transform): RuleObject[] {
  return [
    {
      required,
      message,
      type: "email",
      trigger: ["blur"],
      transform: transform || toString
    }
  ];
}

export const date = function (message: string = "Please input", required: boolean = true, transform?: Transform): RuleObject[] {
  return [
    {
      required,
      message,
      type: "date",
      trigger: ["blur"],
      transform: transform || toDate,
    }
  ];
}

export const array = function (message: string = "Please select", required: boolean = true, transform?: Transform): RuleObject[] {
  return [
    {
      required,
      message,
      type: "array",
      trigger: ["blur"],
      min: 1,
      transform,
      validator(rule: RuleObject, value: any[]) {
        if (value && Array.isArray(value) && value.length > 0) {
          return Promise.resolve();
        }
        return Promise.reject(message);
      },
    }
  ];
}

export const toString = function (value: string | number) {
  if (value || value === 0) {
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
  }
  return value;
};

export const toNumber = function (value: string) {
  if (value && /^\d{1,}(\.\d{1,})?$/i.test(value)) {
    return Number(value);
  }
  return value;
}

export const toInteger = function (value: string) {
  if (value && /^\d+$/i.test(value)) {
    return Number(value);
  }
};

export const toDate = function (value: string) {
  if (value) {
    return new Date(value);
  }
  return null;
}


export const concat = function (...args: RuleObject[] | RuleObject[][]): RuleObject[] {
  const list: RuleObject[] = [];
  for (const item of args) {
    if (item && Array.isArray(item)) {
      const value = concat(item);
      list.push(...value);
    } else if (item) {
      list.push(item as RuleObject);
    }
  }
  return list;
}