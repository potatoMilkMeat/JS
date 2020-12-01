/**
 * 【程龙】获取属性描述
 * @param {*} obj 对象
 * @param {*} prop 对象key
 */
// 设置 不被枚举设置
var get_obj_prop = function(obj, prop){
  // Object.getOwnPropertyDescriptor(Function.prototype, 'method')
  var a = Object.getOwnPropertyDescriptor(obj, prop);
  return a;
}
/**
 * 【程龙】设置枚举属性为不可访问
 * @param {*} obj 对象
 * @param {*} prop 对象key
 */
var set_obj_enumerable_false = function(obj, prop){
  // Object.defineProperty(Object.prototype, 'superior', {enumerable: false});
  Object.defineProperty(obj, prop, {enumerable: false});
}

// P4 给函数类  定义链式新方法
Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
}
/**
 * P33 符合条件才增加方法-可以强制替换  ===替换上面的====
 * @param {*} name 方法名
 * @param {*} func 绑定函数
 * @param {*} isOverWrite 开启强制重写，默认为false
 */
Function.prototype.method = function(name, func, isOverWrite){
  // !this.prototype[name] 替换为 !this.prototype.hasOwnProperty(name)
  if(!this.prototype.hasOwnProperty(name) || isOverWrite){
    this.prototype[name] = func;
  }
  return this;
}

// // 给函数添加方法
// var A = function () { }
// A.method('log', function () {
//   var arr = Array.prototype.slice.call(arguments);
//   for (var i = 0, len = arr.length; i < len; i++) {
//     console.log(arr[i]);
//   }
// })
// A.prototype.log(1, 2, 3);
// new A().log(123);

// // P10 switch while do for 前置label，可用break label; 来打断代码块
// var count=0;
// farther:
// for(var i=0;i<3;i++){
//   count++;
//   console.log('father循环前： ', count, i);
//   son: for(var j=0;j<5;j++){
//     // if(count >= 10){break;}
//     if(count >= 10){break farther;}
//     count++;
//     console.log('son循环： ', count, i, j);
//   }
// }

// if(count >= 10){break;}          count 是 11 = (1+5) + (1+3) + (1)
// if(count >= 10){break farther;}  count 是 10 = (1+5) + (1+3)

// P22 原型继承给 Object.create ---创建一个使用原对象作为其原型的新对象
if(typeof Object.beget !== 'function'){
  Object.create = function(o){
    var F = function(){}; // 新函数F
    F.prototype = o; // 函数F原型为 o对象
    return new F(); // 返回 F实例 对象
  }
}
// var book = {name: 'book', id: '001', year: '2020'};
// var another_book = Object.create(book);
// another_book.name = 'another_book';
// another_book.hasOwnProperty('name'); // true
// another_book.hasOwnProperty('id'); // false

// P32 数值取整 integer
Number.method('integer', function(){
  return Math[this < 0 ? 'ceil' : 'floor'](this);
})

// P33 移除字符串首尾空白的方法
String.method('trim', function(){
  return this.replace(/^\s+|\s+$/g, '').replace(/^\s+|\s+$/g, '');
});

/**
 * P34 汉诺塔 游戏
 * @param {*} disc 盘子总序号，总个数
 * @param {*} src 左边柱子 原本的
 * @param {*} aux 中边柱子 辅助的
 * @param {*} dst 右边柱子 目标的
 */
var hanoi = function(disc, src, aux, dst){
  // disc 大于0才执行
  if(disc>0){
    hanoi(disc-1, src, dst, aux); // 移动 disc-1 到 暂存 
    console.log('移动 盘子'+ disc+ ' 从 ' + src + ' 到 '+ dst); // 每个方法实际执行的移动
    hanoi(disc-1, aux, src, dst); // 移动 暂存后的 disc-1 到 dst(目标)
  }
};
// hanoi(3, '左', '中', '右');

/**
 * // P35 walk_the_DOM 函数，指定节点后，按照func执行本身及子节点
 * @param {*} node 指定节点
 * @param {*} func 回调函数
 */
var walk_the_DOM = function(node, func){
  func(node); // 执行此节点
  node = node.firstChild; // 取第一个子节点
  // 如果子节点存在
  while(node){
    arguments.callee(node, func); // 递归此子节点
    node = node.nextSibling; // 执行递归后，轮巡到子节点的 下一个兄弟节点
  }
};

