function creatPerson(name,age,job){
  var o=new Object();
  o.name = name;
  o.age=age;
  o.job=job;
  return o
}

var a=creatPerson('chengl', 25, 'work');

function Person(name,age,job){
  this.name=name;
  this.age=age;
  this.job=job;
}

var aa = new Person('chengl', 25, 'work');
console.log(a,aa)
console.log(aa.constructor)

console.log(a.constructor)

console.log(aa instanceof Person)

console.log(aa instanceof Object)