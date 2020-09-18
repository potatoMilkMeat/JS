document.write('1');
document.body.innerHTML = '<h4>程龙  等级 10，  消息<span id="msg_num">0</span></h4>'
                         +'<ul id="msg"></ul>'
                         +'<textarea id="user_input"></textarea>'
                         +'<button id="user_submit">提交</button>';
/** =====17.3-创建一个观察者 =================== */
var Observer = (function (){
  var _messages = {}; // 消息队列，是静态私有变量
  return {
    // 注册信息接口
    regist: function(type, fn){
      if(typeof _messages[type] === 'undefined'){
        _messages[type] = [fn];
      }else{
        _messages[type].push(fn);
      }
      return this;
    },
    // 发布消息接口
    fire: function(type, args){
      if(!_messages[type]){return;} // 该消息没有注册，退出
      var event = {type: type, args: args};
      for(var i=0,l=_messages[type].length;i<l;i++){
        _messages[type][i].call(this, event);
      }
    },
    // 移除信息接口
    remove: function(type, fn){
      if(_messages[type] instanceof Array){
        // 消息队列是否存在
        for(var i=_messages[type].length;i;){
          _messages[type][--i] === fn && _messages[type].splice(i, 1);
        }
      }
    }
  }
})();

// 测试注册和发布
Observer.regist('test', function(e){
  console.log(e.type, e.args);
});
Observer.fire('test', {msg: '传递参数'});

/** =====17.6-大显身手 =================== */
function $(id){return document.getElementById(id);} // 简化获取模式
// 工程师A
(function(){
  // 追加一条消息
  function addMsgItem(e){
    // 绑定数据 和 创建Dom
    var ul = $('msg'),
        li = document.createElement('li'),
        span = document.createElement('span');
    li.innerHTML = e.args.text;
    span.innerHTML = e.args.delText || '  删除';
    span.style= 'margin-left: 20px;display:inline-block; padding:4px 10px; bacnground:#f2f2f2;color:blue;';
    // 添加删除按钮
    span.onclick = function(){
      ul.removeChild(li); // 删除该消息
      Observer.fire('removeCommentMessage', {num: -1}); // 发布信息，并修改评论数
    };
    // 添加dom 到页面
    li.appendChild(span);
    ul.appendChild(li);
  }
  // 注册添加评论信息
  Observer.regist('addCommentMessage', addMsgItem);
})();

// 工程师B
(function(){
  // 修改用户消息数目
  function changeMsgNum(e){
    var num = e.args.num;
    $('msg_num').innerHTML = parseInt($('msg_num').innerHTML) + num;
  }
  // 注册添加和删除评论信息
  Observer.regist('addCommentMessage', changeMsgNum).regist('removeCommentMessage', changeMsgNum);
})();

// 工程师C
(function(){
  // 用户点击提交按钮
  $('user_submit').onclick = function(){
    var text = $('user_input'); // 用户输入框
    if(text.value === ''){return;}
    Observer.fire('addCommentMessage', {num:1, text: text.value}); // 发布评论信息
    text.value = ''; // 输入框清空
  }
})();
