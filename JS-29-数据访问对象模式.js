document.write('1');
document.body.innerHTML = '<div id="article"><p>第一段文字</p></div>';
var g=function(id){return document.getElementById(id);}
/** =====28.2-数据访问对象类========= */
/**
 * 本地存储类
 * @param {*} preId  本地存储数据库前缀
 * @param {*} timeSign 时间戳与存储数据之间的凭借福
 */
var BaseLocalStorage = function(preId, timeSign){
  // 定义本地存储数据库前缀
  this.preId = preId;
  // 定义时间戳与存储数据之间的凭借福
  this.timeSign = timeSign || '|-|';
}

/** =====28.3-数据操作状态========= */
// 本地存储类原型方法
BaseLocalStorage.prototype = {
  // 操作状态
  status: {
    SUCCESS: 0,       //
    FALLURE: 1,       //
    OVERFLOW: 2,      //
    TIMEOUT: 3,       //
  },
  // 保存本地存储链接
  storage: localStorage || window.localStorage,
  // 获取本地存储数据库 数据真实字段
  getKey: function(key){
    return this.preId + key;
  },
  /**
   * 添加（修改）数据
   * @param {*} key 数据字段标识
   * @param {*} value 数据值
   * @param {*} callback 回调函数
   * @param {*} time 添加时间
   */
  set: function(key, value, callback, time){
    // 默认操作状态为 成功
    var status = this.status.SUCCESS,
        // 获取真实字段
        key = this.getKey(key);
    try {
      // 参数时间 获取时间戳
      time = new Date(time).getTime() || time.getTime();
    } catch (e) {
      // 为传入时间参数或者时间参数有误时  默认时间：一个月
      time = new Data().getTime() + 1000*60*60*24*31;
    }
    try {
      // 向数据库中添加数据
      this.storage.setItem(key, time+ this.timeSign+value);
    } catch (e) {
      // 溢出，返回溢出状态
      status = this.status.OVERFLOW;
    }
    // 有回调函数则执行回调函数 并传入参数操作状态，真实数据字段及存储数据值
    callback && callback.call(this, status, key, value);
  },
   /**
   * 获取数据
   * @param {*} key 数据字段标识
   * @param {*} callback 回调函数
   */
  get: function(key, callback){
    //
    var status = this.status.SUCCESS,
        //
        key = this.getKey(key),
        //
        value = null,
        //
        timeSignLen = this.timeSign.length,
        //
        that = this,
        //
        index,
        //
        time,
        //
        result;
    try {
      //
      value = that.storage.getItem(key);
    } catch (e) {
      //
      result = {
        status: that.status.FALLURE,
        value: null
      };
      //
      callback && callback.call(this, result.status, result.value);
      return result;
    }
    //
    if(value){
      //
      index = value.indexOf(that.timeSign);
      //
      time = +value.slice(0,index);
      if(new Date(time).getTime() > new Date().getTime() || time === 0){
        //
        value = value.slice(index, timeSignLen);
      }else{
        //
        value = null;
        //
        status = that.status.TIMEOUT;
        //
        that.remove(key);
      }
    }else{
      //
      status = that.status.FALLURE;
    }
    //
    result = {
      status: status,
      value: value
    };
    //
    callback && callback.call(this, result.status, result.value);
    return result;
  },
  // 删除数据
  remove: function(key, callback){

  },
}