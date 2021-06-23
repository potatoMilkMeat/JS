let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// 删除 undefined 元素
Array.prototype.reIndex = function () {
  const newArr = []
  for (let i = 0;i < this.length;i++) {
    if (this[i] !== undefined) newArr.push(this[i])
  }
  return newArr
}

// 移除 第一个元素
Array.prototype.removeFirstPosition = function () {
  for (let i = 0;i < this.length;i++) {
    this[i] = this[i + 1]
  }
  return this.reIndex()
}

numbers = numbers.removeFirstPosition()

numbers.shift()