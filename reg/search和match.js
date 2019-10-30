/**
 * search
 * 只搜索第一次
 */
'a1b2c3d1'.search('1')
'a1b2c3d1'.search(1) // 自动转换为下一行正则
'a1b2c3d1'.search(/1/) // 不支持g
'a1b2c3d1'.search(/10/)
['a1','b2','c3','d1'].toString().search(/1/)

/**
 * match
 * @return null 或者 匹配的数组
 * @dec index 仅在非全局有效
 * @dec input 仅在非全局有效
 */
var reg3 = /\d(\w)(\w\d)\d/,
    reg4 = /\d(\w)(\w\d)\d/g,
    ts = '$1az02b3cx04d5e',
    ret = ts.match(reg3)
console.log(reg3.lastIndex+'\t'+ret.index+'\t'+ret.toString()) // 0	1	1az02,a,z0

ret = ts.match(reg4)
console.log(ret)
console.log(reg4.lastIndex+'\t'+ret.index+'\t'+ret.toString()) // 0	undefined	1az02,3cx04

/**
 * split
 * @dec 将字符串 按照正则 转换为数组
 * @return 匹配的数组
 * @false 失败后，什么都不返回
 */
// var a='a,b,c,d'.split(',')
// console.log(a) // (4) ["a", "b", "c", "d"]

// var b = 'a1b2c3d'.split(/\d/g)
// console.log(b) // (4) ["a", "b", "c", "d"]

// var c = 'a1b2c3d'.split(/\d/)
// console.log(c) // (4) ["a", "b", "c", "d"]

/**
 * replace
 * @dec 将字符串 按照正则 转换为数组
 * @return 匹配的数组
 * @false 失败后，跳过不处理，返回本身
 * 第二个参数可以为function
 */
var a = 'a1b'.replace('1', 'X')
console.log(a)
var b = 'a1b1c1'.replace('1', 'X') // 自动转换为非全局的正则表达式
console.log(b)

var c = 'a1b1c1'.replace(/1/g, 'X')
console.log(c)

function fn(){
  let match = arguments[0],
      index = arguments[arguments.length - 2],
      input = arguments[arguments.length - 1],
      arr = Array.prototype.slice.call(arguments)
  arr.splice(-2,2);
  arr.shift();
  console.log(match, index, arr, input);
  return arr[0] + (parseInt(arr[1]) + 1);
}
var d='a1b2c3e4d5'.replace(/(\w)(\d)/g, fn)
console.log(d)

function fn1(match, _1, _2, _3, index, input){
  console.log(match, _1, _2, _3, index, input)
  return _1 + _3
}
var e = 'a1b2c3e4d5'.replace(/(\d)(\w)(\d)/g, fn1)
console.log(e)
