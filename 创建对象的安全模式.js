/**
 * 创建对象的安全模式
 * 通过判断 this instanceof Book，执行new还是本身 
 */

// 图书类
const Book = function(title, time, type) {
  if (this instanceof Book) {
    this.title = title
    this.time = time
    this.type = type
  } else return new Book(title, time, type)
}

const book = Book('JavaScript', '2014', 'js')
console.log(book)