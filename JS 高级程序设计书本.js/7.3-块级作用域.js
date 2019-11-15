/**
 * 块级作用域定义的  变量 ， 实际上是在函数中定义的
 */
function outputNumber(count){
  for(var i=0; i<count; i++){ console.log('for语句 \t'+ i); }
  console.log(i)
}

outputNumber(3)
// for语句 	0
// for语句 	1
// for语句 	2
// 3

/**
 * 即使重新申明，结果与上面一样
 * 说明 var i 申明失效，对后续申明视而不见。
 */
function outputNumber(count){
  for(var i=0; i<count; i++){ console.log('for语句 \t'+ i); }
  var i;
  console.log(i)
}

outputNumber(3)
// for语句 	0
// for语句 	1
// for语句 	2
// 3

/**
 * 块级作用域 （私有作用域）
 * 用于建立私有变量，函数执行后销毁
 * 避免污染全局
 */
(function(){ /** 这里是块级作用域 */ return 'a'; })() // 'a'

function outputNumber(count){

  (function(){
    for(var i=0; i<count; i++){ console.log('for语句 \t'+ i); }
  })()

  var i;
  console.log(i) // 'undefined'
}

/**
 * 块级作用域 （私有作用域）
 * let 申明的就是 块级作用域
 */
function outputNumber(count){
  for(let i=0; i<count; i++){ console.log('for语句 \t'+ i); }
  var i;
  console.log(i) // 'undefined'
}