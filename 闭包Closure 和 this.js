/**
 * Js Closure 闭包 和 this 的研究
 */

// var name = 'global'
// var o = {
//   name: 'o',
//   getName: function() {
//     return this.name
//   }
// }

// var o_name = o.getName()
// console.log(o_name, name)

var name = 'global'
var aa = {
  name: 'aa',
  getName: function() {
    console.log('外层this', this.name)
    return function() {
      console.log('内层this', this.name)
      return this.name
    }
  }
}

var aa_name = aa.getName()()  // 赋值是返回的 global ，此次是执行两次return,外层和内层。
                              //内层为全局的匿名函数  function() { console.log('内层this', this.name); return this.name }
console.log(aa_name)

var ooo = {
  name: 'ooo',
  getName: aa.getName() // 会立即执行一次(产生附带效果，console)，等同于 function() { console.log('内层this', this.name); return this.name }
}

var ooo_name = ooo.getName() // 赋值是返回的 ooo
console.log(ooo_name)