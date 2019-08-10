var a = { id: 125, name: 'a', array: [1,2,5,7], obj: { some:12, old: 256 }}
var ab = { color: 'blue' }
var ac={book: 'vue'}

/**
 * 单继承 - 属性复制，采用了递归
 * 参数必须为对象
 */
var extend = function(targ, source){
  for (var p in source){
    if(typeof source[p] === 'object') {
      let a
      if(source[p].length) a = []
      else a = {}
      targ[p] = extend(a, source[p] )
    } else targ[p] = source[p]
  }
  return targ
}

// 单继承 - 测试 
var ad = extend(ab, a)
a.array.push('125')
console.log(ad, ad.array)
console.log(a, a.array)

/**
 * 多继承 - 深层复制
 * 第一个参数为目标，其余为复制对象
 * 参数必须为对象
 */
var mix = function() {
  var i = 1,
      len = arguments.length,
      targ = arguments[0],
      arg
  for(; i<len; i++) {
    arg = arguments[i]
    extend(targ, arg)
  }
  return targ
}

// // 多继承 - 测试
// ac= mix(ac, a, ab)
// a.array.push('125')
// console.log(ac, ac.array, ac.color)
// console.log(a, a.array)