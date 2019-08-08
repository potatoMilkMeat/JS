/* 第三章 简单工厂模式
*  3.3 一个对象有时也能代替很多类
*    作者：程龙 时间：2019-5-7 21:45
*/

// 工厂模式
function creatBook (name, time, type, btn) {
  var o = new Object()
  o.name = name
  o.time = time
  o.type = type
  o.getName = function () {console.log(this.name)}
  return o
}

var book1 = creatBook('js book', 2014 ,'js')
var book2 = creatBook('css book', 2013, 'css')

book1.getName()
book2.getName()
var isShow = confirm(book1.name)
if (isShow) { alert('你点击了确定') } else { alert('你点击了取消')}