// P39 闭包使用 添加点击事件
  var add_the_handlers = function(nodes, func){
    // 辅助函数绑定 i值
    var helper = function(i){
      // 返回的执行函数，并闭包带 i, 如果有回调函数则执行回调函数
      return function(e){
        func && func(e, i); // 执行的函数
      }
    }
    for(var i=0, len = nodes.length;i<len; i++){
    nodes[i].onclick = helper(i);
    }
  }

// P40 构建模块 String deentityfy方法
// 把html的字符实体替换为对应的字符
String.method('deentityify', function(){
  // 字符实体表
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };
  // 返回的deentityify方法
  return function(){
    return this.replace(/&([^&;]+);/g, function(a, b){
      var r = entity[b];
      return typeof r === 'string' ? r : a;
    })
  }
}());
// console.log('&lt;&quot;&gt;'.deentityify());

// P41 生产序列号，安全对象
var serial_maker = function(prefix, seq){
  // 初始化默认参数： 前缀和序列号
  prefix = prefix || '';
  seq = seq || 0;
  // 返回的对象实体
  var obj = {
    gensym: function(){ 
      return prefix + seq++;
    }
  };
  // 添加修改前缀方法，仅使用一次
  if(prefix === ''){
    obj.set_prefix = function(p){
      prefix = String(p);
      delete obj.set_prefix;
    };
  }
  // 添加修改序号方法，仅使用一次
  if(seq === 0){
    obj.set_seq = function(s){
      seq = s;
      delete obj.set_seq;
    };
  }
  return obj;
}
// var seqer = serial_maker('aaa', 1000); // 初始化后只有 gensym一个方法
// seqer.gensym();

// P43 柯里化
Function.method('curry', function(){
  var slice = Array.prototype.slice, // 数组的 slice函数
      args = slice.apply(arguments), // 数组化 函数参数
      that = this; // 当前this ： 调用curry方法的 函数对象
  // 返回的执行函数
  return function(){
    return that.apply(null, args.concat(slice.apply(arguments)));
  };
});

// var add=function(a, b){return a+b;}
// var add1 = add.curry(1);
// console.log(add1(6));

// P43 - P45 记忆 - fibonacci数列
var count=0;
// 初代--没有用记忆方法
// var fibonacci = function(n){
//   // count++;
//   return n<2 ? n : arguments.callee(n-1) + arguments.callee(n-2);
// }

// 二代--记忆方法
// var fibonacci = function(){
//   var memo = [0, 1];
//   var fib = function(n){
//     // count++;
//     var result = memo[n];
//     if(typeof result !== 'number'){
//       memo[n] = result = fib(n-1) + fib(n-2);
//     }
//     return result;
//   };
//   return fib;
// }();

// 三代--构造记忆功能的函数
var memoizer = function(memo, formula){
  // 定义执行函数
  var recur = function(n){
    // 如果存在 直接取值
    var result = memo[n];
    // 计算结果不存在
    if(typeof result !== 'number'){
      // 通过回调函数运行 执行函数和n 得到结果
      memo[n] = result = formula(recur, n);
    }
    // 返回计算结果
    return result;
  };
  // 返回的执行函数
  return recur;
}
// 通过 memoizer 书写 fibonacci
var fibonacci = memoizer([0, 1], function(recur, n){
  // 定义计算方法 recur 为执行函数
  return recur(n-1) + recur(n-2);
})

// 输出计算值
var run_memoizer = function(func, len){
  len = len || 10;
  for(var i=0;i<=len;i++){
    console.log('// <'+ i + '> : ' + func(i));
  }
};

// run_memoizer(fibonacci, 10); // 测试fibonacci列数

// 阶乘函数
var factorial = memoizer([1, 1], function(recur, n){
  return n * recur(n-1);
});

// run_memoizer(factorial, 10); // 测试阶乘列数

// P47 伪类
var Mammal = function(name){this.name = name;}
Mammal.prototype.get_name = function(){return this.name;};
Mammal.prototype.says = function(){return this.saying || '';}
// 父类原型继承
Function.method('inherits', function(Parent){
  this.prototype = new Parent();
  return this;
});

var Cat = function(name){
  this.name = name;
  this.saying = '喵';
}
.inherits(Mammal)
.method('get_name', function(){
  return this.says() + this.name + this.says();
}, true)
.method('purr', function(n){
  var i,s='';
  for(i=0;i<n;i++){
    if(s){
      s+='-';
    }
    s+='r';
  }
  return s;
})
;

