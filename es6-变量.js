{
  // ES5 中常量的写法
  Object.defineProperty(window, 'PI2', {
    value: 3.1415926,
    writable: false
  })

  console.log(PI2)
}

{
  // es6 常量的写法
  const PI2 = 3.1415926
  console.log(PI2)
  // PI2 = 4 // Assignment to constant variable.
}