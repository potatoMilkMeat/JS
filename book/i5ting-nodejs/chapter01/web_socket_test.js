/*
 * @Author: chenglong_wh
 * @Date: 2021-08-24 16:32:09
 * @LastEditTime: 2021-08-24 16:33:18
 * @LastEditors: chenglong_wh
 * @Description:
 */
function WebSocketTest() {
  if ('WebSocket' in window) {
    console.log('您的浏览器支持 WebSocket!')

    // 打开一个 web socket
    var ws = new WebSocket(
      'ws://127.0.0.1:9229/a0d8d757-4a96-4504-9ccc-7f7fa1d31303'
    )

    ws.onopen = function () {
      // Web Socket 已连接上，使用 send() 方法发送数据
      ws.send('发送数据')
      console.log('数据发送中...')
    }

    ws.onmessage = function (evt) {
      var received_msg = evt.data
      console.log(received_msg)
      console.log('数据已接收...')
    }

    ws.onclose = function () {
      // 关闭 websocket
      console.log('连接已关闭...')
    }
  } else {
    // 浏览器不支持 WebSocket
    console.log('您的浏览器不支持 WebSocket!')
  }
}

// 运行在 浏览器中
// WebSocketTest()
