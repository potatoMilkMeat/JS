/**
 * 闭包与变量 与参数 for循环问题
 * 闭包也叫做静态作用域，词语作用域
 * 闭包默认传的是最后一次的值（对象指向），参数则是直接传值。
 */
// function a () {
//   var result = []
//   for (var i=0; i<3; i++) {
//     result[i]= function(){
//       return i
//     }
//   }
//   return result
// }

// var aa = a()

// for (const item of aa) {
//   console.log(item()) // 输出全部为 3 3 3
// }

function a () {
  var result = []
  for (var i=0; i<3; i++) {
    result[i]= function(x){
      return function(){
        return x
      }
    }(i)
  }
  return result
}

var aa = a()

for (const item of aa) {
  console.log(item()) // 输出全部为 0 1 2
}