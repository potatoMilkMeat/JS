/* 第二章 面向对象编程
*  2.3.3 继承————组合继承
*    作者：程龙 时间：2019-5-4 19:38
*/

// 声明父类
function SuperClass(name) {
  // 引用类型共有属性
  this.books = ['SuperClassBooks: JS', 'html', 'css']
  // 值类型共有属性
  this.name = name
}
// 为父类添加公有方法
SuperClass.prototype.getName = function () {
  console.log(this.name)
}

// 声明子类
function SubClass(name, time) {
  // 构造函数式继承父类 name 属性  @@@1次
  SuperClass.call(this, name)
  // 子类中新增共有属性
  this.time = time
}

// 类式继承 子类原型继承父类 @@@2次
SubClass.prototype = new SuperClass ()
// 子类原型方法
SubClass.prototype.getTime = function () {
  console.log(this.time)
}

// 实例化 SubClass
var instance1 = new SubClass ('JS book', 2014)
var instance2 = new SubClass('CSS book', 2016)

instance1.books.push('设计模式')
console.log('【instance1】-books：' + instance1.books + ' - time：' + instance1.time)
// Print: 【instance1】-books：SuperClassBooks: JS,html,css,设计模式 - time：2014
console.log('【instance2】-books：' + instance2.books + ' - time: ' + instance2.time)
// Print: 【instance2】-books：SuperClassBooks: JS,html,css - time: 2016
instance1.getName() // Print: JS book
instance1.getTime() // Print: 2014  

instance2.getName() // Print: CSS book
instance2.getTime() // 2016

// 组合继承的缺点：第一、父类继承使用了两遍
