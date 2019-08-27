/**
 * bind 用法
 */
// var altwrite = document.write
// // altwrite("hello") // Uncaught TypeError: Illegal invocation
// altwrite.bind(document)('hello') // 页面 写 helllo

/**
 * bind 绑定函数
 * bind()最简单的用法是创建一个函数，使这个函数不论怎么调用都有同样的this值。
 * 常见的错误就像上面的例子一样，将方法从对象中拿出来，然后调用，并且希望this指向原来的对象。
 * 如果不做特殊处理，一般会丢失原来的对象。使用bind()方法能够很漂亮的解决这个问题：
 */
this.aa = 9
const a = {
  aa: 81,
  getNum: function() {
    console.log(this.aa)
  }
}
a.getNum() // 81

const getNum = a.getNum
getNum() // 9 this指向 全局对象

const bindGetNum = getNum.bind(a)
bindGetNum() // 81
