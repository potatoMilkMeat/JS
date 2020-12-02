document.write('1');
document.body.innerHTML = 
  '<h2>这是第<b id="pageNum">1</b>页<h2>'+
  '<div id="content">页面消息</div>'+
  '<button id="prePage" disabled="disabled">上一页</button>'+
  '<button id="nextPage">下一页</button>';
/** =====24.3-新闻缓存器 =================== */
// 
var Page = function(){
  // 缓存对象
  var cache = {};
  /**
   * 返回函数
   * 参数 page 页数
   * 参数 fn 回调函数
   */
  return function(page, fn){
    // 如果有缓存
    if(cache[page]){
      // 直接显示
      showPage(page, cache[page]);
      // 执行回调函数
      fn && fn();
    }else{
      // 请求数据，假如成功
      var data={msg: '消息'};
      cache[page] = data;
      showPage(page, data);
      fn && fn();
    }
  }
}();

// 获取id 和 当前页
var g=function(id){ return document.getElementById(id);};
var currentPage = window.currentPage || 1;

// 页面显示数据
var showPage=function(page, data){
  var pageNum = g('pageNum'),
      content = g('content');
  pageNum.innerHTML = currentPage = page;
  content.innerHTML = '第 '+currentPage+' 页面消息：' + data.msg;
}

// 下一页 添加事件
g('nextPage').addEventListener('click', function(){
  Page(currentPage+1, function(){console.log('***** 点击了下一页');if(currentPage>1){g('prePage').removeAttribute('disabled');}})
})
// 上一页 添加事件
g('prePage').addEventListener('click', function(){
  if(currentPage === 1){return;}
  Page(currentPage-1, function(){console.log('***** 点击了下一页');if(currentPage === 1){g('prePage').setAttribute('disabled', 'disabled');}})
})

showPage(currentPage, {msg: '默认的第一个信息'});