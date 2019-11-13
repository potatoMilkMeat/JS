function Person(name,age,job){ // 整个是构造函数 Person
  Person.prototype.name=name;
  Person.prototype.age=age;
  Person.prototype.job=job;
  Person.prototype.say=function(){console.log(this.name, this.age, this.job);}
}

/**
 * in 单独使用，通过对象能够访问到的属性，则返回true
 * @dec 此属性在 实例  和 原型对象中均可。
 */
var person1= new Person('chengl', 31, 'work');
'name' in person1 // true
person1.hasOwnProperty('name') // false

//属性在实例中
person1.name='joy' // "joy"
'name' in person1 // true
person1.hasOwnProperty('name') // true

/**
 * in 单独使用，通过对象能够访问到的属性，则返回true
 * @dec 此属性在 实例  和 原型对象中均可。
 */
function hasPrototypeProperty(object, name){
  return !object.hasOwnProperty(name) && name in object
}

hasPrototypeProperty(person1, 'name') // false
hasPrototypeProperty(person1, 'age') // true

/**
 * Object.keys(object) 返回实例的可枚举对象 的数组
 * @dec Object.keys(object.prototype)
 */
Object.keys(Person.prototype) // ["name", "age", "job", "say"]
Object.keys(person1) // ["name"]

/**
 * Object.getOwnPropertyNames(object) 返回实例的所有对象 的数组
 * @dec Object.getOwnPropertyNames(Person.prototype)
 */
Object.getOwnPropertyNames(person1) // ["name"]
Object.getOwnPropertyNames(Person.prototype) //  ["constructor", "name", "age", "job", "say"]