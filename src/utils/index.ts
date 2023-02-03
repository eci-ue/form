import { ref } from "vue";
import type { FormInstance } from "ant-design-vue";


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