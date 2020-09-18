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

/** =====17.7 对象间解耦 =================== */
// 学生类

// 