// var miniCat = new Cat('小刀');
// console.log(miniCat.says(), miniCat.get_name(), miniCat.purr(5));

// P53 函数化
// mammal 为基本类- 祖父类
var mammal = function(spec){
  // spec 为字面量对象，则为私有变量，否则为特权变量
  var that = {};
  // 对象添加公共方法
  that.says = function(){return spec.saying || ''};
  that.get_name = function(){return spec.name;}
  // 返回对象
  return that;
}
var myMammal = mammal({name: '小刀'});

var cat = function(spec){
  // 添加特权变量 的 属性值
  spec.saying = spec.saying || '喵';
  // 获取祖父类生成的 对象
  var that = mammal(spec);
  // 添加新的 公共方法
  that.get_name = function(){
    return that.says() + spec.name + that.says();
  };
  // 返回对象
  return that;
};
var myCat = cat({name: '小刀的猫'});
// console.log(myCat.says(), myCat.get_name());

// 处理父类方法的方法
Object.method('superior', function(name){
  var that = this, // 执行superior函数 的对象，缓存起来
      method = that[name]; // 获取方法
  // 返回新的方法，闭包绑定方法和上下文环境
  return function(){
    return method.apply(that, arguments);
  }
});
// 设置不可枚举状态
set_obj_enumerable_false(Object.prototype, 'superior');

// 继承父类方法并扩展
var coolcat = function(spec){
  var that = cat(spec), // 通过父类产生对象
      super_get_name = that.superior('get_name'); // 获取父类的方法
  // 申明公共类 - 调用了父类
  that.get_name = function(n){
    return 'like '+ super_get_name() + ' baby';
  };
  // 返回对象
  return that;
};
var myCoolCat = coolcat({name: '猫王'});
// console.log(myCoolCat.says(), myCoolCat.get_name());

// P55 部件 给对象添加 on，fire ,私有监听注册表
var eventuality = function(that){
  var registry = {}; // 监听对象
  // 触发监听
  that.fire = function(event){
    var array, // 执行对象数组
        func, // 需要执行的函数 
        handler, // 执行对象数组中的对象
        i, // 序列号
        type = typeof event === 'string' ? event : event.type; // 监听对象的类型 或者 key
    // 如果此类型事件存在
    if(registry.hasOwnProperty(type)){
      array = registry[type]; // 赋值 执行对象数组
      for(i=0;i<array.length;i++){
        handler = array[i]; // 赋值 执行对象数组中的对象
        func = handler.method; // 赋值 需要执行的函数
        // 如果执行函数为string类型 在部件对象中取 回调函数
        if(typeof func === 'string'){
          func = this[func];
        }
        func.apply(this, handler.parameters || [event]); // 执行 参数为回调参数或者是event
      }
    }
    // 方便联调
    return this;
  };

  /**
   * 添加监听事件
   * @param {*} type 事件类型
   * @param {*} method 执行函数，可以为 that的函数名
   * @param {*} parameters 准备的执行回调函数的参数
   */
  that.on = function(type, method, parameters){
    // 回调函数对象
    var handler = {method: method, parameters: parameters};
    // 如果已经有此类型
    if(registry.hasOwnProperty(type)){
      registry[type].push(handler); // 继续添加
    // 没有此类型，需要新建
    }else{
      registry[type] = [handler];
    }
    return this;
  };
  // 返回处理对象，方便联调
  return that;
};

// // 部件的注册用法
// var a={id: 'a', log: function(){console.log(arguments);}};
// eventuality(a);
// a.on('click', 'log', [11,22]);
// a.on('click', 'log', [0]);
// a.fire('click');

// P61 数组计算 reduce
// f 执行函数，value 执行结果
Array.method('reduce', function(f, value){
  // 数组遍历回调函数 ，计算结果
  for(var i=0,len=this.length;i<len;i++){
    value = f(this[i], value);
  }
  // 返回结果
  return value;
});

// // 使用示例
// var arr_b=[4, 8, 15, 16, 23, 42]; // 数组
// var add = function(a, b){return a+b;}; // 求和
// var mult = function(a, b){return a*b;}; // 乘积
// var sum = arr_b.reduce(add, 0); // 108
// var product = arr_b.reduce(mult, 1); // 7418880

