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

