window.log = (...arg) => {
  console.log(...arg)
}


log(undefined == null) // true

// 数字和字符串先转换成数字再比较
log(1 == '1') // true
log(1 === Number('1')) // true

// 布尔值 与任何类型  布尔值先转换成数字再比较
log(true == '1') // true
log(Number(true) === Number('1')) // true

// 对象先调用 valueOf或者toString 直到返回 字面量
// 然后按照 字面量比较
var obj = { valueOf () { return 1 } }
var obj2 = { toString () { return '1' } }
var obj3 = { toString () { return undefined } }
log(obj == obj2) // false
log(obj == 1) // true
log(obj2 == '1') // true
