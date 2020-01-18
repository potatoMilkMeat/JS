
/**
 * github 上requestAnimationFrame的降级写法
 * https://github.com/darius/requestAnimationFrame
 * 
 * 没有本地提供这些功能的旧系统上也能正常工作
 * 2013年9月16日 经过使用
 */
if (!Date.now)
    Date.now = function() { return new Date().getTime(); };

(function() {
    'use strict';
    
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                   || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());

/**
 * 书本中的兼容写法
 * =================================================================================
 */
document.write('<div id="div" style="position: absolute;left: 0;top: 0;background: green;width: 60px;height: 60px;color: #fff;">11</div>')
var div=document.getElementById('div'),n=0;
function animationActive(){
  if((n+=10) < 999){
    div.style.left = n.toString()+'px';
    return true;
  }else {return false;}
}

(function(){
  function draw(timestamp){

    // 计算两次重绘的时间间隔
    var drawStart = (timestamp || Date.now()),
        diff = drawStart - timestamp;
    // 使用diff确定下一次的绘制时间
    var status = animationActive(); // status 布尔值，确定是否继续执行

    // startTime 重写为这一次地绘制时间
    startTime = drawStart;

    // 重绘 UI
    if(status){
      requestAnimationFrame(draw);
    }
    
  }

  var requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.msRequestAnimationFrame,
      startTime = window.mozAnimationStartTime || Date.now();
  
  requestAnimationFrame(draw);
})()

/**
 * requestAnimationFrame
 * 最简单的例子
 * =================================================================================
 */
// 动画 流畅的 html5 支持
document.write('<div id="div" style="position: absolute;left: 0;top: 0;background: green;width: 60px;height: 60px;color: #fff;">11</div>')
var div=document.getElementById('div'),n=0;

function leftAdd(timestamp){
  // 重绘 UI
  if(n++<1000){
    div.style.left = n.toString()+'px';
    requestAnimationFrame(leftAdd);
  }
}

requestAnimationFrame(leftAdd);
// 在执行一次
n= 0;
requestAnimationFrame(leftAdd);


/**
 * 现在的写法，看出只有执行代码缩减到16.7ms内，才能不出现卡顿现象
 * =================================================================================
 */
document.write('<div id="div" style="position: absolute;left: 0;top: 0;background: green;width: 60px;height: 60px;color: #fff;">11</div>')
var div=document.getElementById('div'),n=0,a;

// 花费时间
function creatArray(){
  var m=1000000;
  a=[];
  for(let i=0;i<m;i++){
    a.push('data:'+ i.toString())
  }
}

// 具体动画
function animationActive(){
  creatArray();

  if((n+=50) < 999){
    div.style.left = n.toString()+'px';
    return true;
  }else {return false;}
}

// 执行
(function(){
  function draw(timestamp){

    // 计算两次重绘的时间间隔
    var drawStatus = Date.now();

    // status 布尔值，确定是否继续执行
    var status = animationActive(),
        drawEnd = Date.now();
    console.log('timestamp,start,duff ',timestamp,drawStatus,drawEnd)
    
    // 重绘 UI
    if(status){
      requestAnimationFrame(draw);
    }
    
  }

  var requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.msRequestAnimationFrame;
  
  requestAnimationFrame(draw);
})()