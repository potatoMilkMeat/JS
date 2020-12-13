importScripts('./timer.js', './log_b.js'); // 内部代码会立即执行
timer(); // 函数a 已经注册到self
// 定义处理函数
self.onmessage = function(event){
  // 获取收到的数据
  var jsonText = event.data.str;
  // 解析数据
  var jsonDate = JSON.parse(jsonText);
  // 回传结果
  self.postMessage(jsonDate);
  // self.close(); // 需要等本函数 中同步执行完，才执行关闭命令
};