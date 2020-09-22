document.write('1');
document.body.innerHTML = 
  '<h2>这是第<b id="pageNum">0</b>页<h2>'+
  '<div id="content">页面消息</div>'+
  '<button id="prePage">上一页</button>'+
  '<button id="nextPage">下一页</button>';
/** =====24.3-新闻缓存器 =================== */
// 
var Page = function(){
  //
  var cache = {};
  /**
   * 
   */
  return function(page, fn){
    //
    if(cache[page]){
      //
      showPage(page, cache[page]);
      //
      fn && fn();
    }else{
      // 请求数据，假如成功
      var data={msg: '消息'};
      showPage(page, data);
    }
  }
}();

// 获取id 和 当前页
var g=function(id){ return document.getElementById(id);};
var currentPage = window.currentPage || 0;

// 页面显示数据
var showPage=function(page, data){
  var pageNum = g('pageNum'),
      content = g('content');
  pageNum.innerHTML = currentPage = page;
  content.innerHTML = '第 '+currentPage+' 页面消息：' + data.msg;
}

// 下一页 添加事件
g('nextPage').addEventListener('click', function(){
  Page(currentPage+1, function(){console.log('***** 点击了下一页')})
  if(currentPage === 1){g('prePage').setAttribute('disabled', 'disabled')}
})
// 上一页 添加事件
g('prePage').addEventListener('click', function(){
  currentPage -= 1;
  if(currentPage < 0){ currentPage = 0; return; }
  else if(currentPage = 0){g('prePage').setAttribute('disabled', 'disabled')}
  Page(currentPage, function(){console.log('***** 点击了下一页');})
})