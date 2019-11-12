function Person(name,age,job){
  this.name=name;
  this.age=age;
  this.job=job;
  this.say=function(){console.log(this.name, this.age, this.job);}
}

/**
 * 当做构造函数
 */
var a = new Person('chengl', 25, 'work');
a.say()

/**
 * 当函数使用
 */
Person('window', 12, 'globle');
window.say()

/**
 * 在另一个对象上使用
 */
var newObject= new Object()
Person.call(newObject, 'man', 31, 'good_job')
newObject.say()

/**
 * 缺点，方法都是新对象
 */
var aa=  new Person('aa', 99, 'work2');
console.log("a.say==aa.say :\t" + a.say==aa.say)