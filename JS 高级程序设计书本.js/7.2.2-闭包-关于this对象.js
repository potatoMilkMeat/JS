/**
 * 闭包 中的this对象
 * 匿名函数运行时 this只会搜索到活动对象
 */
var name='window name'
var obj={
  name: 'object name',
  getNameFunc: function(){
    return function(){
      return this.name
    }
  }
}

obj.getNameFunc()() // 'window name'
// (function(){return this.name;})()

/** apply call 的用法 */ 
obj.getNameFunc().apply(obj) // "object name"
obj.getNameFunc().call(obj)  // "object name"

/**
 * 闭包与变量
 * 通过变量保存this, 让活动对象中保存原油this
 */
var obj={
  name: 'object name',
  getNameFunc: function(){
    var that=this
    return function(){
      return that.name
    }
  }
}

obj.getNameFunc()() // "object name"

/**
 * 箭头函数会  自动保存声明时 的this
 */
var obj={
  name: 'object name',
  getNameFunc: function(){
    return () => {return this.name;}
  }
}

obj.getNameFunc()()

/**
 * 赋值本身  调用 后的问题
 */
var obj={
  name: 'object name',
  getNameFunc: function(){
    return this.name
  }
}
(obj.getNameFunc = obj.getNameFunc)() // "window name"
// Uncaught TypeError: Cannot read property 'getNameFunc' of undefined
//     at test.js:59