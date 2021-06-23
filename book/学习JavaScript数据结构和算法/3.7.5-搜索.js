let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const multipleOf8 = (element, index, array) => element % 8 === 0

// es6 find findIndex
console.log(numbers.find(multipleOf8))      // 8
console.log(numbers.findIndex(multipleOf8)) // 7

// es7 includes 查找元素，可以指定index开始查找
console.log(numbers.includes(3)) // true
console.log(numbers.includes(12))// false

console.log(numbers.includes(3, 3)) // false
