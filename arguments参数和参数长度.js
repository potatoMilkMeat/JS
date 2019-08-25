/**
 * Js arguments 参数长度
 */
var x = '1';
function f() { 
  console.log(arguments, arguments.length)
}
f('good job', 1 ,x) // Arguments(3) ["good job", 1, "1"]  3
f() // Arguments(0) []  0