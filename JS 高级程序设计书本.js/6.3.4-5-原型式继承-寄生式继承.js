/**
 * 原型式继承
 */
function object(o){
  function F(){}
  F.prototype=o;
  return new F();
}
var person={
  name:'defaultName',
  colors:['red','green','blue']
}
var chengl= object(person)
chengl.name='chenglong'
chengl.colors.push('white')

// F {name: "chenglong"}
//   name: "chenglong"
//   __proto__:
//     colors:  (4) ["red", "green", "blue", "white"]
//     name:  "defaultName"

/**
 * 寄生式继承
 */
function creatAnother(original){
  var clone= object(original);
  clone.say=function(){console.log(this.name, this.colors);} // 添加新的属性和方法
  return clone;
}

var chenglong= creatAnother(person)
chenglong.say() // 'defaultName' (4) ["red", "green", "blue", "white"]
