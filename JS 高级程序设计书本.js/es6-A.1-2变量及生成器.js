// 从书本701页开始的

// ==============================================
// const 常量，不能再声明，不能改变值
const c=0; // undefined
c// 0
window.c // undefined

// ==============================================
// let 块级作用域, 不影响全局，相当于对象中的变量，用后即焚
{
  let a=10,b=5;
  console.log(a+b); // 15
}

console.log(window.a, window.b); // undefined undefined


// ==============================================
// 函数 剩余参数和分布参数
function sum(a,b, ...nums){
  var result = a+b;
  for(let i=nums.length;i;){
    result+=nums[--i];
  }
  return result;
}
b= sum(1,2) // 3
b= sum(1,2,0,0,1) // 4

b= sum(...[0,1,2,3,4,5,6,7,8,9]) // 45
b= sum.apply(this, [0,1,2,3,4,5,6,7,8,9]) // 45

// ==============================================
// 生成器 简单示例
function *myNumbers(){ // 返回10个偶数
  for(let i = 10;i;){
    yield (i--) * 2;
  }
}
var generator = myNumbers(),a = {done:false};

while ( a.done !== true) {
  a = generator.next() // 下一个
  if(a.done) break; // 对done进行判断，避免 done为 true时，value不存在
  console.log(a); // {value: 20, done: false}
}
generator.close(); // 停止

//---------复杂用法------------------------------------------------------------
// yield 表达式需要()，不然无法计算和传参
var foo = function *() { // 没错，尼玛还可以这样写
  x = 1;
  y =  yield (x + 1);
  z = yield (x + y);
  return z;
}()
a = foo.next(); 
// x  = 1
// a = yield (x + 1) = 2
// {value: 2, done: false}

b = foo.next(3); 
// 赋值给上一个 y =  yield (x + 1) = 3
// b = yield (x + y) = 1+3 = 4
// {value: 4, done: false}

c = foo.next(4);
// 赋值给上一个 z =  yield (x + y) = 4
// c = return z = 4
// {value: 4, done: true}

d= foo.next(10);
// 赋值给上一个 z =  yield (x + y) = 10
// c  = undefined;
// {value: undefined, done: true}

