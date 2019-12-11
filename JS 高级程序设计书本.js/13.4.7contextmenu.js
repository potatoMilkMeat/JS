// 右键菜单
document.write('<body><div id="div" style="height:280px;background:#f2f2f2;">01</div><ul id="menu" style="position:absolute;visibility:hidden;background-color:silver;"><li>001</li><li>002</li><li>003</li></ul></body>')
var div=document.getElementById('div')

function fuc(event){
  event.preventDefault()
  var menu=document.getElementById('menu')
  menu.style.left=event.clientX+"px"
  menu.style.top=event.clientY+"px"
  menu.style.visibility="visible"
  console.log(event.type, event.timeStamp,event)
}
document.getElementById('div').addEventListener("contextmenu", fuc)

// beforeunload 离开前确认
window.onbeforeunload=function(event){
  event.returnValue="确认离开吗？"
}
window.open('http://www.baidu.com', '_self')

// DOMContentLoaded
window.addEventListener("DOMContentLoaded",function(){console.log(event, 'Content Loaded');})