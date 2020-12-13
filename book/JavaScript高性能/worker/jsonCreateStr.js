var jsonCreateStr = function(){
  var arr = [], count = 2000000, i=0;
  while(i < count){
    arr[i] = i+ 'data by ChengLong.';
    i++;
  }
  return arr;
}

self.onmessage = function(event){
  var str = jsonCreateStr(); // 生成 超大 数组
  str = '["'+ str.join('","') +'"]'; // 270
  self.postMessage(str);
  self.close(); // 需要等本函数 中同步执行完，才执行关闭命令
};