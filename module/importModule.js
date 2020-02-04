// 普通导出
import { myVar1, myVar2, MY_CONST, myFunc, myVar3, myVar } from './exportModule.js'
console.log(myVar1, '\n', myVar2, '\n', MY_CONST, '\n', myVar3, '\n', myVar);
myFunc();

// Default exports 默认导出
import obj from './exportModule.js'
console.log(obj);
obj.myFunc();

// 导入导出都支持重命名

/**
 * ```js
 * // 1)导入模块的默认导出内容
 * import defaultExport from 'module-name';
 * 
 * // 2)导入模块的命名导出内容
 * import { export1, export2 } from 'module-name';
 * import { export as alias } from 'module-name'; // 修改别名
 * import * as name from 'module-name'; // 导入模块内的所有命名导出内容
 * 
 * // 3)导入模块的默认导出、命名导出
 * import defaultExport, { export1, export2 } from 'module-name';
 * import defaultExport, * as name from 'module-name';
 * ```
 */

import defaultExport, * as name from './exportModule.js'
console.log(defaultExport,'\n', name)
// defaultExport 和 obj 一样
// name 如下
/**
 * ```js
 * Module = {
 * MY_CONST: "MY_CONST",
 * default: Object,
 * myFunc: ƒ myFunc(),
 * myVar: "myVar4 别名是 myVar",
 * myVar1: "myVar1",
 * myVar2: "myVar2",
 * myVar3: "myVar3",
 * Symbol(Symbol.toStringTag): "Module",
 *  get MY_CONST: ƒ ()
 *  set MY_CONST: ƒ ()
 *  get default: ƒ ()
 *  set default: ƒ ()
 *  get myFunc: ƒ ()
 *  set myFunc: ƒ ()
 *  get myVar: ƒ ()
 *  set myVar: ƒ ()
 *  get myVar1: ƒ ()
 *  set myVar1: ƒ ()
 *  get myVar2: ƒ ()
 *  set myVar2: ƒ ()
 *  get myVar3: ƒ ()
 *  set myVar3: ƒ ()
 * }
 * ```
 */



 




 


