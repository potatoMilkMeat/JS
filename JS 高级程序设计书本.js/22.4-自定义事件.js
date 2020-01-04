function EventTarget() {
  this.handlers = {}
}

EventTarget.prototype = {
  constructor: EventTarget,
  addHandler: function (type, handler) {
    if (typeof this.handlers[type] === 'undefined') {
      this.handlers[type] = [];
    }

    return this.handlers[type].push(handler);
  },

  fire: function (event) {
    if (!event.target) {
      event.target = this;
    }
    if (Object.prototype.toString.call(this.handlers[event.type]) === '[object Array]') {
      var handlers = this.handlers[event.type];
      for (var i = 0, l = handlers.length; i < l; i++) {
        handlers[i](event);
      }
    }
  },

  removeHandler: function (type, handler) {
    if (Object.prototype.toString.call(this.handlers[type]) === '[object Array]') {
      var handlers = this.handlers[type];
      for (var i = 0, l = handlers.length; i < l; i++) {
        if (handlers[i] === handler) {
          break;
        }
      }

      return handlers.splice(i, 1);
    }
  }
};

function handleMessage(event) {
  console.log("信息：" + event.message);
}

function handleMessage2(event) {
  console.log("信息：" + event.message + new Date());
}

target = new EventTarget();
target.addHandler('message', handleMessage);
target.addHandler('message', handleMessage2);

target.fire({
  type: 'message',
  message: '我是信息详情！'
})
// target.removeHandler('message', handleMessage)

// =================================================================
// 寄生组合式继承
function Person(name, age) {
  EventTarget.call(this);
  this.name = name;
  this.age = age;
}

function object(o) {
  /**原型式继承 */
  function F() {};
  F.prototype = o;
  return new F();
}

function inheritPrototype(SubType, SuperType) {
  var prototype = object(SuperType.prototype);
  Object.defineProperty(prototype, 'constructor', {
    value: SubType,
    writable: true,
    configurable: true,
    enumerable: false
  });
  SubType.prototype = prototype;
}

inheritPrototype(Person, EventTarget)

Person.prototype.say = function (msg) {
  this.fire({
    type: 'message',
    message: msg
  })
}

/**
 * 具体方法
 */

function handleMessage3(event) {
  console.log(event.target.name + ' say: ' + event.message);
}

var chengl = new Person('chenglong', 31);
chengl.addHandler('message', handleMessage3);
chengl.say('力量本身并不可怕，可怕的是掌控它的人。');