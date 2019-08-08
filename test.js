var  aa = function () {
  console.log('aa')
}
var aaa =function() {
  return {
    a: aa,
    b: function() {
      console.log('b')
    },
    c: function() {
      console.log('c')
    }
  }
} 

var a = aaa()
var b = aaa()
aa = function () {
  console.log('aaa')
}
// a.b()
// a.c()
a.b = function() {
  console.log('sssss')
}

a.a()
b.a()

a.b()
b.b()