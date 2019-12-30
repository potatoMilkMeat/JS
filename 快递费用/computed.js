
var getPrice = {
  total: 0,
  priceData: {},
  isArray: function (val) {
    return Object.prototype.toString.call(val) === "[object Array]"
  },

  isUndefined: function (val) {
    return typeof val === "undefined"
  },

  isObject: function (val) {
    return Object.prototype.toString.call(val) === "[object Object]"
  },

  // 将str【JSON格式】转换成priceData，并检查格式是否正确
  getPriceData: function (str) {
    try {
      if(typeof str === "string"){ this.priceData = JSON.parse(str); }
      else { console.error("getPriceData(str) 参数格式不对", str,"/n error", error); }
      return this.priceData;
    } catch (error) {
      console.error("getPriceData(str)  错误：JSON.parse(str) ", str,"/n error", error)
      return;
    }
    this.checkPriceData(this.priceData);
  },

  // 检查priceData格式是否正确
  checkPriceData: function (data) {
    if(typeof data === "object" &&  this.isArray(data.price) && (typeof data.count === "number" || typeof data.count === "string") && (typeof data.isRemoteArea === "number" || typeof data.isRemoteArea === "string")){

      data.isRemoteArea = this.filterNumOrStr(data.isRemoteArea)
      data.count = this.fileterInit(data.count)
    } else {console.error("checkPriceData(data)  data：Object，data.price：Array，data.count： NumStr，data.isRemoteArea:  NumStr \n", data)}
  },

  // 接受Number 或者 能转换成Number的string，返回Number格式; 否则返回 undefine
  filterNumOrStr: function (val) {
    if( typeof val ==="string" && Number(val).toString() !== "NaN"){
      val = Number(val);
    }else if(typeof val !== "number" || (typeof val === "number" && val.toString() === "NaN")){
      console.warn("usedNumOrStr(val)  val 不是数字和string \n", val);
      return;
    }
    return val;
  },

  // 接受Number 或者 能转换成Number的string，返回 正整数; 否则返回 undefine
  fileterInit: function (val) {
    val = this.filterNumOrStr(val)
    if(this.isUndefined(val)){ return;}
    return parseInt(Math.abs(val))
  },

  // 设置产品数量，格式错误则不处理；并报告this.priceData 格式错误
  setCount: function (val) {
    if(this.isObject(this.priceData)){
      val = this.fileterInit(val)
      if(!this.isUndefined(val)){ this.priceData.count = val }
    } else {console.error("setCount(val) this.priceData 还不是对象 ",this.priceData, val)}
  },

  // 设置偏远地区，支持  0, 1, "0", "1", 格式错误则不处理；并报告this.priceData 格式错误
  setRemoteArea: function (val) {
    if(this.isObject(this.priceData)){
      val = this.filterNumOrStr(val)
      if(!this.isUndefined(val)){ this.priceData.isRemoteArea = val }
    }else {console.error("setRemoteArea(val) this.priceData 还不是对象 ",this.priceData, val)}
  },

  // 计算运费价格，计算前先检查并转换数据格式; 格式错误则不处理; 并报告 priceData 格式错误
  computed: function (data) {
    if(this.isObject(data)){
      this.checkPriceData(data);
      if(this.isUndefined(data.count) || this.isUndefined(data.isRemoteArea)){
        console.error("computed(data) data.count  data.isRemoteArea 错误\n",data.count, data.isRemoteArea);
        return;
      }
      return this.add(data); // 开始运算
    } else {console.error("computed(data) data 还不是对象 ", data)}
  },

  // 计算的核心方法，采用累加阶段
  add: function (data) {
    // 获取偏远地区的key值
    var activeKey = data.isRemoteArea ? "remoteArea" : "area";
    var item;
    this.total = 0;
    for(let i=0, l = data.price.length,count=data.count; i < l; i++){
      // 数量足够继续计算
      if(count >= data.price[i].count[0]){
        var _P = data.price[i] // item
        var _price = _P[activeKey] // 采用的价格
        
        // 此阶段商品数量
        if(_P.count.length >= 2){
          var _L = count >= _P.count[1] ? _P.count[1] - _P.count[0] : count - _P.count[0] + 1; /* +1 是包含本身 */
        } else { // 没有最大值
          var _L = count >= _P.count[0] ?  count - _P.count[0] + 1 : 0; /* +1 是包含本身 */
        }
        
        var _l = _L > 1 ? _L - 1 : 0; // 此阶段 商品数量累加件数量

        // 首件价格
        if(_price[0] !== 0){
          this.total += _price[0] + Math.ceil(_l / _price[1]) * _price[2];
          // console.log("+="+  _price[0] + " +  Math.ceil("+ _l + "/"+ _price[1] + ") *"+ _price[2]  + "=" + this.total )
        }else {
          this.total += Math.ceil(_L / _price[1]) * _price[2];
          // console.log("+= Math.ceil("+ _L + "/"+ _price[1] + ") *"+ _price[2]  + "=" + this.total )
        }
        this.total = Number(this.total.toFixed(4)) // 避免js 浮点触发导致超多位数错误，提高效率
      }
    }
    return Number(this.total.toFixed(2)) // 保留2位小数，采用四舍五入
  }
}

var textarea = document.getElementById("jiage");
var totalTxt = document.getElementById("totalTxt");
var isRemoteAreaTrue= document.getElementById("isRemoteAreaTrue");
var count = document.getElementById("count");
writeTotal()

function  writeTotal() {
  getPrice.priceData = JSON.parse(textarea.value);
  // console.log(getPrice.priceData, count.value)
  if(count.value !==  getPrice.priceData.count){ count.value =  getPrice.priceData.count; } // 设置count的数量
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
  var value = JSON.stringify(getPrice.priceData, null , 2);
  // 将输出的 JSON.stringify 格式转换，arr 保证是一行
  var reg = /(\[\S*)(\n\s+)((?:\d+.?\d*,?\n\s+)*)(\])/g;
  while (reg.test(value)) {
    value = value.replace(reg, "$1$3$4")
  }
  textarea.innerHTML = value
}
