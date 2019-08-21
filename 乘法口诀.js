/**
 * 递归和for循环写的乘法口诀
 * 1*1
 * 1*9 => 2*2
 *            =>9*9
 */

function max (n) {
  if(n >= 9) {
    console.log(n+' x '+n+' = '+ n*n )
    return n*n
  }else{
    let a = ''
    for(let m = n;m <=9;m++) {
      a += n+' x '+m+' = '+ n*m+'       '
    }
    console.log(a)
    return max(n+1)
  }
}
max(1)