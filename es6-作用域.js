// ES5 作用域
// function a(){
//   var callbacks = []
//   for (var i=0;i<=2;i++) {
//     callbacks[i] = function() {
//       return i*2
//     }
//   }

//   console.table([
//     callbacks[0](),
//     callbacks[1](),
//     callbacks[2]()
//   ])
// }
// a()

{
  const callbacks =[]
  for(let i=0; i<=2; i++){
    callbacks[i] = function() {
      return i*2
    }
  }

  console.table([
    callbacks[0](),
    callbacks[1](),
    callbacks[2]()
  ])
}

// ES5作用域写法 立即执行函数
// (function() {
//   const foo = function() {
//     return 1
//   }
//   console.log('foo() === 1', foo() === 1);
//   (function(){
//     const foo = function() {
//       return 2
//     }
//     console.log('foo() === 2', foo() === 2)
//   })()
// })()

// ES6 块级作用域写法
{
  const foo = function() {
    return 1
  }
  console.log('foo() === 1', foo() === 1)
  {
    const foo = function() {
      return 2
    }
    console.log('foo() === 2', foo() === 2)
  }
}