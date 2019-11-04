/**
 * 进制转换 2 4 8 10
 * @param {*} num 10进制数字
 * @param {*} arr 准备保存的空数组
 * @param {*} type 准备转换的数组，默认2进制
 * @return arr
 */
function importArr(num, arr, type=2) {
  for (var i = 0; 1; i++) {
    if (num/type >= 1) { arr[i] = num%type; num = parseInt(num/type) }
    else { arr[i] = num;break }
  }
  return arr
}
/**
 * 数组颠倒为进制
 * @param {*} arr 被颠倒的数组
 */
function tostr(arr){
  for(var i = arr.length,str=''; i>0;str += arr[--i]);
  return str
}
/**
 * 将数字转换为2进制
 * @param {*} num 数字
 * @param {*} type 2进制
 */
function convert (num,type=2) {
  var temp = num,
      arr = [],
      str='',
      isNotInt = num<0
  if (isNotInt) num = Math.abs(num) - 1 // 负数取绝对值之后，再减一
  importArr(num, arr) // 得到余数 排列顺序 个 --> 百十千万
  if (isNotInt) for(let i = 0;i< arr.length; arr[i]= arr[i]? 0 : 1, i++); // 负数求反
  str = tostr(arr) // 还原正确顺序
  if (isNotInt) str = '-' + str // 添加负号
  console.log(temp+'\t进制：'+type+'\t'+str)
  return str
}

convert(-11375)
