let len = 5
let int16 = new Int16Array(len)
let array16 = []
array16.length = len

for (let i = 0;i < array16.length;i++) {
  array16[i] = i + 1
}
for (let i = 0;i < int16.length;i++) {
  int16[i] = i + 1
}

console.log(int16)