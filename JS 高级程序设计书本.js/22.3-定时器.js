/**
 * js 是单线程的，代码执行采用插入队列，等待空闲后执行
 * 定时器只决定什么时候插入队列，具体执行得等 队列空闲
 * setInterval 在队列中还有该定时器的实例，则会放弃 插入新实例到执行队列
 */

function createInterval() {
  return function (fn, context, interval) {
    var args = Array.prototype.slice.bind(arguments, 3)
    setTimeout(function () {
      // 处理中
      fn.apply(context, args)
      setTimeout(arguments.callee, interval)
    }, interval)
  }
}

handler = {
  msg: '点击 回调',
  handleClick: function (name, event) {
    console.log(this.msg, name, event)
  }
}

a = createInterval()
a(handler.handleClick, handler, 2000, 'body')


/**
 * 封装成类
 */

function MyTimer(fn, context, interval,TimerContext) {
  this.fn = fn;
  this.context = context;
  this.interval = interval;
  this.TimerContext = TimerContext || {timer: null};
}

MyTimer.prototype = {
  instance: function (fn, context, interval,TimerContext) {
      var args = Array.prototype.slice.bind(arguments, 4),timer;
      if(!TimerContext || TimerContext.timer) { TimerContext =  this.TimerContext}
      TimerContext.timer = setTimeout(function () {
        fn.apply(context, args)
        TimerContext.timer = setTimeout(arguments.callee, interval)
      }, interval)
    }
  ,
  begin: function begin() {
    // console.log('begin',this.TimerContext,this.instance)
    if (typeof this.instance === "function") { 
      this.instance(this.fn, this.context, this.interval, this.TimerContext);
    }
  },
  stop: function stop() {
    clearTimeout(this.TimerContext.timer)
    this.TimerContext.timer=null
  }
}

handler = {
  msg: '点击 回调',
  handleClick: function (name, event) {
    console.log(this.msg, name, event)
  }
}

t=new MyTimer(handler.handleClick, handler, 2000)
/* 
TimerContext = {timer: null}
t=new MyTimer(handler.handleClick, handler, 2000,TimerContext)
*/
t.begin()
t.stop()