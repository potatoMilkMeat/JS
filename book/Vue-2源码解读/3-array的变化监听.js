/**
 * P9 2.4 - 收集依赖类
 * // 避免重复添加同一监听
 * // 解耦收集类
 */
class Dep{
  constructor(){
    window.subs=this.subs =[];
  }
  // 添加依赖
  addSub(sub){
    if(this.isRepeat(sub)){
      return;
    }
    this.subs.push(sub);
  }
  // 删除依赖
  removeSub(sub){
    remove(this.subs, sub);
  }
  // 收集依赖
  depend(){
    if(window.target){
      this.addSub(window.target);
    }
  }
  // 发送通知
  notify(){
    var subs = this.subs.slice();
    for(var i=0;i<subs.length;i++){
      subs[i].update();
    }
  }
  // 删除依赖-执行方法
  remove(arr, item){
    if(arr.length){
      var index = arr.indexOf(item);
      if(~index){
        return arr.splice(index, 1);
      }
    }
  }
  // 避免添加重复依赖
  isRepeat(sub){
    if(this.subs.length){
      return ~this.subs.indexOf(sub);
    }
  }
}

/**
 * defineReactive 变种方法，主要添加递归子属性
 */
var defineReactive = function(data, key, val){
  let childOb = observer(val); // 修改
  var dep = new Dep(); // 依赖缓存位置 Dep.subs
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function(){
      dep.depend(); // 存入 需要改变全局变量 window.target
      // 这里收集数组依赖
      if(childOb){
        childOb.dep.depend();
      }
      return val;
    },
    set: function(newVal){
      if(val === newVal){
        return;
      }
      val = newVal;
      dep.notify(); // 触发
    }
  });
};


/**
 * P17 数组拦截器
 * Array.prototype 一样的 object，改变数组自身内容的方法是处理过的
 * 导出 arrayMethods
 */
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
.forEach(function(method){
  // 缓存原始方法
  var original = arrayProto[method];
  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args){
      return original.apply(this, args)
    },
    enumerable: false,
    writable: true,
    configurable: true
  })
});

/**
 * P18 使用拦截器 覆盖Array原型
 * 只针对被侦测的数据生效
 * P12 Observer 对此进行修改
 * 处理不能使用 __proto__ 的情况
 */
var hasProto = '__proto__' in {};
var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
var protoAugment = function(target, src, keys){ // 原本的继承
  target.__proto__ = src;
};
var copyAugment = function(target, src, keys){ // 将arrayMethods方法直接设置到数组上
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    def(target, key, src[key]);
  }
};

class Observer{
  constructor(value){
    this.value = value;
    this.dep = new Dep(); // 依赖列表在这里
    // 只允许对象运行
    if(Object.prototype.toString.call(value) === "[object Object]"){
      this.walk(value);
    }else if(Object.prototype.toString.call(value) === "[object Array]"){
      // 通过 value.__proto__ 巧妙覆盖value原型的功能
      // value.__proto__ = arrayMethods; 
      var augment = hasProto ? protoAugment : copyAugment;
      augment(value, arrayMethods, arrayKeys);
    }
  }
  /**
   * walk 会将每一个属性都转换成 getter/setter 的形式来侦测变化
   * 这个方法只有在数据类型为Object 时被调用
   * @param {*} obj 对象
   */
  walk(obj){
    var keys = Object.keys(obj);
    for(var i=0;i<keys.length;i++){
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
}

var observer = 