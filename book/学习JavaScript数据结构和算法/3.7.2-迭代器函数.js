let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const isEven = x => x % 2 === 0

numbers.every(isEven) // false

numbers.some(isEven) // true

numbers.map(isEven) // [true, false, true, false, true, false, true, false, true, false]

numbers.filter(isEven) // [0, 2, 4, 6, 8]

numbers.reduce((previous, current) => previous + current) // 45
