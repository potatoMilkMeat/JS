
/**
 * 13.2.2 DOM0级
 * element.onclick=function(event){}  只支持事件一个参数
 * this默认指被点击对象
 */
document.write('<p id="p">文本 </p>')
var p=document.getElementById('p');
p.onclick=function(event){
  console.log('event: ',event,'\n this: ',  this,'\n value: ', this.childNodes[0].nodeValue)
}
// p.onclick=null;

/**
 * 13.2.3 DOM2级
 * addEventListener(event,func,true)
 * true 为捕获阶段； false 为冒泡阶段==兼容大多数浏览器
 * removeEventListener 参数相同才可以去除
 * 但是不能是匿名函数 ，匿名函数无法删除，因为匿名函数是用后即销毁，没有指针指向匿名函数
 */
function log(event){
  console.log('event: ',event,'\n this: ',  this,'\n value: ', this.childNodes[0].nodeValue)
}
p.addEventListener('click',log,false)
p.removeEventListener('click',log,false)

/**
 * 一个函数处理多个事件
 * type属性
 */
function handler(event){
  switch (event.type) {
    case 'click':
      console.log('click');
      break;
    case 'mousemove':
        event.target.style.backgroundColor='red';
        break;
    case 'mouseout':
        event.target.style.backgroundColor='green';
        break;
  }
}
p.addEventListener('click',handler)
p.addEventListener('mousemove',handler)
p.addEventListener('mouseout',handler)