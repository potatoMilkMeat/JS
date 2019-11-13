function Person(){}
Person.prototype= {
  name: 'chenglong',
  age:32,
  job:'work',
  say:function(){console.log(this.name, this.age, this.job);}
}
Object.defineProperty(Person.prototype, 'constructor',{value: Person})

/**
 * 添加 原型新属性，无论实例早晚，都会获取该原型方法
 */
var friend = new Person()
Person.prototype.sayName=function(){console.log(this.name+'已经改变')}
friend.sayName() // chenglong已经改变

/**
 * 重写整个原型对象
 * 旧实例指向旧原型对象，新实例指向新原型对象
 */
Person.prototype= {
  constructor:Person,
  name: 'new-chenglong',
  age:32,
  job:'new-work',
  say:function(){console.log(this.name, this.age, this.job);}
}

friend.say() // chenglong 32 work
Person.prototype.say() // new-chenglong 32 new-work