"use strict"
/* eslint-disable */
// {
//   // ES3，ES5 数据保护
//   let Person = function () {
//     let data ={
//       name: 'es3',
//       sex: 'male',
//       age: 15
//     }
//     this.get = function (key) {
//       return data[key]
//     }
//     this.set = function(key, value) {
//       if (key !=='sex') data[key] = value
//     }
//   }

//   // 声明一个实例
//   var person = new Person()

//   console.table({name: person.get('name'),sex: person.get('sex'), age: person.get('age')})
//   person.set('sex', 'female')
//   person.set('age', 100)
//   console.table({name: person.get('name'),sex: person.get('sex'), age: person.get('age')})
// }

// {
//   // ES5 数据保护
//   var Person = {
//     name: 'es5',
//     age: 15
//   }

//   Object.defineProperty(Person, 'sex', {
//     value: 'male',
//     writable: false
//   })

//   function log() {
//     console.table({ name: Person.name, age:Person.age, sex: Person.sex })
//   }
//   log()
//   Person.name = 'es5-cname'
//   log()
  
//   try {
//     Person.sex = 'female'
//     log()
//   } catch (e) {
//     console.log(e)
//   } finally {}

// }

{
  // ES6 
  let Person = {
    name: 'es6',
    sex: 'male',
    age: 15
  }

  let person = new Proxy(Person, {
    get(target,key){
      return target[key]
    },
    set(target, key, value) {
      if(key !== 'sex') target[key] = value
    }
  })
 
  function log() {
    console.table({ name: person.name, age:person.age, sex: person.sex })
  }
  log()
  try {
    person.sex = 'female'
  } catch (e) {
    console.log(e)
  }
  log()
}