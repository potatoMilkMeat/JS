// 一、像C#写实体类一样的写法
attr = {
  $x: 10,
  get x() {
    console.log('get 被触发')
    return this.$x
  },
  set x(val) {
    console.log('set 被触发')
    this.$x = val
  }
}
attr.x // get 被触发 10
attr.x = 24 // set 被触发 24

/**
 * 三、用Objct.defineProperty
 * 让stu 的get属性可枚举，
 * 真实属性来自_age, 状态记录editor
 */
stu ={}
Object.defineProperty(stu,'_age',{value: 20, writable: true})
Object.defineProperty(stu,'editor',{value: 1, writable: true})

Object.defineProperty(stu, "age", {
  enumerable: true,
  get() {
    console.log('get 被触发')
    return this._age
  },
  set(newAge) {
    console.log('set 被触发')
    this._age = newAge
    this.editor++
  }
})

stu.age // get 被触发 20
stu.age = 100 // set 被触发 100