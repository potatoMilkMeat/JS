document.write('1');
document.body.innerHTML = '';
/** =====18.3-状态对象的实现 =================== */
// 投票结果状态对象
var ResultlState = function(){
  var States = {
    // 每种状态作为一种独立方法保存
    state0: function(){
      console.log('这是第一种情况');
    },
    state1: function(){
      console.log('这是第二种情况');
    },
    state2: function(){
      console.log('这是第三种情况');
    },
    state3: function(){
      console.log('这是第四种情况');
    }
  }
  // 获取莫一种状态并执行其对应的方法
  function show(result){
    States['state'+ result] && States['state'+ result]();
  }
  return {
    // 返回调用状态方法接口
    show: show
  }
}();

/** =====18.4-状态对象演练 =================== */
ResultlState.show(3);

/** =====18.6-状态的优化 超级玛丽 =================== */
var MarryState = function(){
  // 内部状态私有变量
  var _currentState = {};
  // 动作和方法映射
  var states = {
    jump: function(){ console.log('jump'); }, // 跳跃
    move: function(){ console.log('move'); }, // 移动
    shoot: function(){ console.log('shoot'); }, // 射击
    squat: function(){ console.log('squat'); } // 蹲下
  };
  var Action = {
    // 改变状态方法
    changeState: function(){
      // 组合动作通过传递多个参数实现
      var arg =arguments;
      // 重置你内部状态
      _currentState = {};
      // 如果有动作则添加动作
      if(arg.length){
        for(var i=0,len = arg.length;i<len;i++){
          // 遍历动作
          _currentState[arg[i]] = true;
        }
      }
      // 返回动作控制类
      return this;
    },
    // 执行动作
    goes: function(){
      console.log('触发一次动作');
      // 遍历内部状态保存的动作
      for(var i in _currentState){
        // 如果该动作存在则执行
        states[i] && states[i]();
      }
      return this;
    }
  }
  // 返回接口方法 change、goes
  return {
    change: Action.changeState,
    goes: Action.goes
  }
}

/** =====18.7-两种使用方式 =================== */
// MarryState()
//   .change('jump', 'shoot')
//   .goes()
//   .goes()
//   .change('squat')
//   .goes();

var marry = new MarryState();
marry
  .change('jump', 'shoot')
  .goes()
  .goes()
  .change('squat')
  .goes();