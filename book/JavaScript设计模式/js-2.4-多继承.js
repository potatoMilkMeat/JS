/* 第二章 面向对象编程
*  2.3.6 多继承
*    作者：程龙 时间：2019-5-4 22:30
*/

// 单继承 属性复制 ---------------
var extend = function (target, source) {
  // 遍历源对象的属性
  for (var property in source) {
    // 将源对象的属性复制到目标对象中
    target[property] = source[property]
  }
  // 范围目标对象
  return target
}

var book = {
  name: 'JS 设计模式',
  alike: ['CSS book', 'html book']
}
var anotherBook = {
  color: 'blue'
}
/* // 开启这段代码，会对 book.alike 的所有引用生效，例如28行和55行的输出
book.alike.push('push-book')  */

extend(anotherBook, book)
console.log(anotherBook) // 打印： {color: "blue", name: "JS 设计模式", alike: Array(2)}
// 单继承 属性复制 结束 ---------------

// 多继承 属性复制 ---------------
var mix = function () {
  var i = 1,                  // 从第二个参数起为被继承的对象
      len = arguments.length, // 获取参数的长度 
      target = arguments[0],  // 第一个对象为目标对象
      arg                     // 缓存参数对象
  // 遍历被继承的对象
  for (; i < len; i++) {
    // 缓存当前对象
    arg = arguments[i]
    for (var property in arg) {
      // 遍历被继承对象中的属性
      target[property] = arg[property]
    }
  }

  // 返回目标对象
  return target
}

var mixBook = {
  fontSize: '16px'
}
mix(mixBook, anotherBook, book)
console.log(mixBook) // 打印： {fontSize: "16px", color: "blue", name: "JS 设计模式", alike: Array(2)}