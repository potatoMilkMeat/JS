document.write('1');
document.body.innerHTML = '<div id="article"><p>第一段文字</p></div>';
var g=function(id){return document.getElementById(id);}
/** =====28.3-预言未来=================== */
var article = g('article');
article.onclick = function(e){
  var e= e || window.event,
      tar = e.target || e.srcElement;
  if(tar.nodeName.toLowerCase() === 'p'){
    tar.innerHTML = '我要更改这段内容！';
  }
}

var p = document.createElement('p');
p.innerHTML = '新增一段内容';
article.appendChild(p);

/** =====28.4-内存外泄 =================== */
document.body.innerHTML += '<div id="btn_container"><button id="btn">demo</button></div>';
// g('btn').onclick = function(){
//   g('btn_container').innerHTML = '触发了事件';
// }
// 上面的出现内存泄漏
// 老版本的IE浏览器 因使用  引用计数式垃圾回收机制
// g('btn').onclick 引用会一直存在，直到关闭浏览器

g('btn_container').onclick = function(e){
  // 获取触发事件元素
  var target = e&& e.target || window.event.srcElement;
  // 判断触发事件元素是否为id 为 btn的元素
  if(target.id === 'btn'){
    // 重置父元素内容
    g('btn_container').innerHTML = '触发了事件';
  }
}

/** =====28.5-数据分发 =================== */
// 通常请求数据，按模块多次请求
$.get("./deal.php?q=banner", function(res){/* 处理banner 模块逻辑 */})
$.get("./deal.php?q=aside", function(res){/* 处理aside 模块逻辑 */})
$.get("./deal.php?q=article", function(res){/* 处理article 模块逻辑 */})
$.get("./deal.php?q=member", function(res){/* 处理member 模块逻辑 */})
$.get("./deal.php?q=message", function(res){/* 处理message 模块逻辑 */})

// 将请求打包，委托以另外一个对象发送，当得到相应数据时在通过委托对象拆包数据分发给各个模块
var Deal = {
  banner: function(res){/* 处理banner 模块逻辑 */},
  aside: function(res){/* 处理aside 模块逻辑 */},
  article: function(res){/* 处理article 模块逻辑 */},
  member: function(res){/* 处理member 模块逻辑 */},
  message: function(res){/* 处理message 模块逻辑 */}
}

$.get('./deal.php?', function(res){
  // 数据拆包分发
  for(var i in res){
    Deal[i] && Deal[i](res[i]);
  }
})