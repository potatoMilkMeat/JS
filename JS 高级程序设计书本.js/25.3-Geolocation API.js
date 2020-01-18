document.write('<div id="div"></div>')
div = document.getElementById('div')

// 错误处理代码
function handleError(error) {
  var msg = '错误代码：' + error.code + '\n 错误信息' + error.message
  console.log(msg);
  div.innerText = msg;
}

// 成功获得对象 Position
// 参数: coords  coords
function handlePosition(position) {
  var c = position.coords,
      t = position.timestamp;

  var msg = '维度：' + c.latitude +' 类型：'+ typeof c.latitude 
          + '\n 经度: ' + c.longitude +' 类型：'+ typeof c.longitude 
          + '\n 精度(米): ' + c.accuracy +' 类型：'+ typeof c.accuracy;
  msg += '\n ======================以下信可能没有=='
       + '\n 海拔: ' + c.altitude +' 类型：'+ typeof c.altitude
       + '\n 海拔精度: ' + c.altitudeAccuracy +' 类型：'+ typeof c.altitudeAccuracy
       + '\n 指南针的方向: ' + c.heading +' 类型：'+ typeof c.heading
       + '\n 速度: ' + c.speed +' 类型：'+ typeof c.speed
       + '\n timesTamp: '+ t;
  console.log(msg);
  div.innerText = msg;
}

// 选项对象
// enableHighAccuracy 默认是 false
// 不需要更新, maximumAge 设置为 Infinity
var obj = {
  enableHighAccuracy: false, // 使用最准确的位置信息
  timeout: 5000, // 等待位置信息的最长时间
  maximumAge: 25000 // 上一次坐标信息的有效时间，过了就重新获取
}

// 地理定位
// navigator.geolocation.getCurrentPosition(handlePosition, handleError, obj)

// 一直跟踪，改变及发送 返回一个数值标识符
var id = navigator.geolocation.watchPosition(handlePosition, handleError)

// 清空监听
setTimeout(function (){
  div.innerText = 'clear'
  navigator.geolocation.clearWatch(id);
  console.log(id);
}, 30*1000)
