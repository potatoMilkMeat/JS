/**
 * 超时调用 setTimeout(func(), time)
 * 返回 数值ID，作为 setTimeout 唯一标识符
 */
setTimeout(function(){console.log('hi-func');}, 1000); // 2

var id= setTimeout(function(){console.log('hi-func');}, 4000); // undefined
console.log(id) // 3
clearTimeout(id) // undefined

/**
 * 间歇调用 setTimeout(func(), time)
 * 返回 数值ID，作为 setTimeout 唯一标识符
 */
setInterval(function(){console.log('setInterval-func');}, 5000) // 4

var X= setInterval(function(){console.log('setInterval 2-func');}, 3000); // undefined
console.log(X) // 5
clearTimeout(X) // undefined
clearInterval(x) // 与上一句语句效果一样

/**
 * 超时调用 setTimeout 模拟 间歇调用
 * 保证上一次执行完在调用此次
 */
var n=0,max=10;
function incrementNumber(){
  // 函数执行语句
  console.log(++n);
  console.log('函数执行: \n' + nxn(8999)) // 此句需要 3毫秒计算

  if(n<10){setTimeout(arguments.callee, 0);} // 重新插入到时间队列需要 1-4毫秒
  else console.log('func is done.'); // 此句是低于 毫秒级的
}

setTimeout(incrementNumber, 20);

function nxn(n){
  if(n<=1) return n;
  else return arguments.callee(n-1)+n;
}

/**
 * 超时调用 setTimeout 模拟 60帧刷新
 * 语句在17毫秒执行完
 */
var n=0;
var windowHeight=100,windowWidth=100;
var divStyles={
  width: '50px', height: '50px',background: 'green',position:'absolute', top: 0, left:0
}

// 执行动画 windowHeight windowWidth
function doAnimation(obj){
  if(typeof obj !=='object') var obj=div;
  let n=1;
  let top = Number(obj.style.top.substr(0,obj.style.top.length-2)),left= Number(obj.style.left.substr(0,obj.style.left.length-2));
  if(left<=windowWidth){ obj.style['left']= (left + n)+'px';}
  else if(top<=windowHeight){ obj.style['top']= (top + n*10)+'px'; obj.style['left']='0px'; }
  else {obj.style['left']='0px';obj.style['top']='0px';}
}

// 间歇回调
function animate(func,frameNumber,max){
  var _animate=arguments.callee;
  console.log('frame: \t'+(++n));
  // console.log(typeof func, func);
  func();

  if(n<max){setTimeout(function(){
    _animate(func,frameNumber,max)
  }, Math.floor(1000/frameNumber)-2);} // 重新插入到时间队列需要 1-4毫秒
  else console.log('func is done.'); // 此句是低于 毫秒级的
}

// 创建div元素
function creatDiv(){
  div=document.createElement('div');
  div.setAttribute('id','id001');
  // console.log( '设置styles样式' ,setStyles(div, divStyles));
  setStyles(div, divStyles);
  document.body.innerHTML='';
  document.body.appendChild(div);
}

// 设置style属性
function setStyles(obj,styles){
  var keys;
  if(typeof styles ==='object'){
    keys=Object.keys(styles);
    keys.forEach(function(item,index){
      // console.log('forEach \t' ,item, index)
      obj.style[item]=styles[item]
    })
    return true;
  }else return false;
}


/**
 * 执行命令
 */
creatDiv()
setTimeout(function(){
  animate(doAnimation, 60, 1000)
}, 1000)
