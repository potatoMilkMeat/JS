// 复合事件 中文拼音输入
document.implementation.hasFeature('CompositionEvent', '3.0') // true

document.write('<body><textarea id="txt"></textarea></body>')
function fuc(event){
  console.log(event.type, event.data, event.timeStamp,event)
}
document.getElementById('txt').addEventListener("compositionstart", fuc)
document.getElementById('txt').addEventListener("compositionupdata", fuc)
document.getElementById('txt').addEventListener("compositionend", fuc)
