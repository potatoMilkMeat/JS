function Person(name,age,job){
  var o= new Object()
  o.name= name
  o.age=age
  o.job = job
  o.say= function(){console.log(this.name,this.age,this.job);}
  return o
}

/**
 * 寄生构造函数，return返回对象
 * 此实例与构造函数没有关系，instanceof 为 false
 * o对象实际上是 Object  的实例化
 */
var person1= new Person('chengl',31, 'good');
person1.say() // chengl 31 good

person1 instanceof Person // false
person1 instanceof Object // true

/**
 * 寄生构造函数，用于不破坏原生对象
 * Array 返回特定的color
 */
function SpecialArray(){
  var values=new Array()
  values.push.apply(values, arguments)
  values.toPipedString= function(){ return this.join('|'); }
  return values
}

var colors=new SpecialArray('red','blue', 'green')
colors.toPipedString() // "red|blue|green"

/**
 * 寄生构造函数，用于不破坏原生对象
 * Array 返回随机顺序
 */
function AnyOrder(){
  let newArray= new Array()
  newArray.push.apply(newArray, arguments)
  newArray.anyOrder=function(){
    for(let i=this.length,x,j; i; x=this[--i], j=Math.floor(Math.random()*i),this[i]=this[j],this[j]=x){}
    return this
  }
  return newArray
}

var arr= new AnyOrder(0,1,2,3,4,5,6,7,8,9) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, anyOrder: ƒ]
arr.anyOrder() // [6, 8, 1, 9, 2, 3, 5, 0, 7, 4, anyOrder: ƒ]
