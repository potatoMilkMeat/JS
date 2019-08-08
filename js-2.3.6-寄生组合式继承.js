/* 第二章 面向对象编程
*  2.3.6 继承——寄生组合式继承
*    作者：程龙 时间：2019-5-4 21:41
*    注意：子类添加原型必须用 点语法 SubClass.prototype.Fn = fn
*          用SubClass.prototype={}，会覆盖掉从父类继承的superClass.prototype
*/

// 原型式继承：
function inheritObject(o) {
  function F () {}
  F.prototype = o
  return new F ()
}
/* 寄生式继承 继承原型
*  传递参数： subClass 子类
*  传递参数： superClass父类
*  特点: 只执行子类的原型继承，并不会执行构造函数
*/
function inheritPrototype(subClass, superClass) {
  // 复制一份父类的原型副本保存在变量中
  var p = inheritObject(superClass.prototype)
  // 修正因为重写子类原型导致子类的constructor 属性被修改
  p.constructor = subClass
  // 设置子类的原型
  subClass.prototype = p
}

// 声明父类
function SuperClass(name) {
  this.color = ['color: red', 'blue', 'green']
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

// 寄生式继承 父类原型
inheritPrototype(SubClass, SuperClass)
// 子类原型方法
SubClass.prototype.getTime = function () {
  console.log(this.time)
}

var newBook = new SubClass('js book', 2014)
var newBook1 = new SubClass('CSS book', 2013)
newBook.color.push('black')
newBook1.color.push('white')

console.log('newBook - name: ' + newBook.name + ' color: ' + newBook.color)
// 打印: newBook - name: js book color: color: red,blue,green,black
console.log('newBook1 - name: ' + newBook1.name + ' color: ' + newBook1.color)
// 打印: newBook1 - name: CSS book color: color: red,blue,green,white

newBook.getName() // 打印: js book
newBook1.getTime() // 打印: 2013