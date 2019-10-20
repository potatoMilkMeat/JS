(function run() {
  var a = 1
  var b=a++
  console.log(b, a)
  b += (++a)
  console.log(b, a)
})();

function run1() {
  var a = 1
  console.log(++a)
  console.log(a)
}
