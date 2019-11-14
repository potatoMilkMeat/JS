function Person(name,age,job){
  var o= new Object()
  o.name= name
  o.age=age
  o.job = job
  o.say= function(){console.log(name,age,job);}
  return o
}

/**
 * 稳妥构建函数模式
 * 方法中不用this, 构建时不使用 new
 * 形成闭包，
 * o对象在  Person('chengl',31, 'good') 后已经销毁，但是方法say使用了  o.name,o.age,o.job的  字面值，已经无法在对它进行改变
 */
var person1= Person('chengl',31, 'good');
person1.say() // chengl 31 good

person1.age=20; person1.name='chenglong';
console.log(person1) // {name: "chenglong", age: 20, job: "good", say: ƒ}
person1.say()  // chengl 31 good

/**
 * 寄生构造函数，return返回对象
 * 此实例与构造函数没有关系，instanceof 为 false
 * o对象实际上是 Object  的实例化
 */
person1.say=null // {name: "chenglong", age: 21, job: "good", say: null}
delete person1.say // {name: "chenglong", age: 21, job: "good"}