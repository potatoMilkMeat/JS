/**
 * 递归的两种形式
 * arguments.callee()  当前函数指针
 */
function factorial(n){
  if(n<=1) return 1;
  else return n*arguments.callee(n-1)
}

var a=factorial
factorial=null // null
a(5) // 120

/**
 * 递归的两种形式
 * 函数表达式  块级 f()
 */
var factorial=(
  function f(n){
    if(n<=1) return 1;
    else return n*f(n-1)
  }
)

var a=factorial
factorial=null // null
a(5) // 120
