const defaultOptions = {
  status: -1, // [-1,0,1] 【未答题，错误，正确】
  // 后台来的数据解构 格式
  label: {
    arrKey: 'id', // arrKey 答案对应的key值
    orderKey: 'order', // 展示顺序 [order, null]  [按'order'手动排序, 不需要手动排序]
    checkKey: 'value', // 时候选中
    labelKey: 'label', // 界面显示的名字
  },
  // 后台来的数据 - 必须
  data: [{order:1,label:"A",id:"0001",value:true},{order:2,label:"B",id:"0002",value:false},{order:3,label:"C",id:"0003",value:true}],
  // 默认答案 计算出来的
  answer: {
    binary: '', // '1010', // 计算核心
    // 数据库中排序后保存的格式
    arrObj: [], // '[{order:1,label:"A",id:"0001",value:true},{order:2,label:"B",id:"0002",value:false},{order:3,label:"C",id:"0003",value:true}]'
  },
  checkType: 'multiple', // [single, multiple]  [单选，多选]
  resultType: 'labelKey', // [binary, labelKey, arrKey, object, arrObj] [二进制, 数组]
  // A 选中,B不选,C选中,D不选 1010  [true, false, true, false], '1,0,1,0' {A:true,B: false,C:true,D:false}
  len: 0, // 默认答案数量 支持自适应，答案
}
// 选中的结果
const resultObj = {
  binary: '', // '1010', // 计算核心
  labelKey: [], // ["A","C"],  // element-UI支持的
  arrKey: [], // ["0001","0003"],  // 后端可能需要的
  object: {}, // {"A":true,"B":false,"C":true,"D":false}, // 结果的变种
  arrObj: [], // [{label:"A",id:"0001",value:false},{label:"B",id:"0002",value:false}] // 选中
}
class Answer{
  constructor(options){
    this.init(options)
  }
  // 初始化
  init(options){
    this._opts = Object.assign({}, defaultOptions, options)
    this.resultObj = resultObj
    this.status = this._opts.status

    const _opts = this._opts
    if(_opts.data) this.setAnswer(_opts.data)
  }
  // 设置value
  setValue(val, type = this.resultType){
    this.setValueAnotherDefault() // 初始化其他选项
    const arr = this.resultObj.arrObj

    try {
      if(type === 'binary') this.setArrObjByBinary(val, arr, type)
      else if(type === 'labelKey') this.setArrObjByArr(val, arr, type)
      else if(type === 'arrKey') this.setArrObjByArr(val, arr, type)
      else if(type === 'object') this.setArrObjByObject(val, arr, type)
      else if(type === 'arrObj') this.setArrObj(val, type)

      const result = this.status = this.checkResult()
      
      return result
    } catch (e) {
      console.log('*** setValue ***', e)
    }
  }
  // 设置value 二进制
  setArrObjByBinary(val, arr, type){
    const {checkKey, arrKey, labelKey} = this._opts.label
    this.resultObj[type] = val

    val.split('').forEach((v,i)=>{
      arr[i][checkKey] = v=== '1'
      this.setValueAnother(v=== '1', arr[i], arrKey, labelKey, type)
    })
  }
  // 设置value arr, arrKey
  setArrObjByArr(val, arrObj, type){
    const {checkKey, arrKey, labelKey} = this._opts.label
    const m_k = this._opts.label[type]
    const arr = this.resultObj[type] = val

    arrObj.forEach(m=>{
      let status = false
      arr.forEach(v=>{
        if(v === m[m_k])status = m[checkKey] = true
      })
      this.setValueAnother(status, m, arrKey, labelKey, type)
    })
    
  }
  // 设置value object
  setArrObjByObject(val, arrObj, type){
    const {checkKey, arrKey, labelKey} = this._opts.label
    const arr = Object.keys(val)
    const obj = this.resultObj[type] = val

    arrObj.forEach(m=>{
      let status = false

      arr.forEach(v=>{
        if(!obj[v]) delete obj[v]
        else if(v === m[labelKey]){
          status = m[checkKey] = true
        }
      })
      this.setValueAnother(status, m, arrKey, labelKey, type)
    })
  }
  // 设置value ArrObj
  setArrObj(val, type){
    const {checkKey, arrKey, labelKey} = this._opts.label
    const arrObj = this.resultObj.arrObj = this.copyByJSON(val)
    arrObj.forEach(v=>{
      this.setValueAnother(v[checkKey], v, arrKey, labelKey, type)
    })
  }

