/* 第二章 面向对象编程
*  2.2.3 闭包实现
*    作者：程龙 时间：2019-4-26 23:22
*/

// 第一种闭包写法
var Book = (function () {
  // 静态私有变量/方法
  var booNum = 0
  //特权方法
  var printNum = function (booNum) { console.log('Book.checkBook(): args:' + booNum) }

  // 返回构造函数
  return function (newId, newName) {
    // 私有属性/方法
    var name,
        checkID = function (id) { console.log('返回构造函数：checkID(): args:' + id) }
    
    // 特权方法
    this.getName = function () {  console.log('返回构造函数：this.getName: 《' + this.name + '》') }
    this.setName = function (name) { this.name = name; console.log('返回构造函数：this.setName:  《' + name + '》') }

    // 公有属性/方法
    this.id = newId
    this.copy = function () {console.log("this.copy is fn")}
    booNum++
    if (booNum > 3) { 
      printNum(booNum)
      console.log("这本书添加失败：《" + newName + '》 - ' + newId)
      throw new Error('我们仅出版3本书')
    }

    // 构造器
    this.setName(newName)
  }
})()

Book.prototype = {
  isJSBook: false,
  display: function () {console.log('Book.prototype.display is fn')}
}


// 第二种闭包写法
/* var Book = (function () {
  // 静态私有变量/方法
  var booNum = 0
  //特权方法
  var printNum = function (booNum) { console.log('Book.checkBook(): args:' + booNum) }
  
  // 返回构造函数
  var fn = function (newId, newName) {
    // 私有属性/方法
    var name,
        checkID = function (id) { console.log('返回构造函数：checkID(): args:' + id) }
    
    // 特权方法
    this.getName = function () {  console.log('返回构造函数：this.getName: 《' + this.name + '》') }
    this.setName = function (name) { this.name = name; console.log('返回构造函数：this.setName:  《' + name + '》') }

    // 公有属性/方法
    this.id = newId
    this.copy = function () {console.log("this.copy is fn")}
    booNum++
    if (booNum > 3) { 
      printNum(booNum)
      console.log("这本书添加失败：《" + newName + '》 - ' + newId)
      throw new Error('我们仅出版3本书')
    }

    // 构造器
    this.setName(newName)
  }
  // fn的prototype声明
  fn.prototype = {
    isJSBook: false,
    display: function () {console.log('Book.prototype.display is fn')}
  }

  return fn
})() */

var jsBook = new Book('jsBook-id: 01', 'JSBook 设计指导')
var CSSBook = new Book('CSSBook-id: 02', 'CSSBook 设计指南')
var VueBook = new Book('VueBook-id: 03', 'Vue-cli用法大全')
VueBook.display()
var VueBook2 = new Book('VueBook2-id: 04', 'Vue-iview用法')
