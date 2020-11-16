document.write('<div id="container"></div>');
/** =====32.3- 加载即执行 ========= */
// addEventListener iE 9 以后都支持
var A= A || {};
// 添加绑定事件方法
A.on = function(dom, type, fn){
  // 如果支持 addEventListener 方法
  if(document.addEventListener){
    return function(dom, type, fn){
      dom.addEventListener(type, fn, false);
    }
  // 如果支持 attachEvent 方法
  }else if(document.attachEvent){
    return function(dom, type, fn){
      dom.attachEvent('on'+type, fn);
    }
  // 定义 on 方法
  }else{
    return function(dom, type, fn){
      dom['on'+type] = fn;
    }
  }
}();

console.log(A.on);

/** =====32.4- 惰性执行 ========= */
var A= A || {};
// 添加绑定事件 方法 on
A.on = function(dom, type, fn){
  // 如果支持 addEventListener 方法
  if(document.addEventListener){
    A.on = function(dom, type, fn){
      dom.addEventListener(type, fn, false);
    }
  // 如果支持 attachEvent 方法
  }else if(document.attachEvent){
    A.on = function(dom, type, fn){
      dom.attachEvent('on'+type, fn);
    }
  // 如果支持 DOM0 级事件绑定
  }else{
    A.on = function(dom, type, fn){
      dom['on'+type] = fn;
    }
  }
  // 执行重定义 on 方法
  A.on(dom, type, fn);
};

function html_onclick(e){console.log('***** html 被点击', event, this)}
A.on(document.documentElement, 'click', html_onclick);
console.log(A.on);