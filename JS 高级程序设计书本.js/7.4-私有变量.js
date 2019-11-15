/**
 * 私有变量
 */
function MyObject(){

  // 私有属性和方法
  var privateVariable=10;
  function getPrivateVariable(){ return privateVariable; }

  // 特权方法
  this.publicMethod= function(){
    privateVariable++;
    return getPrivateVariable()
  }
}

var one=new MyObject()
// 执行后的闭包
// 0:  Closure (MyObject)
//   getPrivateVariable:  ƒ getPrivateVariable()
//   privateVariable:  10
one.publicMethod() // 11

/**
 * 私有变量 
 * 每一个实例会创造新的方法，闭包也是互不干扰
 * set 和 get
 */
function Person(name){
  this.getName=function(){ return name; };
  this.setName=function(value){ name=value;return name; };
}

var person =new Person('chengl');
var person2 =new Person('111');

person.getName() // 'chengl'
person.setName('chenglong') // "chenglong"

person2.getName() // "111"