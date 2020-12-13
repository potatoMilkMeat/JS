function timer(){
  setInterval(function(){
    // 返回当前时间
    self.postMessage({
      time: +new Date(),
      type: 'timer'
    });
  }, 1000);
}