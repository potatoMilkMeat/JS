/**
 * 闭包与变量
 * 闭包中的变量 指向 createFunction() 保存的 活动对象
 */
function createFunction(){
  var result=new Array();

  for(var i=0;i<10; i++){
    result[i]=function(){return i;};
  }

  return result
}

var a= createFunction()
// [Scopes]]:  Scopes[3]
//   0:  Closure (createFunction)
//     i: 10
a.forEach(i => console.log( i() ))
// 10
// 10
// 10
// 10
// 10
// 10
// 10
// 10
// 10
// 10

/**
 * 闭包与变量
 * 匿名函数立即执行， 传递参数 复制出来不同的  副本
 */
function createFunction(){
  var result=new Array();

  for(var i=0;i<10;i++){
    result[i]=function(num){
      return function(){
        return num
      }
    }(i)
  }

  return result
}

var a= createFunction()
a.forEach(i => console.log( i() ))
// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9