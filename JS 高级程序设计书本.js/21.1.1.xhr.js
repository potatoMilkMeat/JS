/**
 * new XMLHttpRequest()基本用法
 * =============================================
 * readyState 状态    方法
 * ----------------------------------
 *               new XMLHttpRequest()
 *   0 未初始化        |
 *                   open()
 *   1 已启动          |
 *                   send()
 *   2 已发送          |
 *                 开始接收信息
 *   3 接收中          |
 *                  接收完成
 *   4 完成
 * -------------------------------------
 * onreadystatechange  event事件，对流数据（视频，音频等必须掌握）
 * status // 200,304,500 // status 服务器返回的状态
 * +++++++++++++++++++++++++++++++++++++
 * xhr.abort() // 取消请求
 */
xhr=new XMLHttpRequest()
xhr.onreadystatechange=statechange
xhr.open('get','../formateJSON2js/GPS_VID_20190905_111343.json',true)
xhr.send(null)
xhr.responseText // 返回的文本
xhr.responseXMl // 如果响应的内容类型是 'text/xml' 或 'application/xml'

function checkStatus(xhr){
  if(200<=xhr.status<300 || xhr.status===304){
    console.log('结果： ', xhr.responseText, '\t状态码: ',xhr.status)
  }else {
    console.log('请求失败。 \t状态码: ',xhr.status)
  }
}
function statechange(){
  switch (xhr.readyState) {
    case 4: // 信息完成接收，继续执行
      console.log('信息完成接收',new Date())
      checkStatus(xhr);
      break;
    case 3: // 信息接收中，监听流数据
      console.log('信息接收中，监听流数据',new Date())
      break;
    case 2: // 消息已发送
      console.log('消息已发送, 消息内容', new Date())
      break;
    case 1: // 启动
      console.log('启动，type，url', new Date())
      break;
    case 0: // 未初始化
      console.log('未初始化', new Date())
      break;
    default:
      break;
  }
}
