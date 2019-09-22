// {
//   // ES5
//   var enens = [1,2,3,4,5]
//   var odds = enens.map(function(v){
//     return v+1
//   })
//   console.log(enens, odds)
// }

// {
//   // ES6
//   const evens = [1,2,3,4,5]
//   const odds = evens.map( i => i+1)
//   console.log(evens, odds)
// }

// 箭头函数的this绑定
{
  // ES5 this 指向，被谁调用，指向谁
  var factory = function(){
    this.a ='a'
    this.b ='b'
    this.c = {
      a: 'a+',
      b: function() {
        return this.a
      }
    }
  }

  console.log(new factory().c.b())
}

{
  // ES6 阿尽头函数 this指向 定义时类的指向
  var factory = function(){
    this.a ='a'
    this.b ='b'
    this.c = {
      a: 'a+',
      b: () => this.a
    }
  }

  console.log(new factory().c.b())
}

// // ES6 阿尽头函数 this指向 定义时类的指向
// var a = 11
// function test () {
//   this.a = 22
//   return () => {
//     console.log(this.a)
//   }
// }

// var x = new test()()