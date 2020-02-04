// 从书本708页开始的

// ==============================================
// Proxy 代理对象 创建堆栈，只能使用 push, pop, length
// 书本是错误 - 改写如下
function Stack(){
  var stack = [];
  var handle = {
    get: function(target, name, receiver){
      if(stack.allowed.indexOf(name) > -1){
        if(typeof target[name] === 'function'){ return target[name].bind(target);}
        else return target[name];
      }else return undefined;
    }
  };

  // 将 allowed 添加属性，并使属性深度冻结-不可改写，不可删除，不可枚举
  Object.defineProperty(stack, 'allowed',{value: ['push', 'pop', 'length']});
  var arr = stack.allowed;
  for(let i in arr){
    Object.defineProperty(arr, i,{configurable: false, writable:false, enumerable:false });
  }

  return new Proxy(stack, handle);
}

mystack = Stack();
mystack.push('hi');
mystack.push('goodbye');

console.log(mystack.length);
console.log(mystack[0]);

console.log(mystack.pop());

// ==============================================
// Proxy 代理对象 
let test = { name: "chenglong", age: 32};
let handle = {
  get(target, key) {
    let result = key === "age"?  target[key]+ "岁" : target[key]; //如果是获取 年龄 属性，则添加 岁字
    return result;
  },
  set(target, key, value) {
    if (key === "age" && typeof value !== "number") { throw Error("age字段必须为Number类型"); }
    target[key] = value;
    // return Reflect.set(target, key, value);
  }
};

test = new Proxy(test, handle);
console.log(`我叫${test.name}  我今年${test.age}了`); // 我叫chenglong  我今年32岁了
test.age = 12; // 12
test.age = 'aa'; // Uncaught Error: age字段必须为Number类型


// ==============================================
// Map 映射 
// set get has delete clear size
// 操作键值对有性能优势，可直接迭代
map = new Map(); // Map(0) {}
map.set('name', 'chenlong'); // Map(1) {"name" => "chenlong"}
map.set('book', 'js es6'); // Map(2) {"name" => "chenlong", "book" => "js es6"}

map.has('name'); // true
map.get('book'); // "js es6"

map.delete('book'); // true 删除键值对
map.size // 1

map.clear() // 删除全部

//-----循环和迭代-------------------------------------------------------
for(let i of map){ console.log(i); }
// (2) ["name", "chenlong"]
// (2) ["book", "js es6"]

map.forEach(function(){console.log(arguments)}, _that)
// Arguments(3) ["chenlong", "name", Map(2), callee: ƒ, Symbol(Symbol.iterator): ƒ]

a= map.entries() // 创建迭代，使用 next()     MapIterator {"name" => "chenlong", "book" => "js es6"}
b= map.keys() // 创建key迭代，                MapIterator {"name", "book"}
c= map.values() // 创建value迭代，            MapIterator {"chenlong", "js es6"}
d= map[Symbol.iterator]() // 创建迭代，       MapIterator {"name" => "chenlong", "book" => "js es6"}

//-----Map 与数组的关系-------------------------------------------------------
let kvArray = [["key1", "value1"], ["key2", "value2"]];
let myMap = new Map(kvArray); // Map(2) {"key1" => "value1", "key2" => "value2"}

Array.from(myMap) // [...myMap]  等于 kvArray 的内容
console.log(Array.from(myMap.keys())) // (2) ["key1", "key2"]

//-----Map 复制和合并-------------------------------------------------------
let first = new Map([ [1, 'one'], [2, 'two'], [3, 'three'] ]);
clone = new Map(first);             // Map(3) {1 => "one", 2 => "two", 3 => "three"}
console.log(clone === first)        // false 浅比较 不为同一个对象的引用

let second = new Map([ [1, 'uno'], [2, 'dos'] ]);
let merged = new Map([...first, ...second, [1, 'xxx']]); // Map对象同数组进行合并时，如果有重复的键值，则后面的会覆盖前面的。
console.log(Array.from(merged.values()))                  // (3) ['xxx', "dos", "three"]


// ==============================================
// Set 集合 
// 具有唯一性
// add has delete clear size
// ---循环和迭代----- 与映射 Map 相同
set1 = new Set([1, 2, 3]) // Set(5) {1, 2, 3}
set1.add(4); // Set(4) {1, 2, 3, 4}
set1.has(4); // true
set1.size; // 4

set1.values() // SetIterator {1, 2, 3, 4}
set1.keys()   // SetIterator {1, 2, 3, 4}


// ==============================================
// Set 唯一性  简单去重      一元数组装载简单类型
arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2, 2, 1, 23, 1, 23, 2, 3, 2, 3, 2, 3]
[...new Set(arr)] // (4) [1, 2, 3, 23]
Array.from(new Set(arr))  // (4) [1, 2, 3, 23]

// Map 键  简单去重   
first = new Map([ [1, 'one'], [2, 'two'], [3, 'three'] ]);
second = new Map([ [1, 'uno'], [2, 'dos'] ]);
merged = new Map([...first, ...second, [1, 'xxx']]); // Map(3) {1 => "xxx", 2 => "dos", 3 => "three"}
a= {};
merged.forEach(function(v, k){this[k]=v;}, a) 
a // {1: "xxx", 2: "dos", 3: "three"}