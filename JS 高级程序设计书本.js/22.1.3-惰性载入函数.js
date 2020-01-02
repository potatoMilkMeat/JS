/**
 * creatMath 在内部先重新 改写creatMath
 * 然后运行一次
 * 以后再运行就是   ƒ yes(a,b){ return a+b }
 */
function creatMath(a, b) {
  if (true) {
    creatMath = function yes(a, b) {
      return a + b
    }
  } else {
    creatMath = function no(a, b) {
      return a * b
    }
  }

  return creatMath(a, b)
}

creatMath(2, 4) // 6


/**
 * 在给creatMath 变量赋值时就返回   ƒ yes(a,b){ return a+b }
 */
creatMath = (function (a, b) {
  if (true) {
    return function yes(a, b) {
      return a + b
    }
  } else {
    return function no(a, b) {
      return a * b
    }
  }
})()

creatMath(2, 4) // 6