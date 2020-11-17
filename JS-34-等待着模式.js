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
    resolve: function(){
      // 设置当前监控对象解决成功
      this.resolved = true;
      // 如果没有监控对象则取消执行
      if(!dfd.length)
        return;
      // 遍历所有注册了的监控对象
      for(var i=dfd.length-1;i>=0;i--){
        // 如果有任一个监控对象  没有被解决 或者 解决失败  则返回
        if(dfd[i] && !dfd[i].resolved || dfd[i].rejected){
          return;
        }
        // 清除监控对象
        dfd.splice(i, 1);
      }
      // 执行解决成功 回调方法
      _exec(doneArr);
    },
    // 解决失败
    reject: function(){
      // 设置当前监控对象解决失败
      this.rejected = true;
      // 如果没有监控对象则取消执行
      if(!dfd.length)
        return;
      // 清除所有监控对象
      dfd.splice(0);
      // 执行解决失败 回调方法
      _exec(failArr);
    }
  }

  // 创建监控对象
  that.Deferred = function(){
    return new Primise();
  }

  // 回调执行方法
  function _exec(arr){
    // 遍历回调数组 执行回调
    for(var i=0, len=arr.length;i<len;i++){
      try{
        // 执行回调函数
        arr[i] && arr[i]();
      }catch(e){console.log(e);}
    }
  }

  // 监控异步方法 参数 ：监控对象
  that.when = function(){
    // 设置监控对象
    dfd = slice.call(arguments);
    // 获取监控对象 数组长度
    var i= dfd.length;
    // 向前遍历监控对象， 最后一个监控对象的索引值为 length-1
    for(--i;i>=0;i--){
      // 如果不存在监控对象， 或者监控对象被解决，或者不是监控对象
      if(!dfd[i] || dfd[i].resolved || dfd[i].rejected || !dfd[i] instanceof Primise){
        // 清除内存 清除监控对象
        dfd.splice(i, 1);
      }
    }
    // 返回等待着对象
    return that;
  };

  // 解决成功回调函数添加方法
  that.done = function(){
    // 向成功回调函数添加方法
    doneArr = doneArr.concat(slice.call(arguments));
    //  返回等待着对象
    return that;
  };

  // 解决失败回调函数添加方法
  that.fail = function(){
    // 向失败回调函数天机方法
    failArr = failArr.concat(slice.call(arguments));
    //  返回等待着对象
    return that;
  };
}

/** =====34.8- 结果如何 setTimeOut执行 ========= */
// 创建一个监听者对象
var waiter = new Waiter();

// 第一个彩蛋，5秒后停止
var first = function(){
  // 创建监听对象
  var dtd = waiter.Deferred();
  setTimeout(function(){
    console.log('first finish');
    // 发布解决成功消息
    // dtd.resolve();
    // 发布解决失败消息
    dtd.reject();
  }, 5000);
  // 返回监听对象
  return dtd;
}();

// 第二个彩蛋， 8秒后停止
var second = function(){
  // 创建监听对象
  var dtd = waiter.Deferred();
  setTimeout(function(){
    console.log('second finish');
    // 发布解决成功消息
    dtd.resolve();
  }, 8000);
  // 返回监听对象
  return dtd;
}();

// 等待着对象 监听两个彩蛋 的工作状态，并执行相应的 成功回调函数 与 失败回调函数
waiter
  .when(first, second) // 监听两个彩蛋对象
  .done(firstDone, secondDone) // 添加成功回调函数
  .fail(function(){console.log('失败回调！')}); // 添加失败回调函数

function firstDone(){
  console.log('first 成功回调！');
}
function secondDone(){
  console.log('second 成功回调！');
}

/** =====34.10- 封装异步请求  【基于 34.3- 等待者对象】========= */
var waiter = new Waiter();
// 封装 get请求
var ajaxGet = function(url, success, fail){
  var xhr = new XMLHttpRequest();
  // 创建检测对象
  var dtd = waiter.Deferred();
  xhr.onload = function(event){
    // 存储请求状态
    var status = xhr.status;
    // 请求成功
    if(status >=200 && status <300 || status === 304){
      success && success();
      dtd.resolve();
    // 请求失败
    }else{
      dtd.reject();
      fail && fail();
    }
  };
  xhr.open('get', url, true);
  xhr.send(null);
  // 返回检测对象
  return dtd;
}
// 请求后 监测对象
var get_1 = ajaxGet('./pci-25-9.jpg',
  function(){console.log('get_1 成功回调')},
  function(){console.log('get_1 失败回调')});
// 请求后 检测对象
var get_2 = ajaxGet('./pci.html',
  function(){console.log('get_2 成功回调')},
  function(){console.log('get_2 失败回调')});

// 等待着 监测对象，成功回调函数  失败回调函数
waiter
  .when(get_1, get_2)
  .done(function(){console.log('全部成功回调--1');}, function(){console.log('全部成功回调--2');})
  .fail(function(){console.log('一个失败后回调');});

/** =====34.11- 轮询  【基于 34.3- 等待者对象】========= */
// 长轮询
(function getAjaxData(){
  // 保存当前函数
  var fn = arguments.callee;
  setTimeout(function(){
    $.get('./test.php', function(){
      console.log('成功回调， 轮询一次');
      // 再一次执行轮询
      fn();
    })
  }, 5000);
})();
