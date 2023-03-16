import { ref } from "vue";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import type { FormInstance } from "ant-design-vue";

export const safe = {
  get: safeGet,
  set: safeSet
};

export const isNil = function(value: any): boolean {
  return value == null;
}

export const concat = function<T>(value: T | T[]): T[] {
  const list: T[] = Array.isArray(value) ? value : [value];
  return list.filter((item: T) => {
    if (item || item === 0) {
      return true;
    }
    return false;
  });
}

export const useValidate = function() {
  const formRef = ref<FormInstance>();
  const validate = async function<T>(next?: () => T | Promise<T>): Promise<T | boolean> {
    try {
      const from: FormInstance | undefined = formRef.value;
      if (from) {
        await from.validateFields();
      }
    } catch (error) {
      return false;
    }
    if (next && typeof next === "function") {
      return Promise.resolve(next());
    }
    return true;
  };
  return { formRef, validate };
}