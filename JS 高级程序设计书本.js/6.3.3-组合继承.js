/**
 * 组合继承
 */
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
SubType.prototype= new SuperType() // 继承 原型 是 SuperType的实例
SubType.prototype.constructor=SubType // this.__proto__.constructor指向  由 SuperType 改为 SubType
SubType.prototype.getName=function(){return this.name}

/**
 * 所有 SubType实例  的原型共用，属性都是独有的
 */
var instance1= new SubType('chengl',16)
var instance2= new SubType('chenglong',32)

instance1.colors.push('bleak')
instance1.getColors() // ["red", "green", "blue", "bleak"]
instance2.getColors() // ['red','green','blue']

/**
 * instanceof 实例化  isPrototypeOf原型链  都能正常识别
 */
instance1 instanceof SubType // true
instance1 instanceof SuperType // true
instance1 instanceof Object // true
Object.prototype.isPrototypeOf(instance1) // true
SubType.prototype.isPrototypeOf(instance1) // true
SuperType.prototype.isPrototypeOf(instance1) // true