/**
 * 函数柯里化
 */
function curry(fn){
  arg = Array.prototype.slice.call(arguments,1);
  return function(){
    var innerArgs = Array.prototype.slice.call(arguments);
    var finalArgs = arg.concat(innerArgs);
    return fn.apply(null, finalArgs);
  }
}

function add(n,m){
  if(typeof n !== "number" || n.toString() === 'NaN' || typeof m !== "number" || m.toString() === 'NaN'){ console.error('参数不是有效Number',n,m);return;}
  return n+m;
}
var curriedAdd = curry(add, 5);  // 传递一个参数
curriedAdd(3); // 8

var add2 = curry(add); // 不传递参数
add2(10) // NaN
add2(10,10) // 20

var add3= curry(add, 10,1) // 传递进两个参数
add3()

/**
 * 函数柯里化 和 绑定函数
 */
function bind(fn,context){
  var arg = Array.prototype.slice.call(arguments, 2);
  return function(){
    var innerArgs = Array.prototype.slice.call(arguments);
    var finalArgs = arg.concat(innerArgs);
    return fn.apply(context, finalArgs);
  }
}

handler = {
  msg: '点击 回调',
  handleClick: function (name,event) {
    console.log(this.msg,name,event)
  }
}

document.body.addEventListener('click', bind(handler.handleClick, handler, 'body'))

/**
 * 函数柯里化 和 绑定函数 原生bind
 */
handler = {
  msg: '点击 回调',
  handleClick: function (name,event) {
    console.log(this.msg,name,event)
  }
}

document.body.addEventListener('click', handler.handleClick.bind(handler,'body'))