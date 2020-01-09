
Storage.prototype

// Storage{}
// clear: ƒ clear()
// getItem: ƒ getItem()
// key: ƒ key()
// length: (...)
// removeItem: ƒ removeItem()
// setItem: ƒ setItem()
// constructor: ƒ Storage()
// Symbol(Symbol.toStringTag): "Storage"
// get length: ƒ length()

window.sessionStorage = sessionStorage

sessionStorage.setItem('name','value')
sessionStorage.book={age:23} // 不能存储对象，只能保留string
// book: "[object Object]"
// name: "value"
// length: 2

console.log(sessionStorage.getItem('book')) // "[object Object]"
console.log(sessionStorage.name) // "value"

for(let i=0,l=sessionStorage.length;i<l;i++){
  var key=sessionStorage.key(i);
  var val=sessionStorage.getItem(key);
  console.log(key+ ' = '+ val);
}
// name = value
// book = [object Object]

sessionStorage.removeItem('name')
delete sessionStorage.book

console.log(sessionStorage) // " Storage {length: 0}"

/**
 * window.localStorage 是不能设置域的
 * 用法和sessionStorage 一样
 * 为了兼容
 */
function getLocalStorage(){
  if(typeof localStorage === 'object'){
    return localStorage;
  }else if(typeof globalStotage === 'object'){
    return globalStotage[location.host];
  }else {
    throw new Error('Local storage not available.')
  }
}

/**
 * storage 事件
 * chrome 浏览器不支持
 * 
 */
document.addEventListener('storage', function(event){
  console.log('存储： '+ event);
})
