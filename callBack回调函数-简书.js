/**
 * 
 * @param {*} msg 信息
 * @param {*} callback 回调函数
 */
// function doSomeThing (msg, callback) {
//   console.log(msg)
//   if (typeof callback === 'function') {
//     callback()
//   }
// }

// doSomeThing('回调函数', function () {
//   console.log('匿名函数实现回调')
// })

/**
 * @description 同步回调函数
 * @param {*} params string 格式的数组
 * @param {*} callback 同步回调函数
 */
// function getNodes (params, callback) {
//   var list = JSON.parse(params)
//   if (typeof callback === 'function') {
//     callback(list)
//   }
// }

// getNodes('[1,2,3]',function (nodes) {
//   for (let i of nodes) {
//     console.log(i)
//   }
// })

/**
 * @description 异步请求的回调函数
 * 仅做示例，不能直接运行
 */
// $.get('ajax/test.html', function (data) {
//  $('#box').html(data)
// })

/**
 * @description 点击事件回调函数
 * 仅做示例，不能直接运行
 */
// document.body.onclick = function() {
//   this.innerHTML = Date()
// }
// document.body.addEventListener('click', function () {
//   this.innerHTML = Date()
// }, false)

/**
 * 
 * @param {*} data 作为回调函数的参数使用
 */
// var data = []
// var a = 'gloable'
// function logStuff () {
//   Array.prototype.forEach.call(arguments, data => {
//     if (typeof data === 'string') console.log(data)
//     else if (typeof data === 'object') {
//       for (let i in data) {
//         if (typeof data[i] === 'object') logStuff(i, data[i])
//         else console.log(i + ' : ' + data[i])
//       }
//     }
//   })
// }
// function getInput (options, callback) {
//   data.push(options)
//   if (typeof callback === 'function') callback(a, options)
// }
// getInput({ name: 'chenglong', id: 1111 , array: [1,2] }, logStuff)

const doit = function(callback) {
  const a = 1,
        b = 2,
        c = 3
  var t = callback(a,b,c)
  return t + 10
}

const d = doit(function (x,y,z) {
  return x + y + z
})

console.log(d)