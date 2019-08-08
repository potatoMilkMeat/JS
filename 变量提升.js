/**
 * Js 变量提升 的研究
 */

/**
 * var 部分
 */

// function double (num) {
//   console.log(myVariable)
//   var myVariable
//   return num*2
// }
// double(3)

/**
 * let 部分
 * 必须先声明才可以使用
 * 如果有赋值，必须等到赋值完成后才能调用【临时死亡区域】
 */

// function isTruthy (value) {
//   var myVariable = 'value 1'
//   if (value) {
//     // myVariable的临时死亡区域
//     // console.log(myVariable)  // 直接抛出错误。如果有赋值，必须等到赋值完成后才能调用

//     let myVariable = 'value 2' // myVariable 的临时死亡区间到此结束
//     console.log(myVariable)
//     return true
//   }
//   return false
// }

// isTruthy(1)

/**
 * const 部分
 * const常量：不允许改动（Object不能改变指向，能改变属性值）；
 *            只能在同一条语句中申明和初始化
 *            常量也具有临时死亡区域，同let一样
 */

// const a
// console.log(a) // 报错： 常量声明中缺少初始化  SyntaxError: Missing initializer in const declaration

/**
 * 函数 部分
 * 函数 可以放在任何地方，只要在当前作用域下，就可以被使用。
 * 函数表达式必须先声明，运行后此函数才声明。然后才可以被使用
 */

// add(1, 2)
// sub(10, 1) // TypeError: sub is not a function

// function add(a, b) {
//   return console.log(a + b)
// }

// var sub = function (a, b) {
//   return console.log(a - b)
// }

/**
 * 类 部分
 * 函数 可以放在任何地方，只要在当前作用域下，就可以被使用。
 * 函数表达式必须先声明，运行后此函数才声明。然后才可以被使用
 */

// class Point {
//   constructor(x, y) {
//     this.x = x
//     this.y = y
//   }
//   move(dx, dy) {
//     this.x = dx
//     this.y = dy
//   }
//   console_log() {
//     console.log('x: ', this.x, 'y: ', this.y)
//   }
// }

// // 创建实例
// var origin = new Point(0, 0)
// origin.console_log()
// // 调用实例的方法
// origin.move(50, 100)
// origin.console_log()

console.log(typeof a) // undefined

// var c = new a(10); // TypeError: a is not a constructor

var a = class {
  constructor(arg) {
    this.arg = arg
    // this.console_log() // 初始化和执行都必须在constructor 【构造函数中进行】
  }
  console_log() {
    return console.log(this.arg)
  }
}
var b = new a(5).console_log()
