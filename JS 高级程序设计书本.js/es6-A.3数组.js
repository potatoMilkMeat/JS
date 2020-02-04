// 从书本705页开始的

// ==============================================
// 迭代器 Iterator类还不存在
//-----------------------------------------------------------------------------------
//手写iterator接口
function iterator(arr) {
  let index=0;
  return{
      next:function () {
          return index<arr.length?{value:arr[index++],done:false}:{value:undefined,done:true}
      }
  }
}
const arr=[1,'ok',2];
const it=iterator(arr);
console.log(it.next());//{value: 1, done: false}
console.log(it.next());//{value: "ok", done: false}
console.log(it.next());//{value: 2, done: false}
console.log(it.next());//{value: undefined, done: true}

//-----------------------------------------------------------------------------------
//凡是具有Symbol.iterator属性的结构都具有iterator接口
const arr=[1,2,3];
const set=new Set(['a','b','c']);
const map=new Map([['a',1]]);
const itArr=arr[Symbol.iterator]();
const itSet=set[Symbol.iterator]();
const itMap=map[Symbol.iterator]();

console.log(arr)
console.log(itArr)

console.log(set)
console.log(itSet)

console.log(map)
console.log(itMap)

console.log(itSet.next());
console.log(itSet.next());
console.log(itSet.next());
console.log(itSet.next());
console.log(itSet.next());


// ==============================================
// 解构赋值 数组
var [name, value] = ['color', 'green'];
// name "color"
// value "green"

var [, value] = ['color', 'red'];
// value "red"

// ==============================================
// 解构赋值 对象
var person = {name: 'clong', age: 32};
var {name: clName, age: clAge} = person;
// clName 'clong'
// clAge 32