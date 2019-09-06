/**
 * Array的reduce()函数
 * 
 * 函数定义：
 * reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
 * 对空数组是不会执行回调函数的。
 * 
 * 语法：
 * array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
 * 
 * 参数:
 *          参数	                                        描述
 * function(
 * total,currentValue, index,arr)	  必需。用于执行每个数组元素的函数。
 *                                  ======函数参数:======
 *                                  参数	                描述
 *                                  total	              必需。初始值, 或者计算结束后的返回值。
 *                                  currentValue	      必需。当前元素
 *                                  currentIndex	      可选。当前元素的索引
 *                                  arr	                可选。当前元素所属的数组对象。
 * initialValue	                    可选。传递给函数的初始值
 * 
 */

/**
  * 用法简单实例：
  * 1. 累计和  ==>> 初始值为数字
  */
// const arr = [1,2,3,4,5];
// const total = arr.reduce((sum, item) => {
//   return sum = sum + item
// }, 0)
// console.log('======total',total);        //15

/**
 * 用法简单实例：
 * 2. 合并数组 ==>> 初始值为数组
 */
// const arr = [[1,2],[3,4],[5,6]];
// const total = arr.reduce((newArr, item) => {
//   return newArr.concat(item)
// }, [])
// console.log('======total',total);       //[1, 2, 3, 4, 5, 6]

// https://blog.csdn.net/halo1416/article/details/85994900