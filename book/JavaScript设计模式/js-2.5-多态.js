/* 第二章 面向对象编程
*  2.3.6 多态——多种调用方式
*    作者：程龙 时间：2019-5-4 22:52
*/

// 多态 ---------------
/* function add() {
  var arg = arguments,        // 获取参数
      len = arguments.length  // 获取参数长度
  switch (len) {
    case 0:                   // 没有参数，返回默认值10
      return 10
    case 1:                   // 1个参数，返回 参数 + 10
      return 10 + arg[0]
    case 2:                   // 1个参数，返回 2参数之和
      return arg[0] + arg[1]
    default:
      throw new Error ('参数数量不对：' + len)
  }
}
// 测试结果
console.log(add())
console.log(add(5))
console.log(add(25, 10))
console.log(add(25, 10, 25, 25, 10))

*/
// 多态 结束---------------

// 多态 封装 ---------------
function Add() {
  function aero() {return 10}                   // 没有参数 方法
  function one(num) {return 10 + num}           // 1个参数 方法
  function two(num1, num2) {return num1 + num2} // 2个参数 方法
  this.add = function () {
    var arg = arguments,        // 获取参数
      len = arguments.length  // 获取参数长度
    switch (len) {
      case 0:                   // 没有参数，返回默认值10
        return aero()
      case 1:                   // 1个参数，返回 参数 + 10
        return one(arg[0])
      case 2:                   // 1个参数，返回 2参数之和
        return two(arg[0], arg[1])
      default:
        throw new Error ('参数数量不对：' + len)
    }
  }
}

// 测试结果
var A = new Add()
console.log(A.add())
console.log(A.add(3))
console.log(A.add(2, 5))
console.log(A.add(25, 10, 25, 25, 10))
// 多态 封装 结束---------------

