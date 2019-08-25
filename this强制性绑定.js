/**
 * Js this强制性绑定 的研究
 * return 出的匿名函数，默认指向的是全局
 * 可以通过bind(obj),将this指向给obj { name： 'oo' }
 */

var name = 'global'
var oo = {
  name: 'oo',
  getNameFunc: function(){
    return function(){
      return console.log(this.name)
    }
  }
}

oo.getNameFunc()() // global
oo.getNameFunc().bind(oo)() // oo

 /**
  * 将this赋值给变量self，通过闭包-Closure  指向 给return的匿名函数
  */
//  var name = 'global'
//  var oooo = {
//    name: 'ox4',
//    getNameFunc: function(){
//      var self = this // 绑定 this到变量 self上
//      return function(){
//        return console.log(self.name)
//      }
//    }
//  }
 
//  oooo.getNameFunc()() // ox4