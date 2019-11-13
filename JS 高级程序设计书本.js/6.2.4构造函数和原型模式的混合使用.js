function Person(name,age,job){
  this.name=name;
  this.age=age;
  this.job=job;
  this.friend=['bob','holiy'];
}
Person.prototype={
  constructor: Person,
  say: function(){console.log(this.name,this.age,this.job,this.friend);}
}

/**
 * 添加 原型新属性，无论实例早晚，都会获取该原型方法
 */
var person1= new Person('chengl',31, 'good');
var person2= new Person('other',16, 'no-job');

person1.friend.push('aa',111);

person1.say(); // chengl 31 good (4) ["bob", "holiy", "aa", 111]
person2.say(); // other 16 no-job (2) ["bob", "holiy"]
