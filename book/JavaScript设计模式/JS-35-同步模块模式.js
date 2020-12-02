/** =====35.3- 模块管理器和创建方法 ========= */
// 定义模块管理器 的 单体对象
var F= F ||{};
/**
 * 定义模块方法（理论上，模块方法应该放在闭包中实现，可以隐蔽内部信息，这里我们为让读者能够看明白，我们忽略此步骤）
 * @param {*} str 模块路由
 * @param {*} fn 模块方法
 */
F.define = function (str, fn){
      // 解析模块路由
  var parts = str.split('.'),
      // old 当前的祖父模块，parent 当前的父模块
      // 如果在闭包中，为了屏蔽对模块直接访问，建议将模块添加给闭包内部私有变量
      old = parent = this,
      // i 模块层级，len 模块层级长度
      i = len = 0;
  // 如果第一个模块是模块管理器单体对象，则移除
  if(parts[0]==='F'){
    parts = parts.slice(1);
  }
  // 屏蔽对 define 与 module 模块方法重写
  if(parts[0] === 'define' || parts[0] === 'module'){
    return;
  }
  // 遍历路由模块并定义每层模块
  for(len = parts.length;i<len;i++){
    // 如果父模块中不存在当前模块
    if(typeof parent[parts[i]] === 'undefined'){
      // 申明当前模块 
      parts[parts[i]] = {};
    }
    // 缓存下一层级的祖父模块
    old = parent;
    // 缓存一下层级的 父模块
    parent = parent[parts[i]];
  }
  // 如果给定模块方法则定义该模块方法
  if(fn){
    // 此时 i等于parts.length, 故减一
    old[parts[--i]] = fn();
  }
  // 返回模块管理器当日对象
  return this;
}

/** =====35.4- 创建模块 ========= */
/**
 * 注意：在真正的模块开发中，是不允许这样直接调用的，有两点原因，
 * 技术上，模块通常保存在闭包内部的私有变量里，而不会保存在F上，因此是获取不到的，
 * 而我们这里简化了闭包，页为测试方便，因此直接引用。
 */
// F.string 模块
F.define('string', function(){
  // 接口方法
  return {
    // 清除字符串两边空格
    trim: function(str){
      return str.replace(/^\s+|\s+$/, '');
    }
  }
})
// 其次，类似如下调用时不符合模块开发规范的。
F.string.trim('测试用例。   '); // 注意，正则只能去除头或尾的空白，如果头和尾都有，需要执行两次。

F.define('dom', function(){
  // 简化获取元素方法（重复获取柯被替代，此设计用于演示模块添加）
  var $ = function(id){
    $.dom = document.getElementById(id);
    // 返回构造函数对象
    return $;
  }
  // 获取或者设置元素内容
  $.html = function(html){
    // 如果传参则设置元素内容，否则获取元素内容
    if(html){
      this.dom.innerHTML = html;
      return this;
    }else{
      return this.dom.innerHTML;
    }
  }
  // 返回构造函数
  return $;
});
// 测试用例
document.write('<div id="test">id-test 的内容</div>');
F.dom('test').html(); // "id-test 的内容"
F.dom('test').html('新内容'); // 新内容

/**
 * 对于非闭包的模块，可以先申明后创建
 * 为dom模块添加addclass方法
 * 注意，此种添加模块之所有可行，是因为将模块添加到F对象上，模块化开发中只允许上面的添加方式
 */
F.define('dom.addClass');
F.dom.addClass = function(type, fn){
  return function(className){
    // 如果不存在该类
    if(!~this.dom.className.indexOf(className)){
      // 简单添加类
      this.dom.className += ' '+ className;
    }
  }
}();
// 测试用例
F.dom('test').addClass('test');

/** =====35.5- 模块调用方法 ========= */
// 模块调用方法
// fn 为最后一个参数
// parts 为第一个参数数组 或者 除去fn 的参数构成数组
F.module = function(){
      // 将参数转化为数组
  var args = Array.prototype.slice.call(arguments),
      // 获取回调执行函数
      fn = args.pop(),
      // 获取依赖模块，如果args[0]是数组，则依赖模块为args[0], 否则依赖模块为args // 此时args执行过一次pop()
      parts = args[0] && args[0] instanceof Array ? args[0] : args,
      // 依赖模块列表
      modules = [],
      // 依赖模块路由
      modIDs = '',
      // 依赖模块索引
      i = 0,
      // 依赖模块长度
      ilen = parts.length,
      // 父模块，模块路由层级索引，模块路由层级长度
      parent, j, jlen;
  // 遍历依赖模块
  while(i < ilen){
    // 如果是路由模块
    if(typeof parts[i] === 'string'){
      // 设置当前模块父对象（F）
      parent = this;
      // 解析模块路由，并屏蔽掉模块父对象
      modIDs = parts[i].replace(/^F\./, '').split('.');
      // 遍历模块路由层级
      for(j=0, jlen = modIDs.length;j<jlen;j++){
        // 重置父模块
        parent = parent[modIDs[j]] || false;
      }
      // 将模块添加到依赖模块列表
      modules.push(parent);
    // 如果是模块对象
    }else{
      // 直接加入依赖模块列表
      modules.push(parts[i]);
    }
    // 取下一个依赖模块
    i++;
  }
  // 执行回调执行函数
  fn.apply(null, modules);
}

/** =====35.6- 调用模块 ========= */
// 引用 dom 模块 与 document 对象（注意，依赖模块对象通常为已创建的模块对象）
F.module(['dom', document], function(dom, doc){
  // 通过 dom 模块设置元素内容
  dom('test').html('new ADD!    ');
  // 通过document 设置body 元素背景色
  doc.body.style.background = '#f2f2f2';
})

// 依赖引用dom模块，string.trim方法
F.module('dom', 'string.trim', function(dom, trim){
  // 获取 id='test' 的内容
  var html = dom('test').html();
  // 去掉首或尾空白
  var str = trim(html);
  console.log('*'+ html+ '*', '*'+str+'*'); // *new ADD!    * *new ADD!*
})
