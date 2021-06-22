interface Person1 {
  name: string
  age: number
}

function printName(person: Person1) {
  console.log(person.name)
}

const cl = { name: 'chenglong', age: 33 }
const cyx = { name: 'chengyuxun', age: 33, love: 'game' }
printName(cl)
printName(cyx)

class Man implements Person1 {
  name: string
  age: number
  compareTo(b): number {
    if (this.age === b.age) return 0
    return this.age > b.age ? 1 : -1
  }
}

const chengl = new Man()
