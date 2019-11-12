function Person(name,age,job){ // 整个是构造函数 Person
  Person.prototype.name=name;
  Person.prototype.age=age;
  Person.prototype.job=job;
  Person.prototype.say=function(){console.log(this.name, this.age, this.job);}
}

/**
 * Person.prototype  构造函数（Person） 的原型对象（Person.prototype）
 * @dec constructor 指向  构造函数 Person
 */

/**
 * 创建两个实例
 */
var person1 = new Person('chengl', 10, 'work');
person1.say()

var person2 = new Person('person2', 20, 'work2');
person2.say()

/**
 * @dec 实例的prototype属性  指向  原型对象（Person.prototype）
 */
Person.prototype.isPrototypeOf(person1) // true
Person.prototype.isPrototypeOf(person2) // true

Object.getPrototypeOf(person1) == Person.prototype // true
Object.getPrototypeOf(person1).name // 'person2'

/**
 * @dec 实例的新的属性  会覆盖原型属性
 * @drc 查找属性  先查找实例属性，如果没有再查找原型属性
 */
person1.name='chenglong'
person1.name // 'chenglong'
Person.prototype.name // 'person2'

/**
 * @dec 实例的新的属性 null 会覆盖原型属性
 * @drc delete 实例属性，使 原型属性重新生效
 */
person1.name=null
person1.name // null
Person.prototype.name // 'person2'

delete person1.name // true
person1.name // 'person2'

/**
 * @dec hasOwnProperty 检测属性是实例的还是原型的
 */
person1.name // 'person2'
person1.hasOwnProperty('name') // false  来自原型

person1.name='新名字' // '新名字'
person1.hasOwnProperty('name') // true 来自实例

/**
 * @dec getOwnPropertyDescriptors 取得实例属性
 */
Object.getOwnPropertyDescriptors(person1) // name: {value: "新名字", writable: true, enumerable: true, configurable: true}__proto__: Object

delete person1.name // true
Object.getOwnPropertyDescriptors(person1) // {}