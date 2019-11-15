
/**
 * 原型链的问题
 */
function SuperType(){
  this.age=30
  this.colors=['red','green','blue']
}
SuperType.prototype.getColors=function(){return this.colors}
SuperType.prototype.getAge=function(){return this.age}
function SubType(name){
  this.name=name
}
SubType.prototype=new SuperType()
SubType.prototype.constructor=SubType
SubType.prototype.getName=function(){return this.name}

/**
 * 所有 SubType实例的原型  都共享同一个 SuperType的实例
 * SubType {name: "chengl"}
 *  name:  "chengl"
 *  __proto__:  SuperType
 * SubType {name: "chenglong"}
 *  name:  "chenglong"
 *  __proto__:  SuperType
 */
var instance1= new SubType('chengl')
var instance2= new SubType('chenglong')

/**
 * colors 是引用类型，因指针 对应的是一个对象,一旦改动，所有实例都变动
 * age非引用，则会直接新建属性
 */
instance1.colors.push('white')
// console.log(instance1.__proto__)
// SuperType {age: 30, colors: Array(4), constructor: ƒ, getName: ƒ}
//  age:  30
//  colors:  (4) ["red", "green", "blue", "white"]

instance2.age=16 // SubType {name: "chenglong", age: 16}

instance2.getColors() //  ["red", "green", "blue", "white"]
instance1.age // 30

/**
 * 添加实例的 引用类型 属性， 隔断原型链接
 * 修改原型链接 中 的非引用age
 */
Object.defineProperty(instance2, 'colors', { value: ['yellow'], writable:true, enumerable: true, configurable: true })
instance2.getColors() // ["yellow"]

Object.getPrototypeOf(instance1).age=50
// instance1.__proto__.age=50
instance1.getAge() // 50