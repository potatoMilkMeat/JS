/** =====34.3- 等待者对象 ========= */
// 等待对象
var  Waiter = function(){
  // 注册了的等待者容器
  var dfd = [],
      // 成功回调方法容器
      doneArr = [],
      // 失败回调方法容器
      failArr = [],
      // 缓存Array 方法 slice
      slice = Array.prototype.slice,
      // 保存当前等待者对象
      that = this;

  // 监控对象类
  var Primise = function(){
    // 监控对象是否解决成功状态
    this.resolved = false;
    // 监控对象是否解决失败状态
    this.rejected = false;
  }
  // 监控对象类原型方法
  Primise.prototype = {
    // 解决成功
    resolve: function(){},
    // 解决失败
    reject: function(){}
  }

  // 创建监控对象
  that.Deferred = function(){
    return new Primise();
  }

  // 回调执行方法
  function _exec(arr){}

  // 监控异步方法 参数 ：监控对象
  that.when = function(){};

  // 解决成功回调函数添加方法
  that.done = function(){};

  // 解决失败回调函数添加方法
  that.fail = function(){};
}