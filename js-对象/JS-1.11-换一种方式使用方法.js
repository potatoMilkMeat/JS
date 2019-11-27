/* 第一章 灵活的语言——JavaScript
*  1.11换一种方式使用方法
*    ⑴ 给 fn() 的原型类 添加 addMethod
*    ⑵ 验证邮箱，验证姓名
*    ⑶ 变量名和函数遵循驼峰写法，变量名首字母为小写（小驼峰），函数名首字母为大写（大驼峰）
*/
Function.prototype.addMethod = function (name, fn) {
  this.prototype[name] = fn
  return this
}

// 第一种 开始  全局声明 fn(), 调用是用window来用
var CheckName = function (name) {
  console.log(name)
  return this
}
var CheckEmail = function (email) {
  console.log(email)
  return this
}
CheckEmail('window-email').CheckName('this-name') // 写全指向，应该为this.CheckEmail() 或者 window.CheckName()
// Print:chenglong-email /n chenglong-name  表明全局的CheckEmail 和 CheckName是有效的函数

// var Methods = function () {}
// Methods.addMethod('CheckName', window.CheckName).addMethod('CheckEmail', window.CheckEmail)
// var m = new Methods()
// m.CheckEmail('chenglong-email').CheckName('chenglong-name')
// // console.log(typeof m.CheckEmail) // 指明m.CheckEmail就是一个Function类型
// console.log('第一种 结束')// 第一种 结束

// console.log('第二种 开始')// 第二种 开始
// // 第二种  全局声明 fn(), 调用是用window来用
// var Methods = function () {}
// Methods.prototype = {
//   CheckName: function (name) {
//     console.log(name)
//     return this
//   },
//   CheckEmail: function (email) {
//     console.log(email)
//     return this
//   }
// }

// Methods.addMethod('CheckName', CheckName).addMethod('CheckEmail', CheckEmail)
// var m = new Methods()
// m.CheckEmail('prototype-email').CheckName('prototype-name')
// // 第二种 结束