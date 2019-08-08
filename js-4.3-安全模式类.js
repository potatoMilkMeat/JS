/* 第四章 工厂方法模式
*  4.3 安全模式类
*    作者：程龙 时间：2019-5-7 22:14
*/

// 安全模式类
var Dome = function (name) {
  if (!(this instanceof Dome)) {
    return new Dome(name)
  }
  this.name = name
  this.getName = function () { console.log(this.name) }
}

var d = Dome('实例化Dome')
d.getName()
