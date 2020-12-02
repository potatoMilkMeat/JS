/** =====8.2 命名空间的管理员=================== */
var Ming = {
  g(id){return document.getElementById(id)},
  css(id, key ,value){
    this.g(id).style[key] = value;
    return this.g(id);
  },
  // ...
}

/** =====8.4 创建一个小型代码库=================== */
var A = {
  Util: { util_method1(){}, util_method2(){} },
  Tool: { tool_method1(){}, tool_method2(){} },
  Ajax: { get(){}, post(){} },
  others: { /** ... */ },
  // ...
}

/** =====8.5 无法修改的静态变量=================== */
var Conf = (function(){
  var conf = {Max_num:100, Min_num: 1, Count: 1000};
  return {
    get(name){ return conf[name] ? conf[name] : null; }
  }
})();

count = Conf.get('Count');

// es6 以后的写法   const conf
// 声明常量  不能重新赋值或者指向，但是内部属性可以重新赋值和指向
/* 结合使用就能让代码 不被重写 */
const count2 = (function(){
  var conf = {Max_num:100, Min_num: 1, Count: 1000};
  return {
    get(name){ return conf[name] ? conf[name] : null; }
  }
})();

/** =====8.6 惰性单例=================== */
var LazySingle = (function(){
  var _instance = null;
  function Single(){
    return { publicProperty: '1.0', publicMethod(){console.log('publicMethod');return this;}}
  }
  return function(){
    if(!_instance)
      _instance = Single;
    return _instance;
  }
})();

console.log(LazySingle()().publicMethod().publicProperty);

