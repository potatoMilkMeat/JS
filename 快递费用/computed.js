
var getPrice = {
  total: 0,
  priceData: {},
  isArray: function (val) {
    return Object.prototype.toString.call(val) === "[object Array]"
  },
  isUndefined: function (val) {
    return typeof val === 'undefined'
  },
  isObject: function (val) {
    return Object.prototype.toString.call(val) === "[object Object]"
  },
  getPriceData: function (str) {
    try {
      if(typeof str === 'string'){ this.priceData = JSON.parse(str); }
      else { console.error('getPriceData(str) 参数格式不对', str,'/n error', error); }
      return this.priceData;
    } catch (error) {
      console.error('getPriceData(str)  错误：JSON.parse(str) ', str,'/n error', error)
      return;
    }
    this.checkPriceData(this.priceData);
  },
  checkPriceData: function (data) {
    if(typeof data === 'object' &&  this.isArray(data.price) && (typeof data.count === "number" || typeof data.count === "string") && (typeof data.isRemoteArea === "number" || typeof data.isRemoteArea === "string")){

      data.isRemoteArea = this.filterNumOrStr(data.isRemoteArea)
      data.count = this.fileterInit(data.count)
    } else {console.error('checkPriceData(data)  data：Object，data.price：Array，data.count： NumStr，data.isRemoteArea:  NumStr \n', data)}
  },
  filterNumOrStr: function (val) {
    if( typeof val ==='string' && Number(val).toString() !== 'NaN'){
      val = Number(val);
    }else if(typeof val !== 'number' || (typeof val === "number" && val.toString() === 'NaN')){
      console.warn('usedNumOrStr(val)  val 不是数字和string \n', val);
      return;
    }
    return val;
  },
  fileterInit: function (val) {
    val = this.filterNumOrStr(val)
    if(this.isUndefined(val)){ return;}
    return parseInt(Math.abs(val))
  },
  setCount: function (val) {
    if(this.isObject(this.priceData)){

      val = this.fileterInit(val)
      if(!this.isUndefined(val)){
        this.priceData.count = val
      }
    } else {console.error('setCount(val) this.priceData 还不是对象 ',this.priceData, val)}
  },
  setRemoteArea: function (val) {
    if(this.isObject(this.priceData)){

      val = this.filterNumOrStr(val)
      if(!this.isUndefined(val)){
        this.priceData.isRemoteArea = val
      }
      
    }else {console.error('setRemoteArea(val) this.priceData 还不是对象 ',this.priceData, val)}
  },
  computed: function (data) {
    if(this.isObject(data)){

      this.checkPriceData(data);
      if(this.isUndefined(data.count) || this.isUndefined(data.isRemoteArea)){ console.error('computed(data) data.count  data.isRemoteArea 错误\n',data.count, data.isRemoteArea) }
      // 开始运算
      return this.add(data);

    } else {console.error('computed(data) data 还不是对象 ', data)}
  },
  add: function (data) {
    // 偏远地区
    var activeKey = data.isRemoteArea ? 'remoteArea' : 'area';
    var item;
    this.total = 0;
    for(let i=0, l = data.price.length,count=data.count; i < l; i++){
      // 数量足够继续计算
      if(count >= data.price[i].count[0]){
        var _P = data.price[i] // item
        var _price = _P[activeKey] // 采用的价格
        
        // 此阶段商品数量
        if(_P.count.length >= 2){ // +1 是包含本身
          var _L = count >= _P.count[1] ? _P.count[1] - _P.count[0] : count - _P.count[0] + 1
        } else { // 没有最大值
          var _L = count >= _P.count[0] ?  count - _P.count[0] + 1 : 0
        }
        // 此阶段 商品数量累加件数量
        var _l = _L > 1 ? _L - 1 : 0 

        // 首件价格
        if(_price[0] !== 0){
          this.total += _price[0] + Math.ceil(_l / _price[1]) * _price[2]
          console.log('+='+  _price[0] + ' +  Math.ceil('+ _l + '/'+ _price[1] + ') *'+ _price[2]  + '=' + this.total )
        }else {
          this.total += Math.ceil(_L / _price[1]) * _price[2]
          console.log('+= Math.ceil('+ _L + '/'+ _price[1] + ') *'+ _price[2]  + '=' + this.total )
        }
      }
    }
    return Number(this.total.toFixed(2))
  }
}

var textarea = document.getElementById('jiage');
var totalTxt = document.getElementById('totalTxt');
var isRemoteAreaTrue= document.getElementById('isRemoteAreaTrue');
var count = document.getElementById('count');
writeTotal()

function  writeTotal() {
  getPrice.priceData = JSON.parse(textarea.value);
  console.log(getPrice.priceData, count.value)
  // 设置count的数量
  if(count.value !==  getPrice.priceData.count){ count.value =  getPrice.priceData.count; }
  totalTxt.innerText = getPrice.computed(getPrice.priceData)
}

function setRemoteArea(event) {
  var val =  isRemoteAreaTrue.checked ? 1 : 0 ;
  getPrice.setRemoteArea(val)
  setTextarea()
}
function setCount(event) {
  var val =  count.value
  getPrice.setCount(val)
  setTextarea()
}

function setTextarea() {
  textarea.innerHTML = JSON.stringify(getPrice.priceData, null , 2)
}
