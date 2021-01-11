// console.log('main.js 开始运行')
// P6 第二章 Object 的变化监听 ==============
/**
 * P7 2.2 - 追踪变化
 * @param {object} data 监听对象
 * @param {string, number} key 对象key
 * @param {*} val 设置的值
 */
// var defineReactive = function (data, key, val){
//   Object.defineProperty(data, key, {
//     enumerable: true,
//     configurable: true,
//     get: function(){
//       return val;
//     },
//     set: function(newVal){
//       if(val === newVal){
//         return;
//       }
//       val = newVal;
//     }
//   });
// };


// P7 2.3 - 收集依赖
// 在getter中收集依赖，在setter中触发依赖

/**
 * P8 2.4 - 收集依赖
 * // 耦合了收集依赖
 * @param {object} data 监听对象
 * @param {string, number} key 对象key
 * @param {*} val 设置的值
 */
// var defineReactive = function(data, key, val){
//   var dep = []; // 依赖缓存位置
//   Object.defineProperty(data, key, {
//     enumerable: true,
//     configurable: true,
//     get: function(){
//       dep.push(window.target); // 存入
//       return val;
//     },
//     set: function(newVal){
//       if(val === newVal){
//         return;
//       }
//       for(var i = 0; i < dep.length; i++){ dep[i](newVal, val); } // 触发
//       val = newVal;
//     }
//   });
// };

/**
 * P9 2.4 - 收集依赖类
 * // 避免重复添加同一监听
 * // 解耦收集类
 */
class Dep{
  constructor(){
    window.subs=this.subs =[];
    console.log(this.subs);
  }
  // 添加依赖
  addSub(sub){
    if(this.noRepeat(sub)){
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
  noRepeat(sub){
    if(sub.length){
      console.log('避免添加重复依赖', this.subs.indexOf(sub));
      return ~this.subs.indexOf(sub);
    }
  }
}

var defineReactive = function(data, key, val){
  var dep = new Dep(); // 依赖缓存位置 Dep.subs
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function(){
      dep.depend(); // 存入 需要改变全局变量 window.target
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
}

// // 测试
var a = {};
window.target = func = (function () {
  function func(newVal, val){
    console.log('window.target() 运行', newVal, val);
  }
  func.update = function () {console.log('****** update', window.target);}
  return func;
})();
defineReactive(a, 'id', 1235);
console.log(a.id, (a.id='xxx'));
// 1235 "xxx"

/**
 * P10 2.6 - 观察类Watcher，添加事件和处理方法
 */
// vue的watch用法
// vm.$watch('a.b.c', function (newVal, oldVal) {
//   // 做点什么
// })
/**
 * 监听，添加事件和处理方法
 * @param {object} vm 对象
 * @param {String} expOrFn .表达式，eg: 'a', 'a.b'
 * @param {Function} cb  
 */
class Watch{
  constructor(vm, expOrFn, cb){
    this.vm = vm;
    // parsePath(expOrFn) 执行后返回的闭包函数 带有expOrFn参数
    // 执行this.getter(), 就可以读取data.a.b.c 的内容
    this.getter = parsePath(expOrFn);
    this.cb=cb;
    this.value = this.get();
  }
  get(){
    // 将当前对象存储到 公共缓存点 window.target
    console.log(this, a=== this);
    window.target = this;
    // 获取data.a.b.c的值
    var value = this.getter.call(this.vm, this.vm);
    // 将公共缓存点清空
    window.target = undefined;
    return value;
  }
  update(){
    // 分别保存旧值和新值
    var oldValue = this.value;
    this.value = this.get();
    // 执行回调函数的   参数：为执行上下文环境，新/旧值
    this.cb.call(this.vm, this.value, oldValue);
  }
}
/**
 * P10 解析路径
 * 返回函数，path 通过.转化的数组segments
 * @param {string} path .表达式，eg: 'a', 'a.b' 不能带' ', '-', '_'特殊符号
 */
var parsePath = function(path) {
  var bailRE = /[^\w.$]/;
  if(bailRE.test(path)){
    return;
  }
  var segments = path.split('.');
  return function(obj) {
    for (var i = 0; i < segments.length; i++) {
      if(!obj){
        return;
      }
      obj = obj[segments[i]];
      return obj;
    }
  }
}


// 测试Watch - 依赖 defineReactive(a, 'id', 1235); 先实现数据监听
a.watch = new Watch(a, 'id', function (newVal, oldVal) {
  console.log('***** watch :', newVal, oldVal)
});
a.id='999';
// 因多次监听导致同样的问题--多到爆炸，并且watch 回调函数执行多次
console.log('因多次监听导致同样的问题--多到爆炸，并且watch 回调函数执行多次')
a.id='多次回调执行';

/**
 * P12 Observer 递归侦测所有key
 * 对申明后 再新增属性和删除属性无效果
 * @param {Object} value 
 */
class Observer{
  constructor(value){
    this.value = value;
    // 只允许对象运行
    if(Array.prototype.toString.call(value) === "[object Object]"){
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
      this.defineReactive(obj, keys[i], obj[keys[i]]); // 书本缺少 this.  导致报错 
    }
  }
  /**
   * defineReactive 变种方法，主要添加递归子属性
   */
  defineReactive(data, key, val){
    // 新增， 递归子属性
    if(typeof val==='object'){
      new Observer(val);
    }
    var dep = new Dep(); // 依赖缓存位置 Dep.subs
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function(){
        dep.depend(); // 存入 需要改变全局变量 window.target
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
  }
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

// c = new Observer(b); // c.value === b
