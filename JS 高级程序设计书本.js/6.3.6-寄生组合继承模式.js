/**
 * 寄生组合式继承
 */
function object(o){ /**原型式继承 */
  function F(){}
  F.prototype=o;
  return new F();
}

function SuperType(age){
  this.age=age
  this.colors=['red','green','blue']
}
SuperType.prototype.getColors=function(){return this.colors}
SuperType.prototype.getAge=function(){return this.age}

function SubType(name, age){
  this.name=name
  SuperType.call(this, age)
}

/** 
 * inheritPrototype 寄生方法
 * 和使用
 */
function inheritPrototype(SubType, SuperType){
  var prototype=object(SuperType.prototype);
// var prototype=SuperType.prototype;                执行此句  会污染 SuperType.prototype ，最终造成 SuperType.prototype 的添加属性
  Object.defineProperty(prototype, 'constructor', { value: SubType, writable: true, configurable: true, enumerable: false })
//  prototype.constructor=SubType                    执行此句  会造成枚举 constructor属性  【 for in可以遍历 ， Object.keys() 返回 】
  SubType.prototype=prototype
}
inheritPrototype(SubType, SuperType)

SubType.prototype.getName=function(){return this.name} /** SuperType 添加原型 */

/**
 * 寄生组合式继承 是一次实例化，
 * 获得属性 和 原型链
 */
var chengl= new SubType('chengl', 31)
// {name: "chengl", age: 31, colors: Array(3)}
// __proto__:  SuperType
//   constructor:  ƒ SubType(name, age)             // 可读属性  {value: ƒ, writable: true, enumerable: true, configurable: true}
//   getName:  ƒ ()
//   __proto__:  Object
//     etAge:  ƒ ()
//     getColors:  ƒ ()
//     constructor:  ƒ SuperType(age)

/**
 * 污染后的  SuperType.prototype===SubType.prototype
 * chengl实例
 */
// {name: "chengl", age: 31, colors: Array(3)}
// __proto__:  Object
//   getAge:  ƒ ()
//   getColors:  ƒ ()
//   getName:  ƒ ()
//   constructor:  ƒ SubType(name, age)

/**
 * 可以重写 chengl.prototype['constructor'] 属性
 * 指向 SubType 改为  SuperType , 枚举为否
 */
Object.defineProperty(Object.getPrototypeOf(chengl), 'constructor', {enumerable: true,value: SuperType, writable: true, configurable: true})
Object.getOwnPropertyDescriptor(SubType.prototype, 'constructor')             // {value: ƒ, writable: true, enumerable: true, configurable: true}

Object.defineProperty(SubType.prototype, 'constructor', {enumerable: false,value: SubType, writable: false, configurable: true})
Object.getOwnPropertyDescriptor(Object.getPrototypeOf(chengl), 'constructor') // {value: ƒ, writable: false, enumerable: false, configurable: true}
