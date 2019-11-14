function SuperType(){
  this.property=true
}
SuperType.prototype = {
  constructor: SuperType, // __proto__的 constructor 指向 SuperType
  getSuperProperty: function(){ return this.property },
}
function SubType(){
  this.subProperty=false
}

/**
 * SubType 的 原型是  SuperType对象 ，也包含 SuperType的原型，构成原型链
 * SubType 的 原型 增加新属性
 */
SubType.prototype=new SuperType()
SubType.prototype.getSubProperty=function(){
  return this.subProperty
}

/**
 * 实例化的 SubType，  将继承 SubType原型链
 */
var instance = new SubType()
instance.getSubProperty() // false
instance.getSuperProperty() // true
