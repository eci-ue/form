/**
 * @file 快速生成对象
 * @author svon.me@gmail.com
 */

function getLayer(path: string): string[] {
  const layer = path.split(/\.|\[/g);
  const array = [];
  for(let i = 0, len = layer.length; i < len; i++) {
    const value = layer[i];
    if (value) {
      if (value.lastIndexOf(']') >= 0) {
        array.push(`[` + value);
      } else {
        array.push(value);
      }
    }
  }
  return array;
}

function getArrayLayer(path: string): string[] {
  return getLayer(path);
}

function isArray(value: string): boolean {
  if (/[\w]+]$/.test(value)) {
    return true;
  }
  return false;
}

function getArrayIndex(value: string): string {
  let start = value.indexOf('[');
  let end = value.lastIndexOf(']');
  if (start < 0) {
    start = 0;
  } else {
    start = start + 1;
  }
  if (end < 0) {
    end = value.length;
  }
  return value.slice(start, end);
}

function safeSet<T>(instance: T, path: string, value: any): T {
  if (instance && path) {
    const layer = getArrayLayer(path);
    const app = function(data: any, index: number): T {
      var key = layer[index];
      // 如果有下一层
      if (layer[index + 1]) {
        if (isArray(layer[index + 1])) { // 如果下层key是数组, 则按数组方式处理
          const k = getArrayIndex(key);
          if(!data[k]) {
            // 生成一个数组
            data[k] = [];
          }
          return app(data[k], index + 1);
        } else if(isArray(key)) { // 如果当前key是数组
          const k = getArrayIndex(key);
          if(!data[k]) {
            // 生成一个对象
            data[k] = {};
          }
          return app(data[k], index + 1);
        } else if (!data[key]) {
          // 生成一个对象
          data[key] = {};
        }
        return app(data[key], index + 1);
      } else {
        // 数组元素赋值
        if(isArray(key)) {
          const k = getArrayIndex(key);
          if (value === 0) {
            data[k] = 0;
          } else {
            data[k] = value || null;
          }
        } else {
          if (value === 0) {
            data[key] = 0;
          } else {
            data[key] = value || null;
          }
        }
        return;
      }
    };
    app(instance, 0);
    return instance;
  }
  return null;
}

export default safeSet;
