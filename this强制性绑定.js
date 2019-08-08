/**
 * Js this强制性绑定 的研究
 */

// var name = 'global'
// var oooo = {
//   name: 'ox4',
//   getNameFunc: function(){
//     var self = this // 绑定 this到变量 self上
//     return function(){
//       return console.log(self.name)
//     }
//   }
// }

// oooo.getNameFunc()()

var name = 'global'
var oo = {
  name: 'oo',
  getNameFunc: function(){
    return function(){
      return console.log(this.name)
    }
  }
}

oo.getNameFunc()()
oo.getNameFunc().bind(oo)()
