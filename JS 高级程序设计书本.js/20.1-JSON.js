/**
 * JSON 是指一种数据格式，是string字符串，符合JSON格式。
 * 与变量对象是不同的
 */
document.write('')

a= {name:'chenglong',age:31} // 对象
json='{"name":"chenglong","age":31}' // JSON
b=JSON.parse(json) // JSON 变 对象
json2=JSON.stringify(a) // 对象到JSON
json === json2 // true

eval('({name:"chengl"})') // 因为JSON 字符串 包含花括号，应该用 () 包围起来

// stringify 详解
// =======================================================================================
book={
  title: "js",
  authors:['cl','chengl'],
  edition:3,
  year:2019,
  date: new Date()
}
bookJson=JSON.stringify(book)

bookJson=JSON.stringify(book,null, 2) // 保留2空格缩进，和换行
bookJson=JSON.stringify(book,null, 'good--') // good-- 替代空格缩进，换行

bookJson=JSON.stringify(book,['title']) // 只保留 'title'
bookJson=JSON.stringify(book,function(key, value){ /* 按照文本保留 */
  switch(key){
    case 'authors':
      return value.join(',');
    case "year":
      return '2025';
    case 'edition':
      return undefined;
    default:
      return value;
  }
},2)

// toJSON()方法
// =============================================================================
book={ title: "js",  authors:['cl','chengl'],  edition:3,  year:2019,  date: new Date().toString(),
toJSON: function(){return this.title}}

bookJson=JSON.stringify(book)

// parse()方法
// =============================================================================
book={ title: "js",  authors:['cl','chengl'],  edition:3,  year:2019,  date: new Date(),dateStr: new Date()}

bookJson=JSON.stringify(book)
bookCopy=JSON.parse(bookJson, function(key,value){
  if(key==="date"){ return new Date(value) }
  else {return value}
})