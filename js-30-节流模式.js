document.write('1');
var html = '<div id="article">';
for(var i=0;i<24;){
  html += '<h1>第'+ (++i) +'段文字</h1>';
}
html+='</div><button id="back" style="position: absolute;right: 8px;top:300px;z-index:100;">返回顶部</button>';
document.body.innerHTML = html;
var g=function(id){return document.getElementById(id);}
//  extend是JS-27-链式模式方法
function extend(){
  // 拓展对象从第二个参数开始
  var i=1,
      // 获取参数长度
      len = arguments.length,
      // 第一个参数为源对象
      target = arguments[0],
      // 拓展对象中属性
      j;
  // 如果只有一个参数
  if(i==len){
    // 源对象为当前对象
    target = this;
    // i从0计数
    i--;
  }
  // 遍历参数中拓展对象
  for(;i<len;i++){
    // 遍历拓展对象中的属性
    for(j in arguments[i]){
      // 拓展源对象
      target[j] = arguments[i][j];
    }
  }
  // 返回源对象
  return target;
}
/** =====30.2-节流器========= */
var throttle = function(){
  // 获取第一个参数
  var isClear = arguments[0], fn;
  // 如果第一个参数是 true, 表明是否清除计时器
  if(typeof isClear === 'boolean'){
    // 第二个参数是函数
    fn = arguments[1];
    // 函数的计时器句柄存在，则清除该计时器
    fn.__throttleID && clearTimeout(fn.__throttleID);
  // 通过计时器延迟函数的执行
  }else{
    // 第一个参数是函数
    fn = isClear;
    // 第二个参数为函数执行时的参数
    param = arguments[1];
    // 对执行时的参数适配默认值，这里用到了 以前的extend方法
    var p = extend({
      context: null,  // 作用域
      args: [],       // 相关参数
      time: 300       // 延迟执行的时间
    }, param);
    // 清除执行函数计时器句柄
    arguments.callee(true, fn);
    // 为函数绑定计时器句柄，延迟执行函数
    fn.__throttleID = setTimeout(function(){
      // 执行函数
      fn.apply(p.context, p.args)
    }, p.time)
  }
}

// 获取页面的高度给 HH
var HH= document.body.clientHeight;
g('back').style.top = (HH - 50)+'px';
// 返回顶部按钮的位置
function moveScroll(){
  var scrollTop = document.body.scrollTop;
  g('back').style.top = (scrollTop + HH - 50)+'px';
  console.log(arguments[0]);
}
// 监听页面滚动事件
window.addEventListener('scroll', function(){
  throttle(moveScroll, {context: null, time: 200, args: ['chenglong'] });
})

/** =====30.3-优化浮层========= */
document.body.innerHTML = '<div id="icon" class="icon">'
    +'<ul class="icon">'
    +'  <li class="weixin">微信</li>'
    +'  <li class="weibo">微博</li>'
    +'</ul>'
    +'<div class="ewm">'
    +'  <img class="show" alt="微信" width="100px" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602738580543&di=51f6cc86ab68f4ce3b89ad129ddd3de2&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20130725%2F20130725151239-533862575.jpg">'
    +'  <img alt="微博" width="100px" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2225458401,2104443747&fm=26&gp=0.jpg">'
    +'  <span class="arrow"><em>aaaa</em></span>'
    +'</div>'
    +'</div>';
document.head.innerHTML +='<style>.ewm,.ewm img{display: none;}.ewm.show,.ewm.show .show{display: block;}</style>';

function g(id){return document.getElementById(id)}
function toggle(e){
  var target = e.target,
      type = e.type === 'mouseout' ? false : e.type === 'mouseenter' ? true : null;

  // console.log(e.type, this.__show);
  g('icon').children[1].className = type === true? 'ewm show' : 'ewm';
  if(!type){return;}
  
  g('icon').children[1].children[0].className = target.className === 'weixin' ? 'show' : '';
  g('icon').children[1].children[1].className = target.className === 'weibo' ? 'show' : '';

}   

var lis = g('icon').children[0].children;
for(var i =0, len = lis.length;i<len;i++){
  lis[i].addEventListener('mouseenter', toggle);
  lis[i].addEventListener('mouseout', toggle);
}