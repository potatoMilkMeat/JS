/**
 * resolve下面的语句其实是可以执行的，那么为什么reject的状态信息在下面没有接受到呢？
 * 这就是因为Promise对象的特点：状态的凝固。
 * new出一个Promise对象时，这个对象的起始状态就是Pending状态，在根据resolve或reject返回Fulfilled状态/Rejected状态。
 */
let p = new Promise((resolve, reject) => {
  console.log('Promise - 0')
  resolve('success') // success
  console.log('Promise - 1')
  // reject('false') // Error: "false"
  console.log('Promise - 2')
})

p.then(result => {
  console.log(result) // success
}, result => {
  console.log(result) // false
})

/**
 * Then分别接受resolve和reject的信息，有三种参数形式
 */
// let p = new Promise((resolve,reject) => {
//   //...
//   let random = Math.random();//小于1大于0
//   if(random > 0.5) {
//       resolve('random > 0.5');
//   }else {
//       reject('random <= 0.5');
//   }
// });

// p.then(result => {
//   console.log('resolve',result);
// }, result => {
//   console.log('reject',result);
// });

/**
 * js的执行顺序就是这样，同步->异步->回调，
 * 在同步执行的时候，Promise对象还处于pending的状态，也说明了这个then返回的是一个Promise对象。
 */

// let p = new Promise((resolve,reject) => {
//   reject('reject');
// });

// let resultP = p.then(null,result => {
//   console.log(result);
// });

// console.log(resultP);


/**
 * 而且必须在then里面给一个返回值，才能继续调用，否则undefined。
 */
// let p = new Promise((resolve,reject) => {
//   reject('error');
// });

// let resultP = p.then(null,result => {
//   console.log(result);
//   return 123;
// });

// // console.log(resultP);
// resultP.then(tmp => {
//   console.log(tmp);
// })

/**
 * catch 和 上面then是一样的
 */
// let p = new Promise((resolve,reject) => {
//   reject('error');
// });

// p.catch(result => {
//   console.log(result);
// })

/**
 * Promise.resolve()
 */
// let p1 =Promise.resolve({name:'xixi',age:'xxxx'});
// console.log(p1)
// p1.then(result => {
//     console.log(result);
// });

// let p = new Promise((resolve,reject) => {
//   setTimeout(() => {
//       resolve('success');
//   },500);
// });
// let pp = Promise.resolve(p);
// pp.then(result => {
//   console.log(result);
// });
// console.log(pp === p);


/**
 * Promise.reject()
 */
// let p = Promise.reject(123);
// console.log(p);

// p.then(result => {
//     console.log(result);
// }).catch(result => {
//     console.log('catch',result);
// })

/**
 * Promise.all()
 */
// let p1 = Promise.resolve(123);
// let p2 = Promise.resolve('hello');
// let p3 = Promise.resolve('success');
// Promise.all([p1,p2,p3]).then(result => {
//     console.log('ok', result);
// }).catch(result => {
//   console.log('error', result)
// })

// function sleep(wait) {
//   return new Promise((res,rej) => {
//       setTimeout(() => {
//           res(wait);
//       },wait);
//   });
// }

// let p1 = sleep(500);
// let p2 = sleep(600);
// let p3 = sleep(1000);

// Promise.all([p1,p2,p3]).then(result => {
//   console.log(result);
//   //.....
//   //loading
// });

/**
 * Promise.race()
 */
//用sleep来模仿浏览器的AJAX请求
// function sleep(wait) {
//   return new Promise((res,rej) => {
//       setTimeout(() => {
//           res(wait);
//       },wait);
//   });
// }

// let p1 = sleep(500);
// let p0 = sleep(2000);

// Promise.race([p1,p0]).then(result => {
//   console.log(result);
// });

// let p2 = new Promise((resolve,reject) => {
//   setTimeout(()=>{
//       reject('error');
//   },1000);
// });

// Promise.race([p0,p2]).then(result => {
//   console.log(result);
// }).catch(result => {
//   console.log(result);
// });

/**
 * 异常处理
 */
// try {
  // let p = new Promise((resolve, reject) => {
  //     throw new Error("I'm error");
  //     // reject(new Error("I'm Error"));
  // });
// }catch(e) {
//   console.log('catch',e);
// }

// let p = new Promise((resolve, reject) => {
//       throw new Error("I'm error");
//       // reject(new Error("I'm Error"));
//   });
// p.catch(result => {
//   console.log(result);
// });
