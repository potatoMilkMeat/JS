let numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// 末尾添加元素的两种方法
numberArr[numberArr.length] = 10
numberArr.push(11)

// 开头添加元素的两种方法
Array.prototype.insertFirstPosition = function (value) {
  for (let i = this.length;i > 0;i--) {
    this[i] = this[i - 1]
  }
  this[0] = value
}
numberArr.insertFirstPosition(-1)

numberArr.unshift(-2)
numberArr.unshift(-4, -3)
