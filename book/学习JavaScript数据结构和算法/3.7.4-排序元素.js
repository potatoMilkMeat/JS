let names = ['Ana', 'Join', 'join', 'ana']

// unicode 排序会导致出现问题
const sortCharByUnicode = (a, b) => {
  a = a.toLocaleLowerCase()
  b = b.toLocaleLowerCase()
  return a < b ? -1 : a > b ? 1 : 0
}

// 按照本地字符排序
const sortChar = (a, b) => a.localeCompare(b)

console.log(names.sort(sortCharByUnicode)) // ["Ana", "ana", "Join", "join"]
console.log(names.sort(sortChar)) // ["ana", "Ana", "join", "Join"]