/**
 * @discription Object.assign() 是属性拷贝。
 * 如果是对象，拷贝的讲师引用，建议使用 JSON.parse(JSON.stringify())
 */
let a3 = { data: { value: '123'} }
const a1 = { a: 1, b: 2 , c: a3 }
const a2 = Object.assign({ c: 10, d: 5 }, a1)
console.log(a1.c.data.value) // 123
console.log(a2.c.data.value) // 123
a3.data.value = null
console.log(a1.c.data.value) // null
console.log(a2.c.data.value) // null