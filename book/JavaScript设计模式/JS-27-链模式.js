document.write('1');
document.body.innerHTML = '<div id="demo">demo</div><div id="test">test</div>';
/** =====27.2-原型式继承=================== */
var A =function(){}
A.prototype = {
  Length: 2,
  size: function(){
    return this.Length;
  }
}

var a= new A();
console.log(a.size());

/** =====27.3-找位帮手=================== */
// 借助返回对象B来实现
var A =function(){
  return B;
}
var B=A.prototype = {
  Length: 2,
  size: function(){
    return this.Length;
  }
}

console.log(A().size());

// 为了减少变量的创建
var A= function(){
  return A.fn;
}

A.fn=A.prototype = {
  Length: 2,
  size: function(){
    return this.Length;
  }
}

console.log(A().size());

/** =====27.4-获取元素=================== */
// 获取元素的方法 init()
var A = function(selector){
  return A.fn.init(selector);
}
A.fn = A.prototype = {
  init: function(selector){
    return document.getElementById(selector);
  },
  length: 2,
  size: function(){
    return this.length;
  }
}

console.log(A('demo'));

/** =====27.5- 一个大问题 - 覆盖 A.fn =================== */
// A对象返回结果中  同时包含 A.fn中的方法
var A = function(selector){
  return A.fn.init(selector);
}
A.fn=A.prototype = {
  init: function(selector){
    // 作为当前对象的属性值保存
    this[0] = document.getElementById(selector);
    this.length = 1;    // 校正length属性
    return this;        // 返回当前对象
  },
  length: 2,
  size: function(){
    return this.length;
  }
}

var demo = A('demo');
console.log(demo);
console.log(demo.size());
// 后获取的test元素将覆盖demo
// 原因是 A.fn.init(selector)运行的对象是 A.fn
var test = A('test');
console.log(demo);

/** =====27.6- 覆盖获取  =================== */
// new A 创建新对象 - 造成丢失方法
var A = function(selector){
  return new A.fn.init(selector);
}
A.fn=A.prototype = {
  init: function(selector){
    // 作为当前对象的属性值保存
    this[0] = document.getElementById(selector);
    this.length = 1;    // 校正length属性
    return this;        // 返回当前对象
  },
  length: 2,
  size: function(){
    return this.length;
  }
}

var demo = A('demo');
console.log(demo);

var test = A('test');
console.log(test);
// test.size(); //** 造成报错 */ // test.size is not a function at <anonymous>:22:6

/** =====27.7- 方法丢失  =================== */
A.prototype.init = function(selector){
  // 作为当前对象的属性值保存
  this[0] = document.getElementById(selector);
  this.length = 1;    // 校正length属性
  console.log(this === A.fn, this === A.prototype, this);
  return this;        // 返回当前对象
}

A.fn.init('demo');
// true true {0: div#demo, length: 1, init: ƒ, size: ƒ}
new A.fn.init('demo');
// false false A.init {0: div#demo, length: 1}

/** =====27.8- 对比Jquery  =================== */
var A = function(selector){
  return new A.fn.init(selector);
}
A.fn = A.prototype = {
  constructor: A,
  init: function(selector){
    // 作为当前对象的属性值保存
    this[0] = document.getElementById(selector);
    this.length = 1;    // 校正length属性
    return this;        // 返回当前对象
  },
  length: 2,
  size: function(){
    return this.length;
  }
}
A.fn.init.prototype = A.fn;

var demo = A('demo');
console.log(demo);

/** =====27.9- 丰富元素获取  =================== */
var A = function(selector){
  return new A.fn.init(selector);
}
A.fn = A.prototype = {
  constructor: A,
  init: function(selector, context){
    // 获取元素长度
    this.length = 0;
    // 默认获取元素的上下文为document
    context = context || document;
    // 如果是id选择符 按位非将-1转化为0， 转化为布尔值false
    if(~selector.indexOf('#')){
      // 截取id并选择
      this[0] = document.getElementById(selector.slice(1));
      this.length = 1;
    // 如果是元素名称
    }else{
      // 在上下文中选择元素
      var doms = context.getElementsByTagName(selector),
          i=0,                // 从第一个开始筛选
          len = doms.length;  // 获取元素长度
      for(;i<len;i++){
        // 压入this中
        this[i] = doms[i];
      }
      // 校正长度
      this.length = len;
    }
    // 保存上下文
    this.context = context;
    // 保存选择符
    this.selector = selector;
    // 返回当前对象
    return this;
  },
  length: null,
  size: function(){
    return this.length;
  },
  // 增强数组
  push: [].push,
  sort: [].sort,
  splice: [].splice,
  pop: [].pop
}
A.fn.init.prototype = A.fn;

