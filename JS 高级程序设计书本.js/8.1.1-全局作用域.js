/**
 * window 对象新建变量的区别
 * 直接声明，无法删除。
 * 挂载到 window 属性上，可以删除
 */
var age=29;
window.a=20;
Object.getOwnPropertyDescriptor(window, 'a')    // {value: 20, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(window, 'age')  // {value: 29, writable: true, enumerable: true, configurable: false}

delete window.age // false 不可删除
delete window.a   // true

/**
 * 声明变量 来自 未申明的变量
 * 直接声明，报错
 * window 属性上，是 'undefiend'
 */
var newValue= oldValue // Uncaught ReferenceError: oldValue is not defined
var newValue= window.oldValue // undefined
