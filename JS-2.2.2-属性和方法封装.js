/* 第二章 面向对象编程
*  2.2.2 属性和方法封装
*    作者：程龙 时间：2019-4-26 22:39
*/

var Book = function (id, bookname) {
  // 私有属性和私有方法(函数)
  var num = 1
  var numAdd = function () { num++; console.log('BooK.num: ' + num) } // num前面不能带this，也不能带_this,否则找不到变量num

  // 特权方法
  this.printNum = function () { numAdd() }
  this.getName = function () {  console.log('Book.getName: ' + this.name) }
  this.setName = function (name) { this.name = name; console.log('Book.setName: ' + name) }

  // 公共属性和公共方法
  this.id = id
  this.copy = function () {console.log("this.copy is fn")}

  // 构造器-实例化的时候会执行
  this.setName(bookname) // Print: setName: JS设计模式
  this.printNum()
}

/* // Book实例化
Book('Book.id = 11', 'Book模式')
// Print: Book.setName: Book模式
// Print: BooK.num: 2 */

// Book的原型-实例化前，是 不可以访问
Book.prototype = {
  isJSbok: false,
  getJSbok: function () { console.log('getJSbok: - + this.isJSbok' ) }
}
// console.log(Book.isJSbok) // Print: undefined
// Book.getJSbok() // TypeError: Book.getJSbok is not a function

// 【BooK类的静态公共属性/方法】 点语法-仅仅Book可以访问 （对象不能访问）
Book.isChinese = true
Book.resetTime = function (data) { console.log('resetTime: ' + data) }
 // console.log(Book.isChinese) // Print: true
 // Book.resetTime('2019-4-26') // Print: resetTime: 2019-4-26



var b = new Book('b.id = 11', 'JS设计模式') // 构造函数执行
// Print: Book.setName: JS设计模式
// Print: BooK.num: 2 */

/* // 公共属性/方法
console.log(b.id) // Print: b.id = 11
b.copy() // Print: this.copy is fn
// 特权方法 
b.setName('new b Name') // Print: Book.setName: new b Name
b.getName() // Print: Book.getName: new b Name
  // 结论： 私有属性虽然不能直接访问，但是还存在着，通过特权方法能进行计算
b.printNum() // Print: BooK.num: 3

// 【prototype】  原因：实例化后，外部可以访问  
console.log('b.isJSbok: '+ b.isJSbok) // Print: false
b.getJSbok() // Print: getJSbok: - + this.isJSbok */

// 不可以访问的：私有属性/方法，静态公共属性/方法
// console.log('b.num: '+ b.num) // Print: undefined  原因：私有属性，外部无法访问
// console.log('b.isChinese: '+  b.isChinese) // Print: undefined 原因：静态公共属性/方法