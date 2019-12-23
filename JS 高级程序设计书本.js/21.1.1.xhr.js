/**
 * xhr基本用法
 */
xhr=new XMLHttpRequest()
xhr.open('get','20.1.JSON.json',false)
xhr.send(null)
xhr.responseText

// status 服务器返回的状态
xhr.status // 200,304,500
if(200<=xhr.status<300 || xhr.status===304){
  console.log('结果： ', xhr.responseText, '\t状态码: ',xhr.status)
}else {
  console.log('请求失败。 \t状态码: ',xhr.status)
}
