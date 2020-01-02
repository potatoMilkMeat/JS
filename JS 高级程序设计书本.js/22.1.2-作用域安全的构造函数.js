/**
 * 作用域安全的构造函数
 * 通过比较 this 是不是Person 的实例，是就执行，否则就返回新的构造函数
 * 
 * @param {String} name 
 * @param {Number} age 
 */
function Person(name, age) {
  if (this instanceof Person) {
    this.name = name;
    this.age = age;
    this.hello = function () {
      return this.name + '欢迎你！';
    }
  } else {
    return new Person(name, age)
  }
}

father = new Person('chenglong', 31)
son = Person('chengyuxun', 6)

/**
 * 
 * @param {String} name 
 * @param {Number} age 
 * @param {String} tuandui 
 */
function Sexman(name, age, sex) {
  Person.call(this, name, age)
  this.sex = sex
  this.getSex = function getSex() {
    return this.sex
  }
}

sexMan = new Sexman('cL', 16, 'man')
sexMan.name() // undefined

/**
 * Sexman.prototype = new Person()
 * Sexman 是Person 的实例，所以直接运行构造函数，name和age 都将获得
 */
Sexman.prototype = new Person()
sexMan2 = new Sexman('cL', 32, 'man')
sexMan2.hello() // 'cL'