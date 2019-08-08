/**
 * JS中let块级作用域差别
 * 
 */
var x = '1';
let x_let = 20;
{
  var x_var = '10';
  let x_let = '11';
  console.log(x_var); // global x_var = '10'
  console.log(x_let); // block x_let = '11'
}
console.log(x); // global x = '1'
console.log(x_var);  // global x_var = '10'
console.log(x_let); //  script x_let = 20

/**
 * Js 执行上下文的研究
 * （一） Execution context 会 绑定 variable Object。
 * fun() {}执行中，先声明参数，变量（变量会先初始化为undefined，变量会在运行中赋值）
 */
var x = '1';
function f(msg) { // arguments 是早于变量声明的，并已经赋值。
  var x, y // var x=10; 相当于把var x先执行，然后执行到表达式的时候再赋值。
  console.log(msg, x, y, b)
  x = 10
  console.log(msg, x, y, b)
  var b // var 申明的变量会统一提到最前面执行(无论在哪里，无论是否统一声明)，并赋值 undefined  
}
console.log(x)
f('good job')

/**
 * Js arguments 参数长度
 */
var x = '1';
function f(...arg) { 
  console.log(arg.length)
}
f('good job', 1 ,x)