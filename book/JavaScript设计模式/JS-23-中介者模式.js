document.write('1');
document.body.innerHTML = 
    '<h2>用户收藏导航模块</h2>'+
    '<ul id="collection_nav">'+
        '<li>百度 <b>12</b> <span>www.baidu.com</span></li>'+
        '<li>百度1 <b>25</b> <span>www.baidu.com</span></li>'+
        '<li>百度2 <b>7</b> <span>www.baidu.com</span></li>'+
    '</ul>'+
    '<h2>推荐用户导航</h2>'+
    '<ul id="recommend_nav">'+
        '<li>百度 <b>12</b></li>'+
        '<li>百度1 <b>25</b></li>'+
    '</ul>'+
    '<h2>最近常用导航</h2>'+
    '<ul id="recently_nav" style="padding-bottom: 100px;">'+
    '<li>百度 <span>www.baidu.com</span></li>'+
    '<li>百度1 <span>www.baidu.com</span></li>'+
    '</ul>'+
    '<label for="hide_num">取消提醒数字： <input name="hide_num" type="checkbox" id="hide_num" /></label>'+
    '<label for="hide_url">取消网址： <input name="hide_url" type="checkbox" id="hide_url" /></label>';
/** ========= 23.2 创建中介者模式 =============  */
// 中介者对象
var Mediator = function(){
  // 消息对象
  var _msg = {};
  return {
    /**
     * 订阅者消息方法
     * 参数 type  消息名称
     * 参数 action 消息回馈函数
     */
    rigister: function(type, action){
      // 如果该消息存在
      if(_msg[type])
        // 存入回调函数
        _msg[type].push(action);
      else{
        // 不存在则创建容器并存入回调函数
        _msg[type]=[action];
      }
    },
    /**
     * 发布消息的方法
     * 参数 type  消息名称
     */
    send: function(type, data){
      // 如果该消息已经被订阅
      if(_msg[type]){
        // 遍历已存储的消息回调函数
        for(var i=0,len=_msg[type].length;i<len;i++){
          // 执行该回调函数
          _msg[type][i] && _msg[type][i](data);
        }
      }
    }
  }
}();

/** ========= 23.3 单元测试 =============  */
// 订阅demo消息 执行回调函数--输出 first data.msg
Mediator.rigister('demo', function(data){
  console.log('first', data.msg);
})
// 订阅demo消息 执行回调函数--输出 second data.msg
Mediator.rigister('demo', function(data){
  console.log('second', data.msg);
})
// 发布demo消息
Mediator.send('demo', {msg: '注意，这是发布消息的内容'});

/** ========= 23.5 订阅消息 =============  */
/**
 * 显示导航组件
 * 参数 mod       模块
 * 参数 tag       处理的标签（消息提醒b, 网址span）
 * 参数 showOrHide 显示还是影藏
 */
var showHideNavWidget = function(mod, tag, showOrHide){
  // 获取导航模块
  var mod = document.getElementById(mod),
      // 获取下面的标签名为 tag 的元素
      tag = mod.getElementsByTagName(tag),
      // 如果设置为 false 或者为 hide 则值为hideen, 否则为 visible
      showOrHide = (!showOrHide || showOrHide === 'hide') ? 'hidden' : 'visible';
  // 站位影藏这些标签
  for(var i=tag.length-1;i>=0;i--){
    tag[i].style.visibility = showOrHide;
  }
};

// 用户收藏导航模块
(function(){
  // ... 其他交互逻辑
  // 订阅 隐藏用户收藏导航消息提醒消息
  Mediator.rigister('hideAllNavNum', function(){
    showHideNavWidget('collection_nav', 'b', false);
  });
  // 订阅 显示用户收藏导航消息提醒消息
  Mediator.rigister('showAllNavNum', function(){
    showHideNavWidget('collection_nav', 'b', true);
  });
  // 订阅 隐藏用户收藏导航网址消息
  Mediator.rigister('hideAllNavUrl', function(){
    showHideNavWidget('collection_nav', 'span', false);
  });
  // 订阅 显示用户收藏导航网址消息
  Mediator.rigister('showAllNavUrl', function(){
    showHideNavWidget('collection_nav', 'span', true);
  });
})();

// 推荐用户导航
(function(){
  Mediator.rigister('hideAllNavNum', function(){
    showHideNavWidget('recommend_nav', 'b', false);
  });
  Mediator.rigister('showAllNavNum', function(){
    showHideNavWidget('recommend_nav', 'b', true);
  });
})();

// 最近常用导航
(function(){
  Mediator.rigister('hideAllNavUrl', function(){
    showHideNavWidget('recently_nav', 'span', 'hide');
  });
  Mediator.rigister('showAllNavUrl', function(){
    showHideNavWidget('recently_nav', 'span', 'show');
  });
})();

/** ========= 23.6 发布消息 =============  */
// 设置层模块
(function(){
  // 消息提醒选框
  var hideNum = document.getElementById('hide_num'),
      // 网址选框
      hideUrl = document.getElementById('hide_url');
  // 消息提醒选框事件
  hideNum.onchange = function(){
    // 如果勾选
    if(hideNum.checked){
      // 中介者发布隐藏消息提醒功能消息
      Mediator.send('hideAllNavNum');
    }else{
      // 中介者发布显示消息提醒功能消息
      Mediator.send('showAllNavNum');
    }
  }
  // 网址选框事件
  hideUrl.onchange = function(){
    // 如果勾选
    if(hideUrl.checked){
      // 中介者发布隐藏所有网址功能消息
      Mediator.send('hideAllNavUrl');
    }else{
      // 中介者发布显示所有网址功能消息
      Mediator.send('showAllNavUrl');
    }
  }
})();