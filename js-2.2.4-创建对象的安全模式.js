/* 第二章 面向对象编程
*  2.2.4 创建对象的安全模式
*    作者：程龙 时间：2019-4-26 23:42
*/

// 图书类
/* var Book = function (title, time, type) {
  this.title = title
  this.time = time
  this.type = type
}

 // 没有new, 实例化一本书.对象添加到 window上
var book = Book('JavaScript', '2014', 'js')
console.log(book) // Print: undefined
console.log(window.title + ' -  ' + window.time + ' - ' + window.type) //Print: JavaScript -  2014 - js

// 正确实例化
var book1 =new Book('Vue-iview', '2017', 'js前端框架')
console.log(book1) //Print: Vue-iview -  2017 - js前端框架 */


// 图书类
var Book = function (title, time, type) {
  // 判断执行过程中, this是否指向当前对象（如果是说明使用 new 创建的）
  if (this instanceof Book) {
    this.title = title
    this.time = time
    this.type = type
  } else {
    return new Book(title, time, type)
  }
}

 // 没有new, 实例化一本书.对象添加到 window上
 var book = Book('JavaScript', '2014', 'js')
 console.log(book)
 