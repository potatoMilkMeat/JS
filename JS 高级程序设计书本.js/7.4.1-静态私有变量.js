/**
 * 静态私有变量
 * privateVariable 是每个实例共享的变量
 * 构造函数 中 this.name 是每个实例独有的
 */
(function(){
  // 私有变量和函数
  var privateVariable=10;  // 静态私有变量  实例共享
  function getPrivateVariable(){ return privateVariable; }
  function getPublicName(){return this.name;}

  // 构造函数
  MyObject=function(name){
    this.name=name; // 实例属性
    this.getName=getPublicName;
  }

  // 特权方法 - 原型
  MyObject.prototype.publicMethod= function(){
    privateVariable++;
    return getPrivateVariable()
  }
})()

var person=new MyObject('chengl')
var person2=new MyObject('111')
// 执行后的闭包
// 0:  Closure (MyObject)
//   getPrivateVariable:  ƒ getPrivateVariable()
//   privateVariable:  10
person.publicMethod() // 11
person.getName() // "chengl"

person2.getName() // '111'
person2.publicMethod() // 12
