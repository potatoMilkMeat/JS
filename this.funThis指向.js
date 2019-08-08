/**
 * function 是全局函数，或变量指向全局 func，this 指向全局，
 * 当func作为Object的方法时，this 指向Object 
 * 
 */
var x = 1;
function f () {
  console.log(this.x);
}
f()

var ff = function () {
  this.x = 2;
  console.log(this.x)
}

ff()
console.log(x)

var o= { x: 'osx', f: f}
o.f()
