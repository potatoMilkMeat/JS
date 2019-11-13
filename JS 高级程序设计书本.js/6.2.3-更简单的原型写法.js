function Person(){}
Person.prototype= {
  name: 'chenglong',
  age:32,
  job:'work',
  say:function(){console.log(this.name, this.age, this.job);}
}

/**
 * 更简单的原型写法
 * constructor 指向改变，现在指向Object
 */
var friend = new Person()

friend instanceof Object // true
friend instanceof Person // true

friend.constructor == Object // true
friend.constructor == Person // false

/**
 * 更改 constructor 的指向为 Person
 * constructor属性变成可枚举了
 */
Person.prototype= {
  constructor: Person,
  name: 'chenglong',
  age:32,
  job:'work',
  say:function(){console.log(this.name, this.age, this.job);}
}
friend= new Person()
friend.constructor == Person // true

Object.getOwnPropertyDescriptor(Person.prototype, 'constructor') // {value: ƒ, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(friend.__proto__, 'constructor') // {value: ƒ, writable: true, enumerable: true, configurable: true}

/**
 * Object.defineProperty()   更改 constructor 的指向为 Person
 * constructor属性变成可枚举了
 */
Person.prototype= {
  name: 'chenglong',
  age:32,
  job:'work',
  say:function(){console.log(this.name, this.age, this.job);}
}
Object.defineProperty(Person.prototype, 'constructor',{ value: Person });
Object.getOwnPropertyDescriptor(Person.prototype, 'constructor') // {value: ƒ, writable: false, enumerable: false, configurable: false}