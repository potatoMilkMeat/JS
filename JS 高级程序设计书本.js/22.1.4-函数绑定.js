handler = {
  msg: '点击 回调',
  handleClick: function (event) {
    console.log(this.msg)
  }
}

document.body.addEventListener('click', handler.handleClick)
// 点击出现 // undefined

document.body.addEventListener('click', function(event){
  handler.handleClick(event)
})
// 点击出现 // 点击 回调


/**
 * 自定义bind事件 来指定上下文
 */
function bind(fn,context){
  return function(){
    return fn.apply(context,arguments)
  }
}

document.body.addEventListener('click', bind(handler.handleClick, handler))
// 点击出现 // 点击 回调

/**
 * 上面的内容可以缩减
 * 原生 bind
 */
document.body.addEventListener('click', handler.handleClick.bind(handler) )
// 点击出现 // 点击 回调