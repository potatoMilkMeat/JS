/**
 * test
 */
// var reg1 = /\w/
// var reg2 = /\w/g
// while(reg2.test('ab')){
//   console.log(reg2.lastIndex)
// }
/**
 * exec
 */
var reg3 = /\d(\w)(\w\d)\d/,
    reg4 = /\d(\w)(\w\d)\d/g,
    ts = '$1az02b3cx04d5e',
    ret = reg3.exec(ts)
console.log(reg3.lastIndex+'\t'+ret.index+'\t'+ret.toString())

while(ret = reg4.exec(ts)){
  console.log(reg4.lastIndex+'\t'+ret.index+'\t'+ret.toString())
}
