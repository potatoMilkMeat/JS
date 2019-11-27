/* 第二章 面向对象编程
*  2.3.2 继承————构造函数继承
*    作者：程龙 时间：2019-5-1 21:42
*/

// 声明父类
function SuperClass(id) {
  // 引用类型共有属性
  this.books = ['SuperClassBooks: JS', 'html', 'css']
  // 值类型共有属性
  this.id = id
}
// 为父类添加公有方法
SuperClass.prototype.showBooks = function () {
  console.log(this.books)
}

// 声明子类
function SubClass(id) {
  // 继承父类
  SuperClass.call(this, id)
}

// 实例化 SubClass
var instance1 = new SubClass(10)
var instance2 = new SubClass(11)

instance1.books.push('设计模式')
console.log('【instance1】-books：' + instance1.books + ' - id：' + instance1.id)
// Print: 【instance1】-books：SuperClassBooks: JS,html,css,设计模式 - id：10
console.log('【instance2】-books：' + instance2.books + ' - id：' + instance2.id)
// Print: 【instance2】-books：SuperClassBooks: JS,html,css - id：11
instance1.showBooks() // Print: instance1.showBooks is not a function

// 构造函数继承的缺点：第一、父级的类原型不能使用
// 第二、都是单独的，不能公用。
