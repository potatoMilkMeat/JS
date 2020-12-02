/* 第四章 工厂方法模式
*  4.4 安全的工厂方法
*    作者：程龙 时间：2019-5-7 22:23
*    遗憾：无法将闭包在原型类中调用，但是点语法也可以使用
*/

// 安全模式创建的工厂类
var Factory = function (type, content) {
  if(this instanceof Factory) {
    var s = new this[type] (content)
    return s
  } else {
    return new Factory (type, content)
  }
}

// 将createDiv的方法公用起来，样式由工程类中设定，使用点语法来通用
Factory.creatDiv = function(content, style) {
  this.content = content; // 这个分好不能省略，否则报错
  (function (content) {
    var div = document.createElement('div')
    div.innerHTML = content
    console.log(arguments.length)
    if(style){
      if (style.border && typeof style.border === 'string') {div.style.border = style.border}
      if (style.color && typeof style.color === 'string') {div.style.color = style.color}
      if (style.bgColor && typeof style.bgColor === 'string') {div.style.backgroundColor = style.bgColor}
    }
    document.getElementById('container').appendChild(div)
  })(content) // content 不能省略，否则报错
}
// 工厂原型中设置创建所有类型数据对象的基类
Factory.prototype = {
  Java: function (content) {
    var style = { color: 'green'};
    Factory.creatDiv(content, style)
  },
  JavaScript: function (content) {
    var style = { bgColor: 'pink'}
    Factory.creatDiv(content, style)
  },
  UI: function (content, style) {
    var style = { border: '1px solid red'}
    Factory.creatDiv(content, style)
  },
  php: function (content) {
    var style = { color: 'yellow', bgColor: 'red'}
    Factory.creatDiv(content, style)
  }
}

var data = [
  {type:'JavaScript', content: 'JavaScript 哪家强'},
  {type:'Java', content: 'Java 哪家强'},
  {type:'UI', content: 'UI 哪家强'},
  {type:'php', content: 'php 哪家强'},
  {type:'JavaScript', content: 'JavaScript 设计模式'},
  {type:'UI', content: 'UI-PS专家'}
]

for (var i = 0; i < data.length; i++) {
  Factory(data[i].type, data[i].content)
}
