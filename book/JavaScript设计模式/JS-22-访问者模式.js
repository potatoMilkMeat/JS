document.write('1');
document.body.innerHTML = '<div id="demo" style="height: 40px;width:100px;border:1px solid #ddd;"></div>';
/** ========= 22.1 访问者模式 - 兼容 IE =============  */
// var bingEvent = function(dom, type, fn){
//   if(dom.addEventListener){
//     dom.addEventListener(type, fn, false);
//   }else if(dom.attachEvent){
//     dom.attachEvent('on'+type, fn);
//   }else{
//     dom['on'+type] = fn;
//   }
// }

// var demo = document.getElementById('demo');
// bingEvent(demo, 'click', function(){
//   console.log(this);
//   this.style.background = 'red';
// })
// 以下在低版本IE8及以下 this指向 window,导致 window.style.backgroud  报错
// 其他浏览器都正常

/** ========= 22.3 访问者模式 - 兼容 IE =============  */
/**
 * == 改进版 ==
 * 运行时返回执行方法，减少if判定次数
 * 正常访问操作元素
 * 传递数据
 * else{ ... }内容可以忽略，因ie5-8均支持 document.attachEvent
 */  
var bingEvent = (function(){
  if(document.addEventListener){
    return function(dom, type, fn, data){dom.addEventListener(type, function(e){
      fn.call(dom, e, data);
    }, false);}
  } else if(document.attachEvent){
    return function(dom, type, fn, data){dom.attachEvent('on'+type, function(e){
      fn.call(dom, e, data);
    });}
  }else{
    return function(dom, type, fn, data){dom['on'+type] = function(e){
      fn.call(dom, e, data);
    };}
  }
})();

var demo = document.getElementById('demo');
bingEvent(demo, 'click', function(e, data){
  this.style.background = 'red';
  this.innerHTML = data;
},'test demo');

/** ========= 22.6 对象访问器 =============  */
// 访问器
var Visitor = (function(){
  return {
    // 截取方法
    splice: function(){
      // splice 方法的参数，从原参数的第二个开始算起，第一个为操作对象（上下文）。
      var args = Array.prototype.splice.call(arguments, 1);
      // 对一个一参数对象执行splice方法
      return Array.prototype.splice.apply(arguments[0], args);
    },
    // 追加数据方法
    push: function(){
      // 添加的数据从原参数的第二个参数算起
      var args = Array.prototype.splice.call(arguments, 1);
      // 对第一个参数执行push方法
      return Array.prototype.push.apply(arguments[0], args);
    },
    // 弹出最后一次添加的元素
    pop: function(){
      // 对第一个参数执行pop方法
      return Array.prototype.pop.apply(arguments[0]);
    },
    // 删除 index 对应项,支持纯数组和 多个参数模式
    delete(){
      var indexes = Object.prototype.toString.call(arguments[1]) === "[object Array]" ? arguments[1] : Array.prototype.splice.call(arguments, 1);
        // 排序，大 --> 小
        indexes.sort(function(a, b){return +b-a;});
        // 借助splice 执行删除操作
        for(var i=0, len = indexes.length;i<len;i++)
          this.splice(arguments[0], indexes[i], 1);
    }
  }
})();

/** ========= 22.7 操作类数组 =============  */
var a = {};
console.log(a);
Visitor.push(a, 0,1,2,3,4);
console.log(a, a.length);
Visitor.splice(a, 3,1, 'a','b','c');
console.log(a, a.length);
Visitor.pop(a);
console.log(a, a.length);

Visitor.delete(a, 1,2,5);
// 也支持string格式的数字
// Visitor.delete(a, '1','2','5');
// 数组格式也支持
// Visitor.delete(a, [1,2,5]);
