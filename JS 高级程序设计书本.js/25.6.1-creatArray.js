var arr = [],startTime,endTime,val,
  data, l = 1000000; // 初始化数据

// console.log('workers',self); // 查看最小化运行环境

self.onmessage = function (event) { // 监听message
  data = event.data;
  console.log('onmessage', typeof data, '\n', data);
  doSomeThing();
}

function doSomeThing() {
  startTime = Date.now();
  self.postMessage({start: startTime}); // 传回执行结果

  l = data || l;
  if (!arr.length) arr = [];
  for (let i = 0; i < l; ){ // 执行次数
    arr.push(
      (val = 'value' + i.toString())
    );
    if((++i)%10000 ===0) self.postMessage({doing: val});
  }

  endTime = Date.now();
  self.postMessage({end: endTime}); // 传回执行结果
  console.log('\n 开始时间： ',startTime,'\n 结束时间： ',endTime,'\n 总计时间： ', (endTime - startTime)/1000,'秒');
}