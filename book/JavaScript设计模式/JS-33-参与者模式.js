/** =====33.1- 绑定事件 添加数据 ========= */
function on(dom, type, fn, data){
  dom.addEventListener(type, function(e){
    // 在dom 环境中调用 fn, 并传入事件对象与data数据参数
    fn.call(dom, e, data);
  },false);
}

/** =====33.2- 函数绑定 ========= */
// 函数绑定 bind
function bind(fn, context){
  // 闭包返回新函数 
  return function(){
    // 对 fn 装饰并返回
    return fn.apply(context, arguments);
  }
}

// 测试对象
var domeObj = {title: '这是一个例子'}
// 测试方法
function domeFn(){
  console.log(this.title);
}
// 让 demoObj 参与demoFn 的执行
var bindFn = bind(domeFn, domeObj);
domeFn();
bindFn();

/** =====33.3- 应用于事件 ========= */
document.write('1');
document.body.innerHTML = '<div id="container"><button>按钮</button><p>p标签<p></div>';
var btn = document.getElementsByTagName('button')[0];
var p = document.getElementsByTagName('p')[0];
// 对 demoFn 改进，在控制台输出参数于this对象
function demoFn(){
  console.log(arguments, this);
}
// 未设置提供参与对象
var bindFn = bind(demoFn);
// 绑定事件
btn.addEventListener('click', bindFn);
// [MouseEvent] Window

// 提供btn 元素参与对象
btn.removeEventListener('click', bindFn);
var bindFn = bind(demoFn, btn);
btn.addEventListener('click', bindFn);
// [MouseEvent] <button>按钮</button>

// 提供 p 元素参与对象
btn.removeEventListener('click', bindFn);
var bindFn = bind(demoFn, p);
btn.addEventListener('click', bindFn);
// [MouseEvent] <p>p标签<p>

// 移除对象
btn.removeEventListener('click', bindFn);

/** =====33.5- 函数柯里化 ========= */
// 函数柯里化
function curry(fn){
  // 缓存数组 slice 方法Array.prototype.slice
  var Slice = Array.prototype.slice;
  // 从第二个参数开始截取参数
  var args = Slice.call(arguments, 1);
  // 闭包返回新函数
  return function(){
    // 将参数（类数组）转换为数组
    var addArgs = Slice.call(arguments),
        // 拼接参数
        allArgs = args.concat(addArgs);
    // 返回新函数
    return fn.apply(null, allArgs);
  }
}

// 加法器
function add(num1, num2){
  return num1+num2;
}
console.log(add(1, 2));
var add5 = curry(add, 5);
console.log(add5(6));
var add7add8 = curry(add, 7, 8);
console.log(add7add8());

/** =====33.6- 重构bind ========= */
// 重构bind
function bind(fn, context){
  // 缓存数组 slice 方法Array.prototype.slice
  var Slice = Array.prototype.slice;
  // 从第三个参数开始截取参数
  var args = Slice.call(arguments, 2);
  // 闭包返回新函数
  return function(){
    // 将参数（类数组）转换为数组
    var addArgs = Slice.call(arguments),
        // 拼接参数
        allArgs = args.concat(addArgs);
    // 对fn 装饰并返回
    return fn.apply(context, allArgs);
  }
}

var demoData1 = {text: '这是第一组数据'},
    demoData2 = {text: '这是第二组数据'};
var bindFn = bind(demoFn, btn, demoData1);
btn.addEventListener('click', bindFn, false);
// [demoData1, MouseEvent] <button>按钮</button>

btn.removeEventListener('click', bindFn);
var bindFn = demoFn.bind(p, demoData2); // demoData2 闭包传入的是指针，外部可以 修改 / 添加值
btn.addEventListener('click', bindFn, false);
// [demoData2, MouseEvent] <p>p标签<p>

/** =====33.7- 兼容版本 ========= */
// 兼容各个浏览器
if(Function.prototype.bind === undefined){
  Function.prototype.bind = function(context){
    // 缓存数组 slice 方法Array.prototype.slice
    var Slice = Array.prototype.slice,
        // 从第二个参数开始截取参数
        args = Slice.call(arguments, 1),
        // 保存当前函数引用
        that = this;
    // 返回新 函数
    return function(){
      // 将参数（类数组）转换为数组
      var addArgs = Slice.call(arguments),
          // 拼接参数
          allArgs = args.concat(addArgs);
      // 对当前函数修饰并返回
      return that.apply(context, allArgs);
    }
  }
}

/** ===== 忆之获- 反柯里化 ========= */
// 柯里化，是固定部分参数，返回一个接受剩余参数的函数，也称为部分计算函数，目的是为了缩小适用范围，创建一个针对性更强的函数。
// 核心思想是把多参数传入的函数拆成单参数（或部分）函数，内部再返回调用下一个单参数（或部分）函数，依次处理剩余的参数。

// 而反柯里化，从字面讲，意义和用法跟函数柯里化相比正好相反，扩大适用范围，创建一个应用范围更广的函数。
// 使本来只有特定对象才适用的方法，扩展到更多的对象。

// 为Function原型添加 uncurry 方法，并在执行的时候保存执行 uncurry 的方法到 that
// 借用apply把要借用的函数作为this环境赋给call，并传入之后的形参作为参数执行
Function.prototype.uncurry = function(){
  // 保存当前对象
  var that = this;
  return function(){
    console.log(that);
    return Function.prototype.call.apply(that, arguments);
  }
}

// 获取校验方法
var toString = Object.prototype.toString.uncurry();
console.log(toString(function(){}), toString([])); // [object Function] [object Array]