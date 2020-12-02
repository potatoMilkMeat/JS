/** =====36.3- 闭包环境 ========= */
// 向闭包中传入模块管理器对象F（~屏蔽压缩文件时，前面漏写;报错）
~(function(F){
  // 模块缓存器。存储已创建模块
  var moduleCache = {},
      /**
       * 设置模块并执行模块构造函数
       * @param {*} moduleName 模块名称（id）
       * @param {*} params 依赖模块
       * @param {*} callback 模块构造函数
       */
      setModule = function (moduleName, params, callback){
        // 模块容器，模块文件加载完成回调函数
        var _module, fn;
        // 如果模块被调用过
        if(moduleCache[moduleName]){
          // 获取模块
          _module = moduleCache[moduleName];
          // 设置模块已经加载完成
          _module.status = 'loaded';
          // 矫正模块接口
          _module.exports = callback ? callback.apply(_module, params) : null;
          // 执行模块文件加载完成回调函数
          while(fn = _module.onload.shift()){
            fn(_module.exports);
          }
        // 模块不存在（匿名模块），则直接执行构造函数
        }else{
          callback && callback.apply(null, params);
        }
      },
      /**
       * 异步加载依赖模块所在文件
       * @param {*} moduleName 模块路径（id）
       * @param {*} callback 模块加载完成回调函数
       */
      loadModule = function (moduleName, callback){
        // 依赖模块
        var _module;
        // 如果依赖模块被要求加载过
        if(moduleCache[moduleName]){
          // 获取该模块信息
          _module = moduleCache[moduleName];
          // 如果该模块加载完成
          if(_module.status === 'loaded'){
            // 执行模块加载完成回调函数
            setTimeout(callback(_module.exports), 0);
          }else{
            // 缓存该模块所处文件 加载完成回调函数
            _module.onload.push(callback);
          }
        // 模块第一次被依赖引用
        }else{
          // 缓存该模块初始化信息
          moduleCache[moduleName] = {
            moduleName: moduleName, // 模块ID
            status: 'loading', // 模块对应文件加载状态（默认加载中）
            exports: null, // 模块接口
            onload: [callback] // 模块对应文件加载完成回调函数缓冲器
          };
          // 加载模块对应文件
          loadScript(getUrl(moduleName));
        }
      },
      // 获取文件路径
      getUrl = function(moduleName){
        // 拼接完整的文件路径字符串 如 'lib/ajax' => 'lib/ajax.js'
        return String(moduleName).replace(/\.js$/g, '') + '.js';
      },
      // 加载脚本文件
      loadScript = function(src){
        // 创建script文件
        var _script = document.createElement('script');
        _script.type = 'text/JavaScript'; // 文件类型
        _script.charset = 'UTF-8'; //文件编码
        _script.async = true; // 异步加载
        _script.src = src; // 文件路径
        document.getElementsByTagName('head')[0].appendChild(_script); // 插入页面中
      };
  // window.moduleCache = moduleCache; // 开启显示模块缓存
  /** =====36.4- 创建与调度模块 ========= */
  /**
   * 创建与调用模块方法
   * @param {*} url 模块url
   * @param {*} modDeps 依赖模块
   * @param {*} modCallback 模块主函数
   */
  F.module = function (url, modDeps, modCallback){
    // 将参数转换为数组
  var args = Array.prototype.slice.call(arguments),
    // 获取模块构造函数（参数数组中最后一个参数成员）
    callback = args.pop(),
    // 获取依赖模块（紧邻回调函数参数，且数据类型为数组）
    deps = (args.length && args[args.length-1] instanceof Array) ? args.pop() : [] ,
    // 该模块URL（模块ID）
    url = args.length ? args.pop() : null,
    // 依赖模块序列
    params = [],
    // 未加载的依赖模块数量统计
    depsCount = 0,
    // 依赖模块序列中索引值
    i = 0,
    // 依赖模块序列长度
    len;
  // 获取依赖模块长度
  if(len = deps.length){
  // 遍历依赖模块
  while(i<len){
    // 闭包保存i
    (function(i){
      // 增加未加载依赖模块数量统计
      depsCount++;
      // 异步加载依赖模块
      loadModule(deps[i], function(mod){
        // 依赖模块序列中添加依赖模块接口引用
        params[i] = mod;
        // 依赖模块加载完成，依赖模块数量统计减一
        depsCount--;
        // 如果依赖模块全部加载
        if(depsCount === 0){
          // 在模块缓存器中矫正该模块，并执行构造函数
          setModule(url, params, callback);
        }
      });
    })(i);
    // 遍历下一个依赖模块
    i++;
  }
  // 无依赖模块，直接执行回调函数
  }else{
  // 在模块缓存其中矫正该模块，并执行构造函数
  setModule(url, [], callback);
  }
  }
})((function(){
  // 创建模块管理器对象F，并保存在全局作用域中
  return window.F = {};
})());