  // 初始化其他选项
  setValueAnotherDefault(resO = this.resultObj){
    const checkKey = this._opts.label.checkKey
    resO.binary = ''
    resO.labelKey = []
    resO.arrKey = []
    resO.object = {}
    resO.arrObj.forEach(v=>{ v[checkKey] = false })
  }
  // 只保留选中的选项
  setValueAnother(value, v, arrKey, labelKey, noChangeKey){
    const resO = this.resultObj
    if (noChangeKey !== 'binary') resO.binary += value ? '1' : '0'
    if(value){
      if (noChangeKey !== 'labelKey') resO.labelKey.push(v[labelKey])
      if (noChangeKey !== 'arrKey') resO.arrKey.push(v[arrKey])
      if (noChangeKey !== 'object') resO.object[v[labelKey]] = true
    }
  }

  getValue(){return this.getValueByType()} // 获取value
  getValueByType(type = this.resultType){ return this.resultObj[type]} // 获取valueByType
  getResult(){return -1 === this.status ? -1 : this.status} // 获取结果 [-1, true, false]
  // 检查答案 - 二进制
  checkResult(){ return this.resultObj.binary === this._opts.answer.binary }
  
  // 初始化答案结果对象 - 清空操作
  initResultObj(_opts){
    const resultObj = this.resultObj
    const arr = resultObj.arrObj = this.copyByJSON(_opts.answer.arrObj)
    const { arrKey, checkKey } = _opts.label
    arr.forEach(v=>{ v[checkKey] = false })
    // 初始化答案 - 此时不校验答案
    resultObj.binary = this.setAnswerBinary(arr)
  }

  // 初始化正确答案
  setAnswer(data = this._opts.data){
    const _opts = this._opts
    const answer = _opts.answer
    const arr = answer.arrObj = this.orderData(data)
    answer.binary = this.setAnswerBinary(arr)
    _opts.len = arr?.length

    if(!_opts.len) console.log('*** setAnswer *** 初始化正确答案 失败')
    else this.initResultObj(_opts) // 初始化答案 - 清空操作
  }
  // 获取正确答案
  getAnswer(type){ return type && this._opts.answer[type] ? this._opts.answer[type] : this._opts.answer }
  // 设置二进制答案
  setAnswerBinary(arr, checkKey = this._opts.label.checkKey){
    let binary = ''
    arr.forEach(v=>{ binary += v[checkKey] ? '1' : '0' })
    return binary
  }
  // 计算正确答案的方法
  orderData(data){
    const k = this._opts.label?.orderKey
    const data_temp = this.copyByJSON(data)
    if(k === null || k === undefined || k==='') return data_temp
    const arr = []
    const orders = data_temp.map(v => (v.order = Number(v.order))).sort((m,n)=> m-n)
    orders.forEach(v=>{
      for (let i = 0; i < data_temp.length; i++) {
        const m = data_temp[i]
        if(Number(m[k]) === v){
          arr.push(data_temp.splice(i,1)[0])
          break
        }
      }
    })
    return arr
  }

  copyByJSON(obj){ return JSON.parse(JSON.stringify(obj))} // 复制object——json

}


function log(){console.log(...arguments)}
// 测试环节 - 会覆盖默认设置
const options = {
  // 必须给的，也可以随后用 a.setAnswer(data) 更新答案，且会自动清空用户选择
  data: [
    {order:'4',label:"D",id:"0004",value:true},
    {order:2,label:"B",id:"0002",value:false},
    {order:'1',label:"A",id:"0001",value:true},
    {order:3,label:"C",id:"0003",value:false},
    {order:'5',label:"E",id:"0005",value:true}
  ],

  /** ******  下面是可配置项   ************************************************** */
  // 后台来的数据解构 格式
  label: {
    orderKey: null, // 是否顺序 [order, null]  [按'order'手动排序, 不需要手动排序]
    arrKey: 'id', // arrKey 答案对应的key值 用于向 后台传值
    checkKey: 'value', // 选中的 key 名称
    labelKey: 'label', // 界面显示的名字
  },
  checkType: 'multiple', // [single, multiple]  [单选，多选]
  resultType: 'labelKey', // // [binary, labelKey, arrKey, object, arrObj] [二进制, 数组]
}
// new 初始化
const a = new Answer(options)

// 获取正确答案 当前状态
log(a.getAnswer(), a.getResult())

// 二进制设置用户选中的值 会返回答案状态 [-1, true, false]
a.setValue('11011', 'binary')
log(a.getValueByType('binary'), a.getResult())

// 数组 labelKey 设置用户选中的值;  options.resultType === 'labelKey' 可以省略
a.setValue(['A', 'D', 'E'])
log(a.getValueByType(), a.getResult())

// 数组 labelKey 设置用户选中的值 options
a.setValue(['0001', '0002'], 'arrKey')
log(a.getValueByType('arrKey'), a.getResult())

// object 设置用户选中的值
a.setValue({"A":true,"B":false,"C":true,"D":false}, 'object')
log(a.getValueByType('object'), a.getResult())

// object 设置用户选中的值
const data = a.orderData(options.data) // 应该排序，保证顺序一致
log(a.setValue(data, 'arrObj'), a.getValueByType('arrObj'))
