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
function defineReactive(data, key, val){
  // ----*** 我手动添加55-56行 ***--- 添加处理数组的循环，并自动添加depend
  if(Array.isArray(val)){ new Observer(val); val.__ob__.dep.depend(); }

  let childOb = observe(val); // 修改
  var dep = new Dep(); // 依赖缓存位置 Dep.subs
  console.log(childOb, (window.dep=dep), data, key, val);
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
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args){
    const result = original.apply(this, args);
    const ob = this.__ob__; // 读取Observer实例
    // 获取数组中新增元素
    let inserted;
    switch(method){
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if(inserted) ob.observeArray(inserted); // 侦测新增元素
    ob.dep.notify(); // 向依赖发送消息
    return result;
  });
});

/**
 * P18 使用拦截器 覆盖Array原型
 * 只针对被侦测的数据生效
 * P12 Observer 对此进行修改
 * 处理不能使用 __proto__ 的情况
 */
var hasProto = '__proto__' in {};
var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
// 通过 value.__proto__ 巧妙覆盖value原型的功能
// value.__proto__ = arrayMethods;
function protoAugment(target, src, keys){ // 原本的继承
  target.__proto__ = src;
};
function copyAugment(target, src, keys){ // 将arrayMethods方法直接设置到数组上
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    def(target, key, src[key]);
  }
};

class Observer{
  constructor(value){
    this.value = value;
    this.dep = new Dep(); // 依赖列表在这里
    def(value, '__ob__', this); // 作用是在拦截器中读取 Observer实例
    console.log('***** Observer(value) ' , value);


    if(Array.isArray(value)){
      // 数组添加 arrayMethods 拦截器
      var augment = hasProto ? protoAugment : copyAugment;
      augment(value, arrayMethods, arrayKeys);
      console.log('***** Array.isArray(value) ' , value, value.__proto__);
      // 侦测所有数据子集变化
      this.observeArray(value);
    }else if(isObject(value)){
      this.walk(value);
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
  /**
   * 侦测Array中的每一项 
   */
  observeArray(items){
    for(let i=0,l=items.length;i<l;i++){
      observe(items[i]);
    }
  }
}

/**
 * P23 尝试为value 创建一个Observer实例
 * 如果创建成功，直接返回新创建的Observer实例。
 * 如果value已经存在一个Observer实例，则直接返回它
 * @param {*} value 
 * @param {*} asRootData 
 */
function observe(value, asRootData){
  if(!isObject(value)){return;}
  let ob;
  if(hasOwn(value, '__ob__') && value.__ob__ instanceof Observer){
    ob = value.__ob__;
  }else{
    ob = new Observer(value);
  }
  return ob;
}

// 测试示例
var b = {
  id: '111',
  txt: '你好',
  person: {
    name: 'chenglong',
    age: 32
  },
  arr: [0,1,2,3]
}
var a = [ b, 1, 2, 3];
window.target = func = (function () {
  function func(newVal, val){
    console.log('window.target() 运行', newVal, val);
  }
  func.update = function () {console.log('****** update')}
  return func;
})();

c = new Observer(a);
JSON.stringify(a); // 读取所有属性，添加侦测
setTimeout(console.log( a.push(22) ), 2000) ; // 成功
