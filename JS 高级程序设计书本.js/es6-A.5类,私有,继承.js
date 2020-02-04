// 从书本712页开始的

// ==============================================
// class 类
// 可以看到里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。也就是说，ES5的构造函数Point，对应ES6的Point类的构造方法。
//   |--如果没有显式定义，一个空的constructor方法会被默认添加。
//      constructor() {}
//     对于派生类，默认构造函数是：
//      constructor(...args) { super(...args); }
//   constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。

// 定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。
// 类的所有方法都定义在类的prototype属性上面。
// 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。这一点与ES5的行为不一致
    // Object.keys(Person) // ["_name"]
// Class不存在变量提升（hoist）
class Person{
  static _name='0';
  constructor(name, age){
    this.name = name;
    this.age = age;
    this._name = name+ '_00';
  }

  sayName(){console.log(this.name);}
  getOlder(years){this.age += years;}
}

cl= new Person('chenglong', 16); // Person {name: "chenglong", age: 16, _name: "chenglong_00"}
Person._name // "0"

// 类的属性名，可以采用表达式。
// Square类的方法名getArea，是从表达式得到的。
let methodName = "getArea";
class Square{
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}

// 可以通过实例的__proto__属性为Class添加方法, 添加到原型链上。
var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"


// ==============================================
// class 类 继承
class Polygon {
  constructor(width,height) { this.name = "Polygon";this.width = width;this.height=height; }
}
poly1 = new Polygon(10,5); // Polygon {name: "Polygon", width: 10, height: 5}

class Square extends Polygon {
  constructor(length) {
      // 在这里, 它调用了父类的构造函数, 并将 lengths 提供给 Polygon 的"width"和"height"
      super(length, length);
      // 注意: 在派生类中, 必须先调用 super() 才能使用 "this"。
      // 忽略这个，将会导致一个引用错误。
      this.name = 'Square';
  }

  get area() { return this.height * this.width; }
  set area(value) {
      // 注意：不可使用 this.area = value
      // 否则会导致循环call setter方法导致爆栈
      this._area = value;
      console.log((this.width = this.height = Math.sqrt(value)));
  }
}

a = new Square(10); // Square {name: "Square", width: 10, height: 10}
a.area = 144; // 12
a // Square {name: "Square", width: 12, height: 12, _area: 144}

// ==============================================
// class 类 原型继承和更改
class Polygon { constructor() { this.name = "Polygon"; } }
class Square extends Polygon { constructor() { super(); } }
class Rectangle {}

Object.setPrototypeOf(Square.prototype, Rectangle.prototype);

console.log(Object.getPrototypeOf(Square.prototype) === Polygon.prototype); //false
console.log(Object.getPrototypeOf(Square.prototype) === Rectangle.prototype); //true

let newInstance = new Square();
console.log(newInstance.name); //Polygon
