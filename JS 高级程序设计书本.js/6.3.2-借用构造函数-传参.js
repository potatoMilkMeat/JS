/**
 * 借用构造函数
 */
function SuperType(){
  this.age=30
  this.colors=['red','green','blue']
}
SuperType.prototype.getColors=function(){return this.colors}
SuperType.prototype.getAge=function(){return this.age}
function SubType(name){
  this.name=name
  SuperType.call(this)
}
SubType.prototype=SuperType.prototype // 继承 原型
SubType.prototype.constructor=SubType // this.__proto__.constructor指向  由 SuperType 改为 SubType
SubType.prototype.getName=function(){return this.name}

/**
 * 所有 SubType实例  的原型共用，属性都是独有的
 */
var instance1= new SubType('chengl')
var instance2= new SubType('chenglong')

instance1.colors.push('bleak')
instance1.getColors() // ["red", "green", "blue", "bleak"]
instance2.getColors() // ['red','green','blue']

/**
 * 向 借用构造函数- 传参   分别是两次参数传递和一次调用
 * function SuperType(age){
 * function SubType(name, age){
 * SuperType.call(this, age)
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
SubType.prototype=SuperType.prototype // 继承 原型
SubType.prototype.constructor=SubType // this.__proto__.constructor指向  由 SuperType 改为 SubType
SubType.prototype.getName=function(){return this.name}

var instance1= new SubType('chengl', 16)
var instance2= new SubType('chenglong', 45)

instance1.getAge() // 16
instance2.getAge() // 45