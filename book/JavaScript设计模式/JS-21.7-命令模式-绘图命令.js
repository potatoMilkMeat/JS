document.write('1');
document.body.innerHTML = '<canvas id="canvas" width="400" height="400" style="border:1px solid #ddd;"></canvas>';
/** ========= 不深入研究canvas，因为决定用白鹭引擎做微信小游戏 =============================  */
/* ========== 为知笔记上收藏有现成的canvas游戏案例 ===================================== */
/** =====21.7-绘图命令 =================== */
// 实现对象
var CanvasCommand = (function(){
  // 获取canvas
  var canvas = document.getElementById('canvas');
  // canvas元素的上下文引用对象缓存在命令对象的内部
  var ctx = canvas.getContext('2d');
  // 内部方法对象
  var Action = {
    // 填充颜色
    fillStyle: function(c){ctx.fillStyle = c;},
    // 填充矩形
    fillRect: function(x, y, width, height){
      ctx.fillRect(x, y, width, height);
    },
    // 描边颜色
    strokeStyle: function(c){ctx.strokeStyle = c;},
    // 描边矩形
    strokeRect: function(x, y, width, height){
      ctx.strokeRect(x, y, width, height);
    },
    // 设置字体大小和字体名称
    font: function(fs_ffam){ctx.font = fs_ffam;},
    // 填充字体
    fillText: function(text, x, y){
      ctx.fillText(text, x, y);
    },
    // 填充空心字体
    strokeText: function(text, x, y){
      ctx.strokeText(text, x, y);
    },
    // 开启路径
    // 核心的作用是将不同绘制的形状进行隔离，每次执行此方法，表示重新绘制一个路径，跟之前的绘制的路径可以进行分开样式设置和管理
    beginPath: function(){ctx.beginPath();},
    // 闭合路径
    // 闭合路径会自动把最后的线头和开始的线头连在一起
    closePath: function(){ctx.closePath();},
    // 移动画笔到点
    moveTo: function(x, y){ctx.moveTo(x, y)},
    // 画笔连线
    lineTo: function(x, y){ctx.lineTo(x, y);},
    // 绘制弧线
    arc: function(x, y, r, begin, end, dir){
      ctx.arc(x, y, r, begin, end, dir);
    },
    // 填充
    fill: function(){ctx.fill();},
    // 描边
    stroke: function(){ctx.stroke();},
    // 重设宽高
    // 重新设置canvas标签的宽高属性会让画布擦除所有的内容；
    setWidthHeight: function(){
      canvas.width = arguments[0] || canvas.width;
      canvas.height = arguments[1] || canvas.height;
    }
  }
  
  return {
    // 命令接口
    excute: function(msg){
      // 如果没有指令则返回
      if(!msg)
        return;
      // 如果命令是一个数组
      if(msg.length){
        // 遍历执行多个命令
        for(var i=0,len=msg.length;i<len;i++)
          arguments.callee(msg[i]);
      }else{
        // 如果msg.param 不是一个数组，将其转换为数组，以适应apply方法第二个参数是数组格式
        msg.param = Object.prototype.toString.call(msg.param) === "[object Array]" ? msg.param : [msg.param];
        // Action内部调用的方法可能引用this,为保证作用域中this指向正确，故传入Action
        Action[msg.command].apply(Action, msg.param);
      }
    }
  }
})();

/** =====21.8-写一条命令 =================== */
// 画红色矩形
CanvasCommand.excute([
  {command: 'fillStyle', param: 'red'},
  {command: 'fillRect', param: [0, 0, 50, 50]}
]);

// 画线 (100,0) --> (150, 50)
CanvasCommand.excute([
  {command: 'strokeStyle', param: 'blue'},
  {command: 'moveTo', param: [100, 0]},
  {command: 'lineTo', param: [150, 50]},
  {command: 'stroke'}
])