/** =====27.11- 方法拓展  =================== */
A.extend = A.fn.extend = function(){
  // 拓展对象从第二个参数开始
  var i=1,
      // 获取参数长度
      len = arguments.length,
      // 第一个参数为源对象
      target = arguments[0],
      // 拓展对象中属性
      j;
  // 如果只有一个参数
  if(i==len){
    // 源对象为当前对象
    target = this;
    // i从0计数
    i--;
  }
  // 遍历参数中拓展对象
  for(;i<len;i++){
    // 遍历拓展对象中的属性
    for(j in arguments[i]){
      // 拓展源对象
      target[j] = arguments[i][j];
    }
  }
  // 返回源对象
  return target;
}

// 多个参数，将后面的追加到前面的属性
var demo = A.extend({first: 1}, {second: 2}, {third: 3});
// {first: 1, second: 2, third: 3}

// 拓展A.fn 也就是prototype 的方法log
A.fn.extend({log: function(msg){console.log(msg)}})
A.fn.log(122); // 122

// 给A类添加版本信息
A.extend({version: '1.0'})
A.version // '1.0'

/** =====27.12- 添加方法  =================== */
// 添加事件绑定事件
A.fn.extend({
  // 添加事件
  on: (function(){
    // 标准浏览器DOM2级事件
    if(document.addEventListener){
      return function(type, fn){
        var i = this.length -1;
        // 遍历所有元素添加事件
        for(;i>=0;i--){
          this[i].addEventListener(type, fn, false);
        }
        // 返回源对象
        return this;
      }
    // IE浏览器DOM2级事件
    }else if(document.attachEvent){
      return function(type, fn){
        var i = this.length -1;
        for(;i>=0;i--){
          this[i].addEvent('on' + type, fn);
        }
        return this;
      }
    // 不支持DOM2级事件浏览器添加事件
    }else{
      return function(type, fn){
        var i = this.length -1;
        //
        for(;i>=0;i--){
          this[i]['on' + type] = fn;
        }
        //
        return this;
      }
    }
  })()
})

// 添加事件
A('#test').on('click', function(e){console.log(e.target.innerHTML)});

// A.fn扩展 将'-'分割线转化为驼峰式
A.fn.extend({
  camelCase: function(str){
    return str.replace(/\-(\w)/g, function(all, letter){
      return letter.toUpperCase();
    })
  }
})

// A.fn扩展css样式
A.fn.extend({
  // 设置css样式
  css: function(){
    var arg = arguments,
        len = arg.length;
    if(this.length<1)
      return this;
    // 如果只有一个参数
    if(len === 1){
      // 如果为字符串 则为获取第一个元素css样式
      if(typeof arg[0] === 'string'){
        var name = arg[0];
        // IE
        if(this[0].currentStyle){
          return this[0].currentStyle[name];
        }else{
          return getComputedStyle(this[0], false)[name]
        }
      // 为对象 则设置多个样式
      }else if(typeof arg[0] === 'object'){
        for(var i in arg[0]){
          // 遍历每个样式
          for(var j = this.length -1;j>=0;j--){
            // 调用拓展方法CamelCase 将'-'分割线转化为驼峰式
            this[j].style[A.camelCase(i)] = arg[0][i];
          }
        }
      }
    // 两个参数 则设置一个样式
    }else if(len === 2){
      for(var j= this.length-1;j>=0;j--){
        this[j].style[A.camelCase(arg[0])] = arg[1];
      }
    }
    return this;
  }
});

A("#test").css('fontSize'); // "16px"
A("#test").css({color: 'red'}); // 成功设置成红色
A('div').css({background: 'yellow'}); // 两个div 都设置成红色背景

// A.fn扩展设置dom属性
A.fn.extend({
  // 设置属性
  attr: function(){
    var arg =arguments,
        len = arg.length;
    if(this.length<1)
      return this;
    // 如果一个参数
    if(len === 1){
      // 为字符串 则获取第一个元素属性
      if(typeof arg[0] === 'string'){
        return this[0].getAttribute(arg[0]);
      }else if(typeof arg[0] === 'object'){
        // 为对象 则设置每个元素的多个属性
        for(var i in arg[0]){
          for(var j = this.length-1;j>=0;j--){
            this[j].setAttribute(i, arg[0][i]);
          }
        }
      }
    // 两个参数 则设置每个元素单个属性
    }else if(len === 2){
      for(var j= this.length-1;j>=0;j--){
        this[j].setAttribute(arg[0], arg[1]);
      }
    }
    return this;
  }
});

A('#test').attr('id'); // "test"
A('#test').attr('data-id', 'newId'); // 添加成功 data-id="newId"
A('div').attr({'data-ok': 'true'}); // 两个div 添加成功 data-ok="true"

// A.fn扩展dom内容
A.fn.extend({
  // 获取或者设置元素的内容
  html: function(){
    var arg=arguments,
        len = arg.length;
    // 无参数则获取第一个元素的内容
    if(len === 0){
      return this[0] && this[0].innerHTML;
    // 一个参数 则设置每一个元素的内容
    }else if(len === 1){
      for(var i = this.length-1;i>=0;i--){
        this[i].innerHTML = arg[0];
      }
    }
    return this;
  }
});

A('#test').html(); // "test"
A('div').html('div-1111'); // 设置成功