/** ===== $ 简化引用 ========= */
var $ = function(){};
$.isNumber = function(value){
  return typeof value === 'number' && isFinite(value);
};
$.isArray = function(value){
  return Object.prototype.toString.call(value) === '[object Array]';
};
$.create = function(tagName, obj){
  var dom = document.createElement(tagName);
  for(var key in obj){
    dom.setAttribute(key, obj[key]);
  }
  return dom;
}
$.formateString = function(str, data){
  return str.replace(/\{#(\w+)#\}/g, function(match, key){
    return (typeof data[key] === "undefined" || data[key] === null) ? '' : data[key];
  });
};
$.g=function(id){return document.getElementById(id);};
$.tag = function(tag, id){
  var dom = $.g(id) || document;
  var target = dom.getElementsByTagName(tag);
  return target.length === 0 ? false : target.length === 1 ? target[0] : target;
};
$.gc = function(className, id){
  var dom = $.g(id) || document;
  var target = dom.getElementsByClassName(className);
  return target.length === 0 ? false : target.length === 1 ? target[0] : target;
};
$.siblings = function(dom){
  var arr = $.slice(dom.parentNode.children);
  for(var i=0,len=arr.length;i<len;i++){
    if(dom === arr[i]){
      arr.splice(i, 1);
      break;
    }
  }
  return arr;
}
$.slice = function(arr){
  var args = Array.prototype.slice.call(arguments, 1)
  return Array.prototype.slice.apply(arr, args)
};
$.on=function(doms, type, fn){
  if(!doms){return;}
  // 是不是数组形式
  if(!doms.length){ doms = [doms]; }
  doms = $.slice(doms); // 转化为数组
  for(var i=0,len=doms.length;i<len;i++){
    // 闭包让 this 指向dom
    (function(i){
      doms[i] && doms[i].addEventListener(type, function(e){
        fn.call(doms[i], e);
      }, false);
    })(i);
  }
};
$.hasClass = function(dom, className){
  return !!~dom.className.indexOf(className);
};
$.addClass= function(dom, className){
  if(!$.hasClass(dom, className)){
    if(dom.className === ''){
      dom.className = className;
    }else{
      dom.className += ' ' + className;
    }
  }
};
$.removeClass= function(dom, className){
    dom.className = dom.className.replace(className, '').replace(/\s+/g, ' ');
};
//  extend是JS-27-链式模式方法
$.extend = function(){
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
};
// 迭代器- 依赖 extend
$.throttle = function(){
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
    var p = $.extend({
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
};
/** =====38.2- MVC ========= */
// 魏建华页面操作逻辑，这里引用链模式中实现的A框架，具体方法参考附录A
// 页面加载后创建MVC对象
window.onload = function(){
  // 初始化MVC对象
  var MVC = MVC || {};
  // 初始化MVC数据模型层
  MVC.module = function(){
    // 内部数据对象
    var M = {};
    // 服务器端获取的数据，通常通过ajax获取并存储，后面的案例为简化实现，直接作为同步数据
    // 卸载页面中，减少服务器端异步请求操作
    M.data = {
      // 左侧侧边栏导航服务器端请求得到的相应数据
      slideBar: [
        {text: '萌妹子', icon: 'left_meng.png', title: '萌妹子_title', content: '萌妹子_content', img: 'left_meng_img.gif', href: 'http://moe.hao123.com'},
        {text: '动漫', icon: 'left_comic.png', title: '动漫_title', content: '动漫_content', img: 'left_comic_img.jpg', href: 'http://v.hao123.com/dongman'},
        {text: 'lol直播', icon: 'left_lol.png', title: 'lol直播_title', content: 'lol直播_content', img: 'left_lol_img.jpg', href: 'http://www.hao123.com/video/lol'},
        {text: '网络剧', icon: 'left_tv.png', title: '网络剧_title', content: '网络剧_content', img: 'left_tv_img.png', href: 'http://www.hao123.com/video/yuanchuang'},
        {text: 'QQ音乐', icon: 'left_tie.png', title: 'QQ音乐_title', content: 'QQ音乐_content', img: 'left_tie_img.png', href: 'https://y.qq.com/'}
      ]
    };
    // 配置数据，页面加载时 即提供
    M.conf = {
      // 侧边导航动画配置数据
      slideBarCloseAnimate: false
    };
    // 返回数据模型层对象操作方法
    return {
      // 获取服务器端数据
      getData: function(m){
        // 根据数据字段获取数据
        return M.data[m];
      },
      // 获取配置数据
      getConf: function(c){
        // 根据配置数据字段获取配置数据
        return M.conf[c];
      },
      // 设置服务器端数据（通常将服务器端异步获取到的数据，更新该数据）
      setData: function(m, v){
        // 设置数据字段m对应的数据
        M.data[m] = v;
        return this;
      },
      // 设置配置数据（通常在页面中执行某些操作，为做记录 而更新配置数据）
      setConf: function(c, v){
        // 设置配置字段c对应的配置数据v
        M.conf[c] = v;
        return this;
      }
    }
  }();
  // 初始化MVC视图层
  MVC.view = function(){
    // 模型数据层对象操作方法引用
    var M = MVC.module;
    // 内部视图创建方法对象
    var V = {
      // 创建侧边导航模块视图
      createSlideBar: function(){
            // 导航图标内容
        var html = '',
            // 视图渲染数据
            data = M.getData('slideBar');
        // 屏蔽无效数据
        if(!data || !data.length){
          return;
        }
        // 创建视图容器（参考附录A中，A框架中创建元素方法create）
        var dom = $.create('div', {class: 'slideBar', id: 'slideBar'});
        // 视图容器模板
        var tpl = {
          container: [
            '<div class="slidebar-inner"><ul>{#content#}</ul></div>',
            '<a hidefocus href="javascript:void(0)" class="clidebar-close is-close" title="收起" />',
          ].join(''),
          // 导航图标模块模板
          item: [
            '<li>',
              '<a class="icon" href="{#href#}">',
                '<img src="common/img/{#icon#}">',
                '<span>{#text#}</span>',
              '</a>',
              '<div class="box">',
                '<div>',
                  '<a class="title" href="{#href#}">{#title#}</a>',
                  '<a href="{#href#}">{#content#}</a>',
                '</div>',
                '<a class="image" href="{#href#}"><img src="common/img/{#img#}"></a>',
              '</div>',
            '</li>'
          ].join('')
        };
        // 渲染全部导航图片模块
        for(var i=0,len=data.length;i<len;i++){
          html += $.formateString(tpl.item, data[i]);
        }
        
        // 在页面中创建侧边导航视图
        // 渲染导航视图（content为导航图片内容）
        dom.innerHTML = $.formateString(tpl.container, {content: html});
        // 将侧边导航模块容器插入页面中
        document.body.appendChild(dom);
      }
    };
    // 获取视图接口的方法
    return function(v){
      // 根据视图名称 返回视图（由于获取的是一个方法，这里需要将该方法执行一遍一获取相应视图）
      V[v]();
    }
  }();
  // 初始化MVC控制器层
  MVC.ctrl = function(){
    // 模型数据层对象操作方法引用
    var M = MVC.module;
    // 视图层对象操作方法引用
    var V = MVC.view;
    // 控制器创建方法对象
    var C = {
      initSlideBar: function(){
        // 渲染导航栏模块视图
        V('createSlideBar');
        // 为每一个导航图标添加鼠标滑过和离开交互事件
        var lis = $.tag('li', 'slidebar');
        // 添加 鼠标移入 显示导航浮层
        function lis_show(e){
          var target = this;
          // 兄弟元素
          var siblings = $.siblings(target);
          // 兄弟元素全部影藏
          for(var i=0,len=siblings.length;i<len;i++){
            $.removeClass(siblings[i], 'show');
          }
          $.addClass(target, 'show');
        }
        $.on(lis, 'mouseover', function(e){
          var _this = this;
          $.throttle(lis_show, {context: _this, time: 100, args: [e] });
        })
        // 添加 鼠标移出 隐藏导航浮层
        function lis_hide(e){
          var target = this;
          $.removeClass(target, 'show');
        }
        $.on(lis, 'mouseout', function(e){
          var _this = this;
          $.throttle(lis_hide, {context: _this, time: 100, args: [e] });
        })
        // 箭头 动画交互
        var clidebarClose = $.gc('clidebar-close', 'clidebar');
        // 点击箭头 事件
        $.on(clidebarClose, 'click', function(e){
          e.prevenDefault;
          var target = clidebarClose;
          // 如果正在执行动画
          if(M.getConf('slideBarCloseAnimate')){
            // 终止操作
            return false;
          }
          // 设置侧边导航模块动画配置数据开关为打开状态
          M.setConf('slideBarCloseAnimate', true);
          // 获取操作dom对象
          var slidebarInner = $.gc('slidebar-inner', 'slidebar');
          // 如果箭头元素 是关闭状态(含有is-close类)
          if($.hasClass(target, 'is-close')){
            // 隐藏起来
            slidebarInner.style.left = '-60px';
            $.removeClass(target, 'is-close');
          // 如果箭头元素 是打打开状态(删除is-close类)
          }else{
            // 
            slidebarInner.style.left = '0';
            $.addClass(target, 'is-close');
          }
          // 设置动画状态为结束状态
          M.setConf('slideBarCloseAnimate', false);
        })
           
      }
    };
    // 遍历C中的每一个方法并执行
    for(var i in C){
      // 如果模块方法存在则执行
      C[i] && C[i]();
    }
  }();
};

/** =====38.3- 数据层 ========= */
// 提供 M.data M.conf 私有变量，并提供4个接口作为 获取或者修改

/** =====38.4- 视图层 ========= */
// 提供 V 私有变量，M的操作方法引用，并提供接口 外部获取视图创建方法

/** =====38.5- 控制层 ========= */
// 提供 V的操作方法引用，M的操作方法引用，和 控制器创建方法对象

/** =====38.7- 侧边导航栏 ========= */
// 1. 导航模块的数据； 2. 箭头的显示隐藏效果 配置数据； 3. 
// M.data= {} M.conf = {}

/** =====38.8- 侧边导航栏视图层 ========= */
// 1. 模块容器模板； 2. 导航图标模块模板
// 模板渲染引擎formateString () 
// V = {}

/** =====38.9- 侧边导航栏视图层 ========= */
// 1. 模块容器模板； 2. 导航图标模块模板
// 模板渲染引擎formateString () 
// V = {}