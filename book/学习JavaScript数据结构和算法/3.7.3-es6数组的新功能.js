let str = ['a', 'b', 'c', 'd', 'e', 'f']

const log_iterator = iterator => {
  for (const n of iterator) {
    console.log(n)
  }
}

// for (let i = 0, l = str.length;i < l;i++) {
//   console.log(iterator.next().value)
// }
let iterator = str[Symbol.iterator]()
log_iterator(iterator)

let aEntries = str.entries()
log_iterator(aEntries)

let akeys = str.keys()
log_iterator(akeys)

let avalues = str.values()
log_iterator(avalues)

// Array.from
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const even = Array.from(numbers, x => x % 2 === 0) // [true, false, true, false, true, false, true, false, true, false]

// Array.of
const obb = Array.of(1, 3, 5, 7, 9) // [1, 3, 5, 7, 9]
const numbers2 = Array.of(...numbers) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// fill
numbers2.fill('x') // ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]

// copyWithin
numbers.copyWithin(0, 3, 5) // [3, 4, 2, 3, 4, 5, 6, 7, 8, 9]