/** =====36.5- 加载模块 ========= */
// 添加到 模块缓存器。存储已创建模块
// var moduleCache = {},
//     loadModule,
//     getUrl,
//     loadScript;

/** =====36.6- 加载模块 ========= */
// 添加到 模块缓存器。存储已创建模块
// var moduleCache = {},
//     setModule,

/** =====36.7- 学以致用 ========= */
// 代码查看 lib/dom.js
// 代码查看 lib/event.js
// index.html 执行代码

/*
看了好多遍才理解这个……真是很厉害……
跟着代码走一遍，看看流程到底是怎样的
首先这个代码是说 在lib下面有2个文件，dom和event，然后相当于页面里有一个代码加载他们
看主线代码，['lib/event', 'lib/dom']，这是要加载2个依赖，所以在module函数里，走if里面的代码，做loadModule
loadModule先去加载event,这是第一次接在，走loadModule的else语句，所以在cache里创建了一个event的项
目前的代码还是
 {
 moduleName: 'lib/event',
 status: 'loading',
 exports: null,
 onload: [callback] 这个callback是loadModule的callback
 }
 然后去用了loadScript 这部分代码到此完结
 同样 dom部分也做一遍，完结了
 那么，这剩下的代码是怎么做的，它是怎么完成调用的呢
 是loadScript去加载了event这个文件，放到了head标签里
 这时候就会去做event这个文件的内容
 做的是什么，event里写的是F.module('lib/event', ['lib/dom']………………这样的一段，所以开始做这段代码
 这段代码说需要有dom的依赖，所以又做loadModule
 但是因为刚刚已经缓存过这个了，所以做if语句里的，我们假设这时候dom还没加载完
 那么，就做了else的，把callback添加到onload里 这个callback是loadModule的callback
 注意不要搞混，这个module里的变量是不和刚刚的主函数里的module里的变量共享的，所以完成计数depsCount是不共享的
 但是loadModule的回调函数是添加在moduleCache中的，这个是共享的
 同样，loadScript也去做了加载dom的一遍
 现在,开始加载dom了，所以做dom里的语句，F.module
 这里没有依赖，直接做else的setModule
 虽然F.module里的局部变量不是共享的，但是moduleCache这东西是共享的
 所以在setModule中moduleCache里有它，就改变了状态，同时将exports改成了dom里定义的return的对象
 然后做了onload的回调函数，这个回调函数是loadModule的哦
 loadModule的回调被调用，依赖交给params，depsCount--，这时候对于event来说，依赖全部完成了，开始做event的setModule
 同样，event的setModule让自己的状态变成loaded，并且触发moduleCache('lib/event')里的onload
 这时候dom和event都减为0了，所以主流程里的setModule被调用
 主流程并没有模块名(匿名模块),在setModule里走else语句
 也就是直接执行函数，所以完成了
 有点复杂……很厉害啊
*/