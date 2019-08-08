/**
 * JS中let和var的区别
 * （一）声明后未赋值，表现相同
 */

(function() {  
  var varTest;
  let letTest;
  console.log(varTest); //输出undefined
  console.log(letTest); //输出undefined
}());

/**
 * JS中let和var的区别
 * （二）使用未声明的变量，表现不同:
 */

// (function() {
//   console.log(varTest); //输出undefined (注意要注释掉下面一行才能运行)
//   console.log(letTest); //直接报错：ReferenceError: letTest is not defined
//   var varTest = 'test var OK.';
//   let letTest = 'test let OK.';
// }());

/**
 * JS中let和var的区别
 * （三）重复声明同一个变量时，表现不同：
 */

// (function() {
//   "use strict";
//   var varTest = 'test var OK.';
//   let letTest = 'test let OK.';

//   var varTest = 'varTest changed.';
//   // let letTest = 'letTest changed.'; //直接报错：SyntaxError: Identifier 'letTest' has already been declared

//   console.log(varTest); //输出varTest changed.(注意要注释掉上面letTest变量的重复声明才能运行)
//   console.log(letTest);
// }());

/**
 * JS中let和var的区别
 * （四）变量作用范围，表现不同：
 */

// var cd = function() {
//   var varTest = 'test var OK.';
//   let letTest = 'test let OK.';

//   {
//     var varTest = 'varTest changed.';
//     let letTest = 'letTest changed.';
//     console.log("letTest: " + letTest);
//   }

//   console.log(varTest); //输出"varTest changed."，内部"{}"中声明的varTest变量覆盖外部的letTest声明
//   console.log(letTest); //输出"test let OK."，内部"{}"中声明的letTest和外部的letTest不是同一个变量
// }
// cd()