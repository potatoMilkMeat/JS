/**
 * 函数节流
 * 用于多次触发，延后执行
 */
processor = {
  timerId: null,

  // 实际进行处理的方法
  performProcessing: function () {
    console.log(this.timerId)
  },
  // 初始处理调用的方法
  process: function () {
    clearTimeout(this.timerId)

    var that = this
    this.timerId = setTimeout(function () {
      that.performProcessing();
    }, 100)
  }
}

// window.onresize = function(){
//   processor.process()
// }

function throttle(fn, context) {
  clearTimeout(fn.tId)
  fn.tId = setTimeout(function () {
    fn.call(context)
  }, 100)
}

function fnc() {
  console.log(this.tId)
}

window.onresize = function () {
  throttle(fnc, fnc)
}