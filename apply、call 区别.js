/**
 * apply、call
 * 在 javascript 中，call 和 apply 都是为了改变某个函数运行时的上下文（context）而存在的，
 * 换句话说，就是为了改变函数体内部 this 的指向。
 * JavaScript 的一大特点是，函数存在「定义时上下文」和「运行时上下文」以及「上下文是可以改变的」这样的概念。
 */
// function fruits() {}
// fruits.prototype={
//   color: 'red',
//   say: function (){
//     console.log('color is '+this.color)
//   }
// }
// const apple = new fruits
// // apple.say() //color is red

// // 所以，可以看出 call 和 apply 是为了动态改变 this 而出现的，当一个 object 没有某个方法（本栗子中banana没有say方法），
// // 但是其他的有（本栗子中apple有say方法），我们可以借助call或apply用其它对象的方法来操作。
// const banana = { color: 'yelow' }
// apple.say.call(banana) // color is yelow
// apple.say.apply(banana)  // color is yelow

/**
 * apply、call 区别
 * 对于 apply、call 二者而言，作用完全一样，只是接受参数的方式不太一样。
 * 其中 this 是你想指定的上下文，他可以是任何一个 JavaScript 对象(JavaScript 中一切皆对象)，
 * call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里。
 */
// const fun = function(...arg){
//   console.log(arg)
// }
// fun.call(null, 3,4)
// fun.apply(null, [1,2])

/**
 * apply、call实例
 * 数组之间追加
 */
// const a1 = [1,2,3,4,5],
//       a2 = [8,9,10]
// Array.prototype.push.apply(a1, a2)
// console.log(a1) // [1, 2, 3, 4, 5, 8, 9, 10]

/**
 * apply、call实例
 * 获取数组中的最大值和最小值
 */
// const aa = [0, 1, 2, 3, 4, 5, 8, 9, 10],
//       aaMax = Math.max.apply(Math, aa),
//       aaMin = Math.min.apply(Math, aa)
// console.log(aaMax, aaMin) // 10 0

/**
 * apply、call实例
 * 验证是否是数组（前提是toString()方法没有被重写过）
 * 验证是否是对象（前提是toString()方法没有被重写过）
 */

// const ab = [0, 1, 8, 10],
//       ac = {sdf:25},
//       abReturn = isArray(ab),
//       acReturn = isObject(ac)
// function isArray (obj) { return Object.prototype.toString.call(obj) === '[object Array]'; }
// function isObject (obj) { return Object.prototype.toString.call(obj) === '[object Object]'; }
// console.log(abReturn, acReturn)

/**
 * apply、call实例
 * 类（伪）数组使用数组方法
 * Javascript中存在一种名为伪数组的对象结构。
 * 比较特别的是 arguments 对象，还有像调用 getElementsByTagName , document.childNodes 之类的，它们返回NodeList对象都属于伪数组。
 * 不能应用 Array下的 push , pop 等方法。
 * 但是我们能通过 Array.prototype.slice.call 转换为真正的数组的带有 length 属性的对象，这样 domNodes 就可以应用 Array 下的所有方法了。
 */

// function msg() { return arguments }
// const msgVal = msg(1,8,10),
//       msgRes = Array.prototype.slice.call(msgVal)
// console.log(msgVal, msgRes) // Arguments(3) [1, 8, 10]   Array(3) [1, 8, 10]
// // msgVal.push(25) //  msgVal.push is not a function
// msgRes.push(65) // Array(4) [1, 8, 10, 65]

/**
 * apply、call面试题
 * 定义一个 log 方法，让它可以代理 console.log 方法，常见的解决方法是：
 * 注意这里传入多少个参数是不确定的，所以使用apply是最好的，方法如下：
 */

// function log() {
//   console.log.apply(console, arguments)
// }
// log(1,'sdf',589)

// 接下来的要求是给每一个 log 消息添加一个"(app)"的前辍，比如：
function log() {
  const arg = Array.prototype.slice.call(arguments)
  arg.unshift('(app)')
  console.log.apply(console, arg)
}
log(1,'sdf',589)