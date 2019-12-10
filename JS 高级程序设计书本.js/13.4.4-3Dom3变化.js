//DOM3变化 显示按键的字母
document.write('<body></body>')
document.body.addEventListener("keydown", key)
function key(event){
  var a= event.key || event.keyIdentifier;
  console.log(event.type, a, event.timeStamp,event)
}

// textInput事件
document.write('<body><textarea id="txt"></textarea><input id="input" type="text"></body>')
document.getElementById('txt').addEventListener("textInput", fuc)
document.getElementById('input').addEventListener("textInput", fuc)
function fuc(event){
  if(event.inputMethod){console.log(event.inputMethod)}
  console.log(event.type, event.data, event.timeStamp,event)
}

