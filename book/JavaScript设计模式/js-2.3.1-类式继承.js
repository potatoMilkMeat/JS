/* 第二章 面向对象编程
*  2.3.1 继承————类式继承
*    作者：程龙 时间：2019-5-1 22:46
*/

// 声明父类
function SuperClass() {
  this.SuperValue = ['SuperValue: default']
}
// 为父类添加公有方法
SuperClass.prototype.getSubperValue = function () {
  console.log(this.SuperValue)
  return this.SuperValue
}

// 声明子类
function SubClass() {
  this.SubValue = 'SubValue: false'
}

// 继承父类
SubClass.prototype = new SuperClass()
// 为子类添加共有方法
SubClass.prototype.getSubValue = function () {
  console.log(this.SubValue)
  return this.SuperValue
}

// 实例化 SubClass
var instance = new SubClass()
instance.getSubValue() // Print: SubValue: false
instance.getSubperValue() // Print: SuperValue: true

// instanceof 检测某个对象是否属于某个类的实例
const instanceOfSubClass = instance instanceof SubClass // Print: true
console.log('instance instanceof SubClass: ' + instanceOfSubClass)
const instanceOfSuperClass = instance instanceof SuperClass // Print: true
console.log('instance instanceof SuperClass: : ' + instanceOfSuperClass)
const SubClassOfSuperClass = SubClass instanceof SuperClass // Print: false
console.log('SubClass instanceof SuperClass: ' + SubClassOfSuperClass)
const SubClassProtoOfSuperClass = SubClass.prototype instanceof SuperClass // Print: true
console.log('SubClass.prototype instanceof SuperClass: ' + SubClassProtoOfSuperClass)

// 类式继承的缺点：第一、父类的引用类型的共有属性，会被所有实例公用。
// 第二、无法向父类传递参数，同时无法对构造函数内的属性进行初始化
var instance1 =new SubClass()
instance1.SuperValue.push('new')
instance.getSubperValue() // Print: ["SuperValue: default", "new"]
