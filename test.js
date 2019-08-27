/**
 * call（）与apply（）的作用与区别
 * 每个函数都包含两个非继承而来的方法：apply()和call()。
 * call与apply都属于Function.prototype的一个方法，所以每个function实例都有call、apply属性；
 * call（）方法和apply（）方法的作用相同：改变this指向。
 * call（）：第一个参数是this值没有变化，变化的是其余参数都直接传递给函数。在使用call（）方法时，传递给函数的参数必须逐个列举出来。
 * apply（）：传递给函数的是参数数组
 */
// function add(c, d){
//   console.log(this.a , this.b , c , d, (this.a + this.b + c + d))
//   return this.a + this.b + c + d
// }
// var o = {a:1, b:3}
// add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16
// add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34

// ===========================================================

const val = 'globle',
      a = {
  val: 'value-a',
  fun: function (that){
    (function(){
      console.log('a 的立即执行',that.val)
    // })() // a 的立即执行 undefined
    // }).bind(this)() // a 的立即执行 value-a     等同于  }).bind(a)()
    }).call(null, a) // a 的立即执行 value-a     等同于  }).call(a)
    
  }
}

a.fun()
