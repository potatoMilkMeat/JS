/**
 * debounce 防止多次触发
 * func 执行函数
 * threshold 时间间隔，低于此时间的不会再次触发
 * execAsap 尽快执行 , false为延迟触发
*/
function debounce(func, threshold, execAsap) {
  var timer; // 计时器
  return function debounced() {
    var _this = this, args = arguments;

    function delayed() {
      if (!execAsap){ func.apply(_this, args); }
      timer = null;
    };
    
    if (timer){ clearTimeout(timer); }
    else if (execAsap){  func.apply(_this, args); }

    timer = setTimeout(delayed, threshold || 100);
  };
}
window.onresize = debounce( function(event){
  console.log('resize \t',event.timeStamp, document.body.clientWidth);
  }, 400, false)