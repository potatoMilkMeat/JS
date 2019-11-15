function Person(name,age,job){
  this.name=name;
  this.age=age;
  this.job=job;
if(this.say === Person.prototype.say){console.log('相等')}else{console.log('不相等')}
if(typeof this.say!='function'){
  Person.prototype.say=function(){console.log(this.name,this.age,this.job);};
  console.log('Person.prototype.say 刚创建');
}else{console.log('Person.prototype.say 已有')}
}

/**
 * 添加 动态原型模式
 */
var person1= new Person('chengl',31, 'good'); // 相等  Person.prototype.say 刚创建
person1.say(); // chengl 31 good

var person2= new Person('chenglong',31, 'good'); // 相等  Person.prototype.say 已有
/**
 * 修改 原型属性，对所有实例起效
 */
Person.prototype.say=function(){console.log(this.name);};
person1.say(); // chengl
person2.say(); // chenglong
