/**
 * Js Closure 闭包 的研究
 */
var x = 100
var inc = function() {
  var x=0;
  return function() {
    console.log(x++) // console.log(x++) 实现机制是先console结果后，在++
  }
}

var inc1 = inc();
var inc2 = inc();

inc1()
inc1()
inc2()
inc1()
inc2()

console.log(x)