/* 第二章 面向对象编程
*  2.3.5 继承——寄生式继承
*    作者：程龙 时间：2019-5-4 21:32
*/

// 原型式继承：
function inheritObject(o) {
  function F () {}
  F.prototype = o
  return new F ()
}

// 检测这种封装是和类原型式一样
var book = {
  name: 'JS book',
  alikeBook: ['CSS book', 'html book']
}

function createBook(obj) {
  // 通过原型式继承方式创建新对象
  var o = new inheritObject(obj)
  // 拓展新对象
  o.getName = function () {
    console.log(this.name)
  }
  // 返回拓展后的新对象
  return o
}

var newBook = createBook(book)
var newBook1 = createBook(book)
newBook.name = 'new book'
newBook1.name = 'newBook1'
newBook.alikeBook.push('123 book')
newBook1.alikeBook.push('qqq book')

console.log('newBook - name: ' + newBook.name + ' alikeBook: ' + newBook.alikeBook)
// 打印: newBook - name: new book     alikeBook: CSS book,html book,123 book,qqq book
console.log('newBook1 - name: ' + newBook1.name + ' alikeBook: ' + newBook1.alikeBook)
// 打印: newBook1 - name: newBook1    alikeBook: CSS book,html book,123 book,qqq book
console.log('book - name: ' + book.name + ' book: ' + book.alikeBook)
// 打印: book - name: JS book              book: CSS book,html book,123 book,qqq book

newBook.getName() // 打印: new book
newBook1.getName() // 打印: newBook1