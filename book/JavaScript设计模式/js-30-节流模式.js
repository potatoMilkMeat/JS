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

/** =====30.5-添加节流器 - 程序框架 ========= */
// 绑定交互事件
var cl_30_5 = {
  bindEvent: function(){
    // 缓存当前对象
    var that = this;
    // 隐藏浮层
    function hideLayer(){
      that.layer.className = 'show';
    }
    // 显示浮层
    function showLayer(){
      that.layer.className = '';
    }
    // 鼠标光标移入事件
    that.on(that.container, 'mouseenter', function(){
      // 清除影藏浮层方法的计时器
      throttle(true, hideLayer);
      // 延迟显示浮层的方法
      throttle(showLayer);
    // 鼠标光标移出事件
    }).on(that.container, 'mouseleave', function(){
      // 延时隐藏浮层的方法
      throttle(hideLayer);
      // 清除显示浮层方法的计时器
      throttle(true, showLayer);
    });
    // 遍历icon绑定事件
    for(var i=0,len=that.lis.length;i<len;i++){
      // 自定义属性 index
      that.lis[i].index = i;
      // 为每个li元素绑定鼠标移入事件
      that.on(that.lis[i], 'mouseenter', function(){
        // 获取自定义属性index
        var index = this.index;
        // 排除所有img 的show类
        for(var i=0,len = that.imgs.length;i<len;i++){
          that.imgs[i].className='';
        }
        // 为目标图片添加show类
        that.imgs[index].className = 'show';
        // 从新定义浮层位置
        that.layer.style.left = -22+60*index+'px';
      })
    }
  }
}

/** =====30.7-延迟加载图片类 ========= */
/**
 * 节流延迟加载图片
 * @param {*} id 延迟加载图片的容器ID
 * 注：图片格式如下<img src="img/loading.gif" slt="" data-src="img/1.jpg">
 */
function LazyLoad(id){
  // 获取需要节流延迟加载图片的容器
  this.container = document.getElementById(id);
  // 缓存图片
  this.imgs = this.getImgs();
  // 执行逻辑
  this.init();
}
// 节流延迟加载图片类原型方法
LazyLoad.prototype = {
  // 起始执行逻辑
  init: function(){
    // 加载当前视图图片
    this.update();
    // 绑定事件
    this.bindEvent();
  },
  // 获取延迟加载图片 - 因ie的元素集合没有slice方法，故遍历创建新数组
  getImgs: function(){
    // 获取延迟加载图片
    var arr = [];
    // 获取图片
    var imgs = this.container.getElementsByTagName('img');
    // 将获取的图片转化为数组（IE下通过Array.prototype.slice会报错）
    for(var i=0,len=imgs.length;i<len;i++){
      arr.push(imgs[i]);
    }
    return arr;
  },
  // 加载图片
  update: function(){
    // 如果图片都加载成功，返回
    if(!this.imgs.length){return;}
    // 获取图片长度
    var i = this.imgs.length;
    // 遍历图片
    for(--i;i>=0;i--){
      // 如果图片在可是范围内
      if(this.shouldShow(i)){
        // 加载图片
        this.imgs[i].scr = this.imgs[i].getAttribute('data-src');
        // 清除缓存中的此图片
        this.imgs.splice(i, 1);
      }
    }
  },
  // 判断图片是否在可是范围内
  shouldShow: function(i){
    // 获取当前图片
    var img = this.imgs[i],
        // 可视范围内顶部高度 （页面滚动条top值）
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
        // 可视范围内底部高度
        scrollBottom = scrollTop + document.documentElement.clientHeight,
        // 图片的顶部高度
        imgTop = this.pageY(img),
        // 图片的底部高度
        imgBottom = imgTop + img.offsetHeight;
    // 判断图片是否在可视范围内：图片底部高度 大于 可视顶部高度 并且 图片底部高度小于可视底部高度，
    // 或者 图片顶部高度 大于可视顶部高度 并且 图片顶部高度 小于 可视底部高度
    if(imgBottom > scrollTop && imgBottom < scrollBottom || (imgTop > scrollTop && imgTop < scrollBottom)){
      return true;
    }else{
      return false;
    }
  },
  // 获取页面中的纵坐标位置
  pageY: function(element){
    // 如果元素有父元素
    if(element.offsetParent){
      // 返回 元素+父元素高度
      return element.offsetTop + this.pageY(element.offsetParent);
    }else{
      // 返回 元素高度
      return element.offsetTop;
    }
  },
  // 绑定事件 （简化版）
  on: function(element, type, fn){
    if(element.addEventListener){
      element.addEventListener(type, fn, false);
    }else{
      element.attachEvent('on'+type, fn, false);
    }
  },
  // 为窗口绑定resize 事件予以scroll事件
  bindEvent: function(){
    var that = this;
    this.on(window, 'resize', function(){
      // 节流器处理图片逻辑
      throttle(that.update, {context: that});
    });
    this.on(window, 'scroll', function(){
      // 节流器处理图片逻辑
      throttle(that.update, {context: that});
    })
  }
}

// 大功告成
// 延迟加载container 容器内的图片
new LazyLoad('container');

/** =====30.7-延迟加载图片类 - 程序框架 ========= */
document.write('<div id="btn">按钮</div><div id="btn1">按钮1</div>');
function g(id){return document.getElementById(id);}
// 打包统计对象 - 带有私有变量的函数
var LogPack = function(){
  var data = [], // 请求缓存数组
      MaxNum = 10, // 请求缓存最大值
      itemSplitStr = '|', // 统计项统计参数间隔符
      keyValueSplitStr = '*', // 统计项统计参数键值对间隔符
      img = new Image(); // 请求触发器，通过图片src属性实现简单的get请求
  // 发送请求方法
  function sendLog(){
    // 请求参数
    var logStr = '',
        // 截取MaxNum 个统计项发送   splice / 截取:  返回截取的新数组, 原本的数组将减少
        fireData = data.splice(0, MaxNum);
    // 遍历统计项
    for(var i=0,len = fireData.length;i<len;i++){
      // 添加统计项顺序索引
      logStr += 'log'+i+'=';
      // 遍历统计项内的统计参数
      for(var j in fireData[i]){
        // 添加统计项参数键+间隔符+值
        logStr += j+keyValueSplitStr+ fireData[i][j];
        // 添加统计项统计参数间隔符
        logStr += itemSplitStr;
      }
      // & 拼接多个统计项
      logStr = logStr.replace(/\|$/, '') + '&';
    }
    // 添加统计项打包长度
    logStr += 'logLength=' + len;
    // 请求触发器发送统计
    img.src = 'a.gif?'+ logStr;
  }
  // 统计方法
  return function(param){
    // 如果无参数则发送统计
    if(!param){
      sendLog();return;
    }
    // 添加统计项
    data.push(param);
    // 如果统计项大于请求缓存最大值则发送统计请求包
    data.length >= MaxNum && sendLog();
  }
}();

// 点击统计
g('btn').onclick = function(){
  LogPack({
    btnId: this.id,
    context: this.innerHTML,
    type: 'click'
  });
};
// 鼠标移入统计
g('btn1').onmouseover = function(){
  LogPack({
    btnId: this.id,
    context: this.innerHTML,
    type: 'mouseover'
  });
};