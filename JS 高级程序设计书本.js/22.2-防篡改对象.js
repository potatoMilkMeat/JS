/**
 * 不可扩展对象
 * 阻止添加新属性
 */
chengl={name:'chenglong'}
Object.preventExtensions(chengl)
Object.isExtensible(chengl) // false
chengl.age=31
console.log(chengl.age)

/**
 * 密封的对象
 * 内部属性的值  不能删除
 *               不能修改[[configurable]]属性
 */
chengl={name:'chenglong'}
Object.seal(chengl) // [[configurable]] 为false
Object.isSealed(chengl) // true

delete chengl.name // false

/**
 * 冻结的对象
 * 不能扩展，不能删除，不能修改
 */
chengl={name:'chenglong'}
Object.freeze(chengl)
Object.isFrozen(chengl) // true

chengl.name=111 // 值还是'chenglong'
delete chengl.name // false
