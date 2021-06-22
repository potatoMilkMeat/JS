// 类 是基于原型语法的语法糖
class Book {
  constructor(title, pages, isbn) {
    this.title = title
    this.pages = pages
    this.isbn = isbn
  }
  printIsBn () {
    console.log(this.isbn)
  }
}

let book = new Book('标题', 63, '关闭')
book.printIsBtn()

// 继承
class ITBook extends Book {
  constructor(title, pages, isbn, technology) {
    super(title, pages, isbn)
    this.technology = technology
  }
  printTechnology () {
    console.log(this.technology)
  }
}

let jsBook = new ITBook('学习js算法', '200', '1234567890', 'JavaScript')
console.log(jsBook.title)
jsBook.printTechnology()

// 属性存储器
// _name 看起来像私有的，并非真正的私有属性，还是可以访问的
class Person {
  constructor(name) {
    this._name = name
  }
  get name () {
    return this._name
  }
  set name (value) {
    this._name = value
  }
}

let lotrChar = new Person('ChengLong')
console.log(lotrChar.name)
lotrChar.name = 'chengl'
console.log(lotrChar.name)
