document.write('1');
document.body.innerHTML = '<div id="div">'+ creatDom()+ '</div>';
  function creatDom(){
    var first = '<p>这是第  ',
        last = '  个</p>',
        i=0,
        len=5,
        html='';
    for(;i<len;i++){
      html += first + i + last;
    }
    return html;
  }
/** =====25.2-迭代器 - 框架=================== */
/** =====25.3-迭代器 - 实现=================== */
// 迭代器
var Iterator = function(items, container){
  // 获取父容器，若container 参数存在，并且可以获取到该元素则获取，苟泽获取document
  var container = container && document.getElementById(container) || document,
      // 获取元素集
      items = container.getElementsByTagName(items),
      // 获取元素集的长度
      length = items.length,
      // 当前索引值，默认：0
      index = 0;
  // 缓存源生数组splice方法
  var splice = [].splice;
  return {
    // 获取第一个元素
    first: function(){
      index = 0; // 校正当前索引
      return items[index]; // 获取第一个元素
    },
    // 获取最后一个元素
    last: function(){
      index = length - 1; // 校正当前索引
      return items[index]; // 获取最后一个元素
    },
    // 获取前一个元素
    pre: function(){
      if(--index > -1){ // 如果索引值大于-1
        return items[index]; // 获取索引值对应的元素
      }else{
        index = 0; // 否则，索引值改为0
        return null; // 返回空
      }
    },
    // 获取后一个元素
    next: function(){
      if(++index < length){ // 如果索引值小于 length
        return items[index]; // 获取索引值对应的元素
      }else{
        index = length - 1; // 否则，索引值改为length -1
        return null; // 返回空
      }
    },
    // 获取冒一个元素
    get: function(num){
      // 如果num大于等于0 获取蒸箱获取，否则逆向获取
      index = num >= 0 ? num%length : num%length + length;
      // 获取索引值对应的元素
      return items[index];
    },
    // 对每一个元素执行回调方法
    dealEach: function(fn){
      // 第二个参数开始为回调函数中参数
      var args = splice.call(arguments, 1);
      // 遍历元素
      for(var i=0;i<length;i++){
        // 对元素执行回调函数
        fn.apply(items[i], args);
      }
    },
    // 对指定元素执行回调方法
    dealItem: function(num, fn){
      // 对元素执行回调函数，注： 1 第三哥参数开始为回调函数中参数； 2 通过this.get 方法设置index 索引值
      fn.apply(this.get(num), splice.call(arguments, 2));
    },
    // 排除特定元素后执行回调方法
    exclusive: function(num, allFn, numFn){
      // 对所有元素执行回调函数
      this.dealEach(allFn);
      // 如果num类型为数组
      if(Object.prototype.toString.call(num) === "[object Array]"){
        // 遍历 num 数组
        for(var i=0,len=num.length;i<len;i++){
          // 分别处理数组中的每一个元素
          this.dealItem(num[i], numFn);
        }
      }else {
        // 处理第num个元素
        this.dealItem(num, numFn);
      }
    }
  }
}

/** =====25.4-小试牛刀=================== */
var demo = new Iterator('p', 'div');

console.log(
  demo.first(), '\n',
  demo.next(),'\n',
  demo.last(),'\n',
  demo.pre(),'\n',
  demo.get(-1),'\n',
)

demo.dealEach(function(text, color){
  this.innerHTML += text;
  this.style.background = color;
}, '  +== ', '#f2f2f2')

demo.exclusive([0, 1], function(){
  this.innerHTML +=  '所有的 ==';
}, function(){
  this.innerHTML += '选中的';
  this.style.background = 'red';
  this.style.color = 'white';
})

/** =====25.5-数组迭代器=================== */
// 数组迭代器
var eachArray = function(arr, fn){
  var i=0,
      len = arr.length;
  // 遍历数组
  for(;i<len;i++){
    // 依次执行回调函数，注意回调函数中传入的参数第一个为索引，第二个为索引对应的值
    if(fn.call(arr[i], i, arr[i]) === false){
      break;
    }
  }
}

var a=[0,1,2,3,4];
eachArray(a, function(i, item){
  console.log(i, item);
})

/** =====25.6-对象迭代器=================== */
// 对象迭代器
var eachObject = function(obj, fn){
  // 遍历对象中的每一个属性
  for(var i in obj){
    // 依次执行回调函数，注意回调函数中传入的参数第一个为属性，第二个为属性对应的值
    if(fn.call(obj[i], i, obj[i]) === false){
      break;
    }
  }
}

var obj = {a: 23, b:12, c: 25};
eachObject(obj, function(key, value){
  console.log(key+ ' : '+ value);
})

/** =====25.8-同步变量迭代器=================== */
// 同步变量
var A = {
  // 所有用户共有
  common: {},
  // 客户端数据
  client: {
    user: {username: '程龙', uid: '123'}
  },
  // 服务器端数据
  server: {}
};

// 同步变量迭代取值器
var AGetter = function(obj, key){
  // 如果对象不存在则返回未定义
  if(!obj)
    return undefined;
  var result = obj; // 获取同步变量对象
  key = key.split('.'); //解析属性层次序列
  // 迭代同步变量对象属性
  for(var i=0,len = key.length;i<len;i++){
    // 如果第i层属性存在对应的值则迭代该属性值
    if(result[key[i]] !== undefined){
      result = result[key[i]];
    // 如果不存在则返回未定义
    }else{
      return undefined;
    }
  }
  // 返回获取的结果
  return result;
}

// 获取用户名数据
console.log(AGetter(A, 'client.user.username'));
// 获取本地语言数据
console.log(AGetter(A, 'server.lang.local'));

//
var ASetter = function(obj, key, val){
  // 如果对象不存在则返回未定义
  if(!obj)
    return undefined;
  var result = obj; // 获取同步变量对象
  key = key.split('.'); //解析属性层次序列
  // 迭代同步变量对象属性
  for(var i=0,len = key.length-1;i<len;i++){
    // 如果第i层属性对应的值不存在，则定义为对象
    if(result[key[i]] === undefined){
      result[key[i]] = {};
    }
    // 如果第i层对应的值不是对象{Object}的一个实例，则抛出错误
    if(!(result[key[i]] instanceof Object)){
      throw new Error(JSON.stringify(obj) + '\n'+'.'+key.splice(0, i+1).join('.')+ '不是 Object');
      return false;
    }
    // 迭代该层属性值
    result = result[key[i]];
  }
  // 返回设置成功的属性值
  return result[key[i]] = val;
}

// 添加数据
console.log(ASetter(A, 'client.module.news.sports', 'on'));
// 为  值类型 进行子属性复制操作是不允许的
console.log(ASetter(A, 'client.user.username.sport', 'off'));