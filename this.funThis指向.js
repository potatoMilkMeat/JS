/**
 * function 是全局函数，或变量指向全局 func，this 指向全局，
 * 当func作为Object的方法时，this 指向Object 
 * 
 */

/**
 * 全局函数 ，this指向全局
 */
var x = 1;
function f () {
  console.log(this.x);
}
f() // 1 

/**
 * 函数表达式，指向函数表达式所在的作用域（全局）
 */
var ff = function () {
  this.x = 2; // 全局的x值改为2
  console.log(this.x)
}

ff() // 2
console.log(x) // 2
/**
 * 对象中的函数，指向对象本身
 */
var o= { x: 'osx', f: f}
o.f() // osx
