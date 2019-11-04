/**
 * toString() 是任何类型都自带的方法
 * 不支持 null, undefined
 */
var num = 10

console.log(num.toString()) // 默认以10进制
console.log(num.toString(2)) // 以二进制转换，支持

console.log(  (-27/64).toString(2)  ) // 支持负小数

/**
 * String() 默认执行toString()
 * null 返回null
 * undefined 返回 undefined
 * 不支持进制转换
 */
console.log(String(undefined)) // "undefined"
console.log(String(null))      // 'null'
console.log(String(10))        // '10'
console.log(String(10, 2))     // '10' 不支持
