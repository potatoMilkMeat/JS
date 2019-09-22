/**
 * @discript es3/es5 默认参数
 * @param {默认参数} arg = 10 
 */
// function a (arg) {
//   arg = arg || 10
//   console.log(arg)
// }
// a('我是参数')
// a()

/**
 * @discript es6 默认参数
 * @param {默认参数} arg = 10 
 */
// function a (arg = 10) {
//   console.log(arg)
// }

// a('我是参数')
// a() 

/**
 * @discript es6 默认参数检查异常的方法
 * @param {默认参数} x必须复制 
 */

// {
//   function checkParamter() {
//     throw new Error('can\'t be empty')
//   }
//   function f (x = checkParamter(), y = 7, z = 42) {
//     return x+y+z
//   }

//   console.log(f(1))

//   try{
//     f()
//   } catch (e) {
//     console.log(e)
//   } finally {

//   }
// }

// {
//   // ES3/ES5 可变参数
//   function sum () {
//     var a = Array.prototype.slice.call(arguments),
//         sum = 0
//     a.forEach(i => {
//       sum += i
//     })
//     return sum
//   }

//   console.log(sum(1,2,3,6))
// }

// {
//   // ES6 可变参数 扩展运算符
//   function sum(...a) {
//     let sum = 0
//     a.forEach(i => {
//       sum += i
//     })
//     return sum
//   }
  
//   console.log(sum(1,2,3,6))
// }

{
  // ES5 合并数组
  var a = ['hello', true],
      b = a.concat([1,2])
  console.log(b)
}

{
  // ES6 扩展运算符 合并数组
  var a = ['hello', true],
      b = [...a, 1, 2]
  console.log(b)
}