const str = 'get-element-by-id'
const str_camelCase = 'GetElementById'
const str_a = 'dom'
const str_A = 'DIV'

// 大小写转换
console.log(str_a.toLocaleUpperCase()) // DOM
console.log(str_A.toLocaleLowerCase()) // div

// 字符转换成小驼峰
const strToLowerCamelCase = str => {
  let newStr = ''
  const arr = str.split('-')
  for (let i = 0;i < arr.length;i++) {
    const item = arr[i];
    if (i === 0) {
      newStr += item
    } else {
      newStr += item.substr(0, 1).toLocaleUpperCase()
      newStr += item.substr(1)
    }
  }
  return newStr
}

// 字符转换成大驼峰
const strToUpperCamelCass = str => {
  let newStr = strToLowerCamelCase(str)
  newStr = newStr.substr(0, 1).toLocaleUpperCase() + newStr.substr(1)
  return newStr
}

console.log(strToLowerCamelCase(str)) // getElementById
console.log(strToUpperCamelCass(str)) // GetElementById

// 是大写字符
const isUpper = (str, i) => str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90
// str大写字符位置
const indexOfByUpper = str => {
  let arr = []
  for (let i = 0;i < str.length;i++) {
    if (isUpper(str, i)) arr.push(i)
  }
  return arr
}

// 驼峰 转 str'-'
const camelCaseToStr = str => {
  const arr = indexOfByUpper(str)
  let newStr = ''

  if (arr[0] > 0) newStr += str.substr(0, arr[0])

  for (let i = 0, l = arr.length;i < l;i++) {
    const j = arr[i]
    let len = arr[i + 1] ? (arr[i + 1] - j) - 1 : undefined
    if (j !== 0) newStr += '-'
    newStr += str[j].toLocaleLowerCase()
    newStr += str.substr(j + 1, len)
  }

  return newStr
}

camelCaseToStr(str_camelCase) // get-element-by-id
