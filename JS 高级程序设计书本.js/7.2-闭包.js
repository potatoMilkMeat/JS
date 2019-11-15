/**
 * 闭包
 * arguments.callee()  当前函数指针
 */
function createComparisonFunction(propertyName){
  return function(object1,object2){
    var value1= object1[propertyName];
    var value2= object2[propertyName];

    if(value1 < value2) return -1;
    else if(value1 > value2) return 1;
    else return 0;
  }
}

var compare = createComparisonFunction('name');
var result= compare({name: 'chengl'}, {name: 'yuxun'}); // -1
/**
 * 执行到此时的compare对象 的指针引用
 */
// compare: function(){}
//   name: ''
//   length: 2
//   caller: null
//   arguments: null
//   [[Scopes]]: Scopes[2]
//     0: Closure (createComparisonFunction(){})
//       propertyName: 'name'
//     1: Global {type: 'global', name: '', object: window}

compare = null // 解除对匿名函数的引用（以便释放内存）
console.log(compare)
/**
 * 执行后 compare 为空指针
 */