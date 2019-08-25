/**
 * async和await
 * 基本语法
 */
// async function demo() {
//   let result = await new Promise((reolve, reject) => {
//     setTimeout(() => {
//       console.log('async')
//       reolve('123')
//     }, 500)
//   })
//   console.log(result);
// }

// demo();

/**
 * async和await
 * .应用
 * 需要注意的就是await是强制把异步变成了同步，这一句代码执行完，才会执行下一句。
 */

// function sleep(wait) {
//   return new Promise((res,rej) => {
//       setTimeout(() => {
//           res(wait);
//           console.log('after res:', wait)
//       },wait);
//   });
// }
// sleep(100).then(result => {
//   console.log('result', result)
//   return sleep(result + 100);
// }).then(result02 => {
//   console.log('result02',result02)
//   return sleep(result02 + 100);
// }).then(result03 => {
//   console.log('result03',result03);
// })

// ================================================
// function sleep(wait) {
//   return new Promise((res,rej) => {
//       setTimeout(() => {
//           res(wait);
//           console.log('after res:', wait)
//       },wait);
//   });
// }
// async function demo() {
//   let p = await sleep(100)
//   //上一个await执行之后才会执行下一句
//   let p1 = await sleep(p+100)
//   let p2 = await sleep(p1+100)
//   return p2
// }

// demo().then(result => {
//   console.log(result)
// })

/**
 * async和await
 * .错误处理  try-catch捕捉
 */

let p = new Promise((resolve,reject) => {
  setTimeout(() => {
    // resolve('success')
    reject('error')
  },1000);
});

async function demo(params) {
  try {
      let result = await p;
      return result
  }catch(e) {
      console.log(e);
  }
}

demo().then(result => {
  console.log(result)
})

// ===============================================
// let p = new Promise((resolve,reject) => {
//   setTimeout(() => {
//       reject('error');
//   },1000);
// });

// async function demo(params) {
//   // try {
//       let result = params;
//       return result
//   // }catch(e) {
//   //     console.log(e);
//   // }
// }

// demo(250).then(result => {
//   console.log(result)
// }).catch((err) => {
//   console.log(err);
// })