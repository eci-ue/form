/**
 * @file 快速从对象中获取数据
 * @author svon.me@gmail.com
 */

function getLayer(path: string): string[] {
  var layer = path.split('.');
  var array = [];
  for(var i = 0, len = layer.length; i < len; i++) {
    if (layer[i]) {
      array.push(layer[i]);
    }
  }
  return array;
}

function getArrayLayer(path: string): string[] {
  var string = path.replace(/\[/g, '.');
  var text = string.replace(/\]/g, '');
  return getLayer(text);
}

function safeGet<T>(instance?: any, path?: string): T | undefined {
  if (instance && path) {
    const layer = getArrayLayer(path);
    const app = function(data: any, index: number): T | undefined {
      const key: string = layer[index];
      // 如果有下一层
      if (layer[index + 1]) {
        return data[key] ? app(data[key], index + 1) : void 0;
      }
      return data[key];
    };
    return app(instance, 0);
  }
  return void 0;
}

export default safeGet;
