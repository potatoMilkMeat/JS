// 1)声明时导出
export var myVar1 = 'myVar1';
export let myVar2 = 'myVar2';
export const MY_CONST = 'MY_CONST';
export function myFunc(){ console.log('函数 myFunc!'); }

// 2)声明后导出
var myVar3 = 'myVar3';
export { myVar3 };
 
// 3)别名导出
var myVar4 = 'myVar4 别名是 myVar';
export { myVar4 as myVar };

// Default exports 默认导出
export default {
  myVar1,
  myVar2,
  MY_CONST,
  myFunc,
  myVar3,
  myVar: myVar4
}
