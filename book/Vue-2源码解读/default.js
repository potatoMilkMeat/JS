// 是不是对象
function isObject(val){
  return Object.prototype.toString.call(val) === "[object Object]"
}
// 是不是数组
function isArray(arr){
  return Object.prototype.toString.call(arr) === "[object Array]"
}
// 工具函数 设置值-浅复制-可设定枚举
function def(obj, key, val, enumerable){
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}
// 是否自带属性
function hasOwn(obj, key){
  return Object.prototype.hasOwnProperty.call(obj, key);
}
