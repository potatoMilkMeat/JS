/* 第二章 面向对象编程
*  2.3.4 继承——原型式继承
*    作者：程龙 时间：2019-5-4 21:16
*/

// 原型式继承：就是对类原型的一个封装
function inheritObject(o) {
  //申明一个过度函数对象
  function F () {}
  //过渡对象的原型继承父对象
  F.prototype = o
  // 返回过度对象的一个实例，该实例的原型继承了父对象
  return new F ()
}

// 检测这种封装是和类原型式一样
var book = {
  name: 'JS book',
  alikeBook: ['CSS book', 'html book']
}

var newBook = inheritObject(book)
var newBook1 = inheritObject(book)
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