// // 给数组添加 totle, 因不是整数，所以length 并不会改变
// // JSON.parse(JSON.stringify(arr_b)); 不会保留totle函数
// arr_b.totle = function(){
//   return this.reduce(add, 0);
// }
// var totle = arr_b.totle(); // 108

// P62 【指定初始值】 
// P62 生成数组：指定 长度 初始化值 dim
Array.dim = function(dimension, initial){
  var a = [];
  for(var i=0;i<dimension;i++){
    a[i] = initial; // 设置初始值
  }
  return a;
};
// var myArray = Array.dim(10, 0);

// P62 二维数组：指定 长,宽 初始化值 matrix
Array.matrix = function(m, n, initial){
  var a, i, j, mat=[];
  // 第一层遍历
  for(i=0;i<m;i++){
    a=[]; // 初始化 a
    // 第二层遍历
    for(j=0;j<n;j++){
      a[j] = initial;
    }
    mat[i] = a; // 将 a 赋值给 mat[i]
  }
  return mat;
};
// var myMatrix = Array.matrix(4, 4, 0);

// P63 二维数组：指定 长,宽 初始化值 identity
Array.identity = function(n){
  var i, mat = Array.matrix(n, n, 0);
  for(i=0;i<n;i++){
    mat[i][i] = 1;
  }
  return mat;
};
// var myIdentity = Array.identity(4);
// [1, 0, 0, 0]
// [0, 1, 0, 0]
// [0, 0, 1, 0]
// [0, 0, 0, 1]

// P69 【正则表达式】字符串是数字
String.method('is_number', function(){
  var that = this;
  var parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;
  return parse_number.test(that);
});
// '-1.25e-3'.parse_number(); // true
// String.prototype.is_number.call('-1.25e-3'); // true0

// ie 6-7 array.join() 性能高于 + , 而现在则相反
// 推荐使用 +

// P79 【数组排序- 纯数字 - 混排】 Array.sort()
var arr_a=[4,15,8,16,23,42];
arr_a.sort(function(a,b){return a - b;}); // [4, 8, 15, 16, 23, 42]

// 给简单值的数组排序
var arr_m = ['aa', 'bb', 'a', 4,15,8,16,23,42, false, true, NaN, undefined, null];
arr_m.sort(function(a,b){
  if(a === b){return 0;}
  if(typeof a === typeof b){ return a < b ? -1 : 1;}
  return typeof a < typeof b ? -1 : 1;
});
// [false, true, 4, 8, 15, 16, 23, 42, NaN, null, "a", "aa", "bb", undefined]

// P80 【数组排序-对象】 Array.by
var arr_s=[{first: 'Joe', last: 'Bsdfsd'},
  {first: 'Moe', last: 'Howarde'},
  {first: 'Joe', last: 'Derita'},
  {first: 'Shemp', last: 'Herita'},
  {first: 'Larry', last: 'Werita'},
  {first: 'Curry', last: 'Serita'}
];
Array.by = function(name, minor){
  return function(o, p){
    var a,b;
    if(o && p && typeof o  === 'object' && typeof p === 'object'){
      a=o[name];
      b=p[name];
      if(a === b){return typeof minor === 'function' ? minor(o, p) : 0;}
      if(typeof a === typeof b){ return a < b ? -1 : 1;}
      return typeof a < typeof b ? -1 : 1;
    }else{
      throw {name: '错误', message: '当执行sort操作时，期望是Object 对象'+ name}
    }
  }
};
arr_s.sort(Array.by('first', Array.by('last')));
// {first: "Curry", last: "Serita"}
// {first: "Joe", last: "Bsdfsd"}
// {first: "Joe", last: "Derita"}
// {first: "Larry", last: "Werita"}
// {first: "Moe", last: "Howarde"}
// {first: "Shemp", last: "Herita"}

// P84 转化为 指数形式字符串 Number.toExponential
Math.PI.toExponential(7);

// P84 转化为 十进制形式字符串 Number.toFixed
Math.PI.toFixed(7);

// P85 转化为 十进制 形式字符串(依靠精度) Number.toPrecision
Math.PI.toPrecision(100);

// P85 转化为 进制 形式字符串(依靠进制) Number.toPrecision
(8).toString(2);

// P91 完全匹配className String.search
'active ok ok-active    ok-test'.search(/(?:^|\s+)ok(?:\s+|$)/